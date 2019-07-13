import {
  CREATE_POST,
  CREATE_POST_FAILED,
} from "@constants/action-names";
import {eventChannel,END} from 'redux-saga';
import { put, takeLatest, select, call, take,cancelled} from 'redux-saga/effects';
import validError from "@utils/msgError";
import { NavigationActions } from "@actions/navigate";
import { createPostSuccess, createPostFailed} from "@actions/createPost";
import { updateUploading } from "@actions/uploading";
import { apiUploadImage, apiUploadImageProgress } from "@services/auth-api";
import { apiCreatePost } from "@services/entities-api";
import { fetchEntities, fetchEntitiesProfile } from "@actions/entities";
import { RNS3 } from 'react-native-aws3';
import { Common } from "@utils/common";
function* createPost(action) {
  try{

    const state = yield select();
    const {userReducer, entitiesReducer} = state;
    const {access_token,user_id} = userReducer;
    NavigationActions.pop();
    NavigationActions.pop();
    NavigationActions.toggleTabs(true);
    const {uri, saved, uploader,duration} = action.payload;
    yield put (updateUploading({isUploading: true, currentImage: 0, total: uri.length}));
    let time_autoplay = 3000;
    if (action.payload.time == '5s') {
      time_autoplay = 5000
    } else if (action.payload.time == '10s') {
      time_autoplay = 10000
    } else if (action.payload.time == '1s'){
      time_autoplay = 1000;
    } else if (action.payload.time == '2s'){
      time_autoplay = 2000;
    }
  
    const bodyArray = uri.map((value) => ({file: value.uri, name: value.fileName, type: value.type,duration}))
    let responseData = [];
    let channel;
    let i = 0;
    channel = yield call(uploadS3,bodyArray[i],user_id);
    while(true){
      let {progress, err, success,data} = yield take(channel);
      if (err) {
        yield put (updateUploading({isUploading: false, progress: 0, currentImage: 0, total: 0}));
        NavigationActions.showWarningBox('Upload failed');
        channel();
        return;
      }
      if (success) {
        if (i <= bodyArray.length - 1) {
          if(data){
            data && responseData.push(data);
          }
          if (i == bodyArray.length - 1 && responseData) {
            const bodyCreatePost = responseData.map((value, index) => ({
              media_url: value.location,
              cover_url: value.cover_url ? value.cover_url : null,
              duration: bodyArray[i].type.includes('video') ? duration : null,
              media_type: bodyArray[i].type.includes('video') ? "video" : "photo",
            }));
            const response = yield apiCreatePost(access_token, {
              content: null,
              time_autoplay,
              is_save: saved,
              medias: bodyCreatePost
            })
            if(response.err){
              yield put({ type: CREATE_POST_FAILED });
              yield put (updateUploading({isUploading: false, progress: 0}));
              validError(response.err)
              channel();
              return;
            }
            yield put(createPostSuccess([response.data]));
            yield put (updateUploading({isUploading: true, progress: 1, currentImage: 0, total: 0}));
            yield put(fetchEntitiesProfile());
            yield put(fetchEntities());
            yield Common.sleep(300);
            yield put (updateUploading({isUploading: false, progress: 0, currentImage: 0, total: 0}));
            channel();
          }
          i++;
          channel = yield call(uploadS3,bodyArray[i],user_id);
        }
      }
      else{
        progress.progress = (progress.progress + i/ bodyArray.length) / bodyArray.length;
        yield put (updateUploading(progress));
      }
    }
  }catch(err){
    // alert(err);
  }
}
function uploadS3(bodyArray,user_id){
  return eventChannel(emitter => {
    let files = {
      uri: bodyArray.file,
      name: bodyArray.name,
      type: bodyArray.type,
    }
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    let linkUpload = `media/uploads/${user_id}/${yyyy}-${mm}-${dd}/`;
    const options = {
      keyPrefix: linkUpload,
      bucket: "kickback-api",
      region: "us-west-1",
      accessKey: "AKIAJLWKNP22PGUB5QOQ",
      secretKey: "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",
      successActionStatus: 201
    }
    const onProgress = (e) => {
      let stt = (e.loaded/e.total);
      emitter({progress:{progress: stt,isUploading:true,}});
    }
    RNS3.put(files, options).progress(onProgress).then(response => {
      if (response.status !== 201)
        emitter({err: "Failed to upload",END});
      if(response.body.postResponse){
        let data = response.body.postResponse;
        let regex = /%2F/gi;
        data.location = data.location.replace(regex,"/");
        emitter({success: true, data});
      }
    });
    return () => {

    }
  })
}
function* createPostSaga() {
  yield takeLatest(CREATE_POST, createPost);
}
export default createPostSaga;
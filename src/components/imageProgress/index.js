import { createImageProgress } from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';
import {Image as ImageSimple} from 'react-native';
let Image = null ;
if(Image == null){
  Image = createImageProgress(FastImage);
}
export default Image;
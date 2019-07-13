import React from 'react';
import {
    View, Text, FlatList, TouchableOpacity,
    Image, TextInput, Keyboard

} from 'react-native';
import colors from '@constants/colors';
import styles from './styles';
import { NavigationActions } from '@actions/navigate';
import ICONDELETE from '../../../thumbnails/icon-delete-black.png';
import ButtonBorder from '@components/buttonBorder'; 
class DeleteBox extends React.Component {
    constructor(props) {
        super(props)
        
    };
    onDeleteModal = () => {
      const {onDelete,item,screen,action} = this.props;
        if(screen == 'detailPostScreen') {
            onDelete({comment_id:item.comment_id});
        } else if(screen =='editScreen') {
            if(action == 'delete_post'){
                NavigationActions.pop();
                NavigationActions.pop();
            }
            else if(action == 'delete_photo'){
                onDelete();
            }
        }  else if (screen == 'commentPage'){
            NavigationActions.pop();
            onDelete();
        } else {
            onDelete();
        }
        NavigationActions.dismissLightBox();
    }
    onCancelModal = () => {
      NavigationActions.dismissLightBox();
    }
    render() {
        const {mess} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.searchSection}>
                <Image source={ICONDELETE} resizeMode='contain' />
                <Text allowFontScaling={false} style={{color:'black'}}>{mess}</Text>
                  <ButtonBorder onPress={this.onDeleteModal} colorText={colors.white} title='Confirm Delete' styles={styles.btnDeleteBox}/> 
                  <ButtonBorder onPress={this.onCancelModal} colorText={colors.black} title='Cancel' styles={styles.btnCancel}/> 
                </View>
            </View>
        )
    }
}

export default DeleteBox
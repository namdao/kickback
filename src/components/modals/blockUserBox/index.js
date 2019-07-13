import React from 'react';
import {
    View, Text, Image,
} from 'react-native';
import colors from '@constants/colors';
import styles from './styles';
import { NavigationActions } from '@actions/navigate';
import ButtonBorder from '@components/buttonBorder'; 
import ICONBLOCKUSER from '../../../thumbnails/blockIcon.png';
import fontSizes from '@constants/font-sizes';
import _ from 'lodash';
class BlockUserBox extends React.Component {
    constructor(props){
        super(props)
        this.onBlockModal = _.debounce(this.onBlockModal, 700);
    }
    onBlockModal = () => {
        const {onBlock,user_id,screen,username} = this.props
        if(screen == 'commentPage'){
            onBlock(user_id);
            NavigationActions.dismissLightBox();
            NavigationActions.showBlockConfirmBox({username});
            NavigationActions.pop();
        }
        else if (screen == 'commentList'){
            onBlock(user_id, screen);
            NavigationActions.dismissLightBox();
            NavigationActions.showBlockConfirmBox({username});
            // NavigationActions.showBlockConfirmBox({username, screen, onBlock, user_id});
            //NavigationActions.pop();
        }
        else {
            onBlock(user_id);
            NavigationActions.dismissLightBox();
            NavigationActions.showBlockConfirmBox({username});
        }      
    }
    onUnblockModal = () => {
        NavigationActions.dismissLightBox();
    }
    onCancelModal = () => {
        NavigationActions.dismissLightBox();
    }
    
    render(){
        const {username} = this.props;
        return(
           <View style={styles.container}>
                <View style={styles.searchSection}>
                <Image source={ICONBLOCKUSER} resizeMode='contain'/>
                <Text allowFontScaling={false} style={styles.txtTittle}>Block this user?</Text>
                <Text allowFontScaling={false} style={styles.txtContent}>
                    You will no longer be able to view any content from @{username}  
                    {''} and your profile will be hidden from them. You can remove blocks 
                    in your Settings.
                </Text> 
                  <ButtonBorder onPress={this.onBlockModal} colorText={colors.white} title='Block User' styles={styles.btnBlockUserBox}/> 
                  <ButtonBorder onPress={this.onCancelModal} colorText={colors.black} title='Cancel' styles={styles.btnCancel}/>
                {/* <Text allowFontScaling={false} style={styles.txtTittle}>Unblock this user?</Text>
                <Text allowFontScaling={false} style={styles.txtContent}>
                    @sigmapi.john will now be able to message you and see your profile
                    (if set to Public). You can block this user again at any time.
                </Text>
                  <ButtonBorder onPress={this.onUnblockModal} colorText={colors.white} title='Unblock User' styles={styles.btnBlockUserBox}/> 
                  <ButtonBorder onPress={this.onCancelModal} colorText={colors.black} title='Cancel' styles={styles.btnCancel}/> */}
                </View>
           </View> 
        )
    }
}

export default BlockUserBox
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

class UnblockUserBox extends React.Component {
    constructor(props){
        super(props)
    }
    onUnblockModal = () => {
        const {user_to,onUnblock} = this.props;
        onUnblock(user_to)
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
                <Text allowFontScaling={false} style={styles.txtTittle}>Unblock this user?</Text>
                <Text allowFontScaling={false} style={styles.txtContent}>
                    @{username} will now be able to message you and see your profile
                    (if set to Public). You can block this user again at any time.
                </Text>
                  <ButtonBorder onPress={this.onUnblockModal} colorText={colors.white} title='Unblock User' styles={styles.btnBlockUserBox}/> 
                  <ButtonBorder onPress={this.onCancelModal} colorText={colors.black} title='Cancel' styles={styles.btnCancel}/>
                </View>
           </View> 
        )
    }
}

export default UnblockUserBox
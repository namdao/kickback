import React from 'react';
import {
    View, Text, Image,
} from 'react-native';
import colors from '@constants/colors';
import styles from './styles';
import { NavigationActions } from '@actions/navigate';
import ButtonBorder from '@components/buttonBorder'; 
import fontSizes from '@constants/font-sizes';

class NotificationBox extends React.Component {
    constructor(props){
        super(props)
    }
    onClosedModal = () => {
        NavigationActions.dismissLightBox();
    }
    render(){
        const {username} = this.props;
        return(
           <View style={styles.container}>
                <View style={styles.searchSection}>
                <Text allowFontScaling={false} style={styles.txtTittle}>
                    Couldn't load post
                </Text>
                <Text allowFontScaling={false} style={styles.txtContent}>
                    This post may have been deleted or reported.
                </Text>
                  <ButtonBorder onPress={this.onClosedModal} colorText={colors.black} title='OK' styles={styles.btnCancel}/> 
                </View>
           </View> 
        )
    }
}

export default NotificationBox
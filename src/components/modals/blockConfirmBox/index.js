import React from 'react';
import {
    View, Text, Image,
} from 'react-native';
import colors from '@constants/colors';
import styles from './styles';
import { NavigationActions } from '@actions/navigate';
import ButtonBorder from '@components/buttonBorder'; 
import fontSizes from '@constants/font-sizes';

class BlockConfirmBox extends React.Component {
    constructor(props){
        super(props)
    }
    onClosedModal = () => {
        // const {onBlock,user_id,screen,username} = this.props
        // onBlock(user_id,screen)
        NavigationActions.dismissLightBox();
    }
    render(){
        const {username, screen , onBlock,user_id} = this.props;
        return(
           <View style={styles.container}>
                <View style={styles.searchSection}>
                <Text allowFontScaling={false} style={styles.txtTittle}>
                    Block Confirmed
                </Text>
                <Text allowFontScaling={false} style={styles.txtContent}>
                    @{username} has been added to your blocked users.
                </Text>
                  <ButtonBorder onPress={this.onClosedModal} colorText={colors.black} title='Close' styles={styles.btnCancel}/> 
                </View>
           </View> 
        )
    }
}

export default BlockConfirmBox
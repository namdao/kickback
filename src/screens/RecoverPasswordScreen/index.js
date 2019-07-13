import React from 'react';
import {View, Image, Text,TouchableOpacity} from 'react-native';
import Container from '@components/container';
import LOGOKICKBACK from '../../thumbnails/logo_kickback.png';
import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationActions } from '@actions/navigate';
import RecoverPassword from '@components/recoverPassword';
class RecoverPasswordScreen extends React.Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
      }
    onNavigatorEvent(event){
        switch(event.id) {
            case 'willAppear':
            NavigationActions.setNavigator(this.props.navigator);
             break;
            case 'didAppear':
              break;
            case 'willDisappear':
              break;
            case 'didDisappear':
              break;
            case 'willCommitPreview':
              break;
        }
    }
    render(){
        const {recoveryPassword} = this.props;
        return(
            <Container>
                <KeyboardAwareScrollView
                bounces={false}
                scrollEnabled={false}
                extraScrollHeight={100}
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled">
                <View style={styles.halfViewTop}>
                    <View style = {{flex: 1}}/>
                    <Image resizeMode='contain' style={styles.imageLogo} source={LOGOKICKBACK}/>
                    <View style = {{flex: 1, justifyContent: 'flex-end'}}>
                        <Text style={styles.txtEmail} allowFontScaling={false}>
                        Enter your email to have{'\n'}your password sent to you.
                        </Text>
                    </View>
                </View>
                <View style={styles.halfViewEnd}>
                    <RecoverPassword recoveryPassword={recoveryPassword}/>
                </View>
                </KeyboardAwareScrollView>
            </Container>
        )
    }
}


export default RecoverPasswordScreen
import React from 'react';
import {View, Text, TextInput, Image, Keyboard, TouchableWithoutFeedback} from 'react-native';
import ButtonBorder from '@components/buttonBorder';
import Container from '@components/container';
import Header from '@components/header';
import BACK_BLACK from '../../thumbnails/back_black.png';
import VERIFY from '../../thumbnails/verify.png';
import styles from './styles';
import colors from '@constants/colors';
import fontSizes from '@constants/font-sizes';
import { NavigationActions } from '@actions/navigate';
import { TextField } from '@components/react-native-material-textfield';
import SELECT_ICON from "../../thumbnails/select_icon.png";

class InviteFriends extends React.Component {

    messErr = "Email is invalid.";

    constructor(props){
        super(props);

        this.state = {
            emails: '',
            message: '',
            error: {emails: ""}
        }
    }

    checkValidate = () => {
        const arr = this.state.emails.split(",");
        if(arr.length === 1) {
            if(this.validateEmail(arr[0])){
                this.state.error['emails'] = ""
            }else{
                this.state.error['emails'] = this.messErr;
            }
        }else{

            for(let i = 0; i < arr.length; i++){

                if(arr[i] === "") continue;

                if(!this.validateEmail(arr[i])){
                    this.state.error['emails'] = this.messErr;
                    break;
                }else{
                    this.state.error['emails'] = "";
                }
            }

        }
        this.setState({});
    };

    onChange = (name, value) => {



        this.setState({
            [name]: value
        })
    };

    validateEmail = (email) => {
        let re = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\\.edu$");
        return re.test(String(email).toLowerCase());
    };

    onNavigatorEvent(event) {
        switch(event.id) {
            case 'willAppear':
                NavigationActions.setNavigator(this.props.navigator);
                NavigationActions.toggleTabs(false);
                break;
            case 'didAppear':
                NavigationActions.toggleTabs(false);
                break;
            case 'willDisappear':
                break;
            case 'didDisappear':
                break;
            case 'willCommitPreview':
                break;
        }
    }

    onSendInvites = () => {

        const { inviteFriend } = this.props;
        const {emails, message} = this.state;

        this.checkValidate();

        if(emails.length === 0){
            this.state.error["emails"] = "Please type emails that you want to invite";
            return;
        }

        if(this.state.error.emails !== "") return;

        inviteFriend({
            'receiver': emails.split(","),
            'message': message
        });

    };

    back = () => {
        this.props.resetState();
        NavigationActions.toggleTabs(false);
        NavigationActions.pop();
    };
    onInviteRecipientSubmit = () => {this.invitationMessage.focus()};

    renderInviteUI = () => (
        <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>
            <View
                style={{
                    flex: 1
                }}
            >
                <View style={{
                    flex: 88
                }}>

                    <View style={{
                        padding: 15,
                        marginBottom: 10
                    }}>
                        <Text style={styles.labelForm} allowFontScaling={false}>Invite Recipients</Text>
                        <Text style={styles.fieldForm}>
                            Enter multiple .EDU emails separated by a comma.
                        </Text>

                        <TextField
                            tintColor={colors.black}
                            baseColor={colors.black}
                            errorColor='#ff5252'
                            autoFocus={true}
                            onFocus={()=>this.state.error["emails"] = ""}
                            enablesReturnKeyAutomatically={true}
                            onChangeText={(text) => this.onChange('emails', text)}
                            placeholder={"newemail@university.edu"}
                            returnKeyType='next'
                            onSubmitEditing={this.onInviteRecipientSubmit}
                            error={this.state.error.emails}
                        />
                    </View>

                    <View style={styles.separateLine}/>

                    <View style={{
                        padding: 15,
                        marginBottom: 10
                    }}>
                        <Text style={styles.labelForm} allowFontScaling={false}>Invitation Message</Text>
                        <Text style={styles.fieldForm}>
                            Add an optional message to your invites.
                        </Text>

                        <TextField
                            tintColor={colors.black}
                            baseColor={colors.black}
                            errorColor='#ff5252'
                            enablesReturnKeyAutomatically={true}
                            ref={(ref)=>{this.invitationMessage = ref}}
                            onChangeText={(text) => {
                                this.onChange('message', text);
                            }}
                            numberOfLines={1}
                            multiline={true}
                            returnKeyType='done'
                            placeholder={"Enter your message"}
                            onSubmitEditing={()=>Keyboard.dismiss()}
                        />

                    </View>

                </View>

                <View style={{
                    flex: 12
                }}>

                    <View style={styles.separateLine}/>

                    <View style={{
                        marginBottom: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <ButtonBorder
                            title={"Send Invites"}
                            styles={{
                                backgroundColor: 'black',
                                width: '80%',
                                margin: 12
                            }}
                            colorText={colors.white}
                            onPress={this.onSendInvites}
                        />
                    </View>

                </View>


            </View>
        </TouchableWithoutFeedback>

    );

    renderVerifyUI = () => (
        <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >

                <Image source={VERIFY} width={10} height={10}/>
                <View style={{
                    margin: 25,
                    alignItems: 'center'
                }}>

                    <Text style={{
                        fontSize: fontSizes.regular,
                        padding: 20,
                        textAlign: 'center'
                    }}>Your friends have been invited to join Kickback.</Text>
                    <Text style={{
                        fontSize: fontSizes.regular,
                        textAlign: 'center'
                    }}>We will let you know if they join!</Text>

                </View>


                <ButtonBorder
                    title={"Return to Settings"}
                    styles={{
                        margin: 12
                    }}
                    onPress={()=>{
                        this.props.resetState();
                        NavigationActions.pop();
                        NavigationActions.toggleTabs(false);
                    }}
                />
            </View>
        </TouchableWithoutFeedback>
    );

    render() {
        const {verifyGUI} = this.props;

        return (
            <Container>
                <Header leftAction={this.back} imageLeft={BACK_BLACK} noShadow={true} stylesHeader={styles.header} mainText={"Invite Friends"}/>
                {
                    !verifyGUI ? this.renderInviteUI() : this.renderVerifyUI()
                }
            </Container>
        );
    }
};

export default InviteFriends;

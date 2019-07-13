import React from 'react';
import { KeyboardAvoidingView, View, TouchableOpacity, Text, FlatList, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationActions } from '@actions/navigate';
import Container from '@components/container';
import Header from '@components/header';
import ICON_BACK from '../../thumbnails/ico-arrow-white.png'
import Picker from 'react-native-picker';
import FILTER from '../../thumbnails/filter.png'
import FeedEntity from '@components/feedEntity';
import styles from './styles';
import _ from 'lodash'
import { Avatar } from '@components/avatar';
import ButtonBorder from '@components/buttonBorder'
import fontSizes from '@constants/font-sizes';
import colors from '@constants/colors';
import { TextField } from '@components/react-native-material-textfield';
//import SELECT_ICON from '../../../thumbnails/select_icon.png';
import SELECT_ICON from '../../thumbnails/select_icon.png';
import ICON_CHECKED from '../../thumbnails/saved.png';
import {SEARCH_ADVANCE, SEARCH_RESULT, FollowerHistory, HOME} from "../../actions/follower.history";

class SearchAdvance extends React.Component {
    formRef = undefined;
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.data = ['male', 'female'];
        this.previousGender = '';
        this.keywordRef = this.updateRef.bind(this, 'keyword');
        this.nameRef = this.updateRef.bind(this, 'name');
        this.schoolRef = this.updateRef.bind(this, 'school');
        this.classYearRef = this.updateRef.bind(this, 'classYear');
        this.organizationsRef = this.updateRef.bind(this, 'organizations');
        this.genderRef = this.updateRef.bind(this, 'gender');
        this.state = {
            isShowPicker: false,
            gender: '',
            keyword: '',
            name: '',
            isDisplay: true,
            school: '',
            classYear: '',
            organizations: '',
        }
    }
    back = () => {
        NavigationActions.toggleTabs(true);
        NavigationActions.pop();
    }
    componentWillMount() {
        setTimeout(() => {
            this.setState({ isDisplay: true });
        }, 30)
    }
    onNavigatorEvent(event) {
        switch (event.id) {
            case 'willAppear':
                NavigationActions.setNavigator(this.props.navigator);
                NavigationActions.toggleTabs(false);

                FollowerHistory.push(this.props.fromScreen,{
                    screen: SEARCH_ADVANCE,
                    user_id: null,
                    actionArrays: [
                        ()=>this.setState({
                            ...this.state
                        })
                    ]
                });
                FollowerHistory.runActionAtLastItemHistory(this.props.fromScreen);

                break;
            case 'didAppear':
                break;
            case 'willDisappear':
                FollowerHistory.pop(this.props.fromScreen,result=>{});
                break;
            case 'didDisappear':
                break;
            case 'willCommitPreview':
                break;
        }
    }

    // Hide Picker Gender
    hidePicker = () => {
        if (this.state.isShowPicker) {
            Picker.hide();
            this.setState({ isShowPicker: false, gender: this.previousGender });
        }
    }
    updateRef(name, ref) {
        this[name] = ref;
    }
    onFocus = () => {
        this.hidePicker();
        let { errors = {} } = this.state;
        for (let name in errors) {
            let ref = this[name];
            if (ref && ref.isFocused()) {
                delete errors[name];
            }
        }
        this.setState({ errors });
    }
    onFocusPicker = () => {
        this.gender.blur();
        let { errors = {} } = this.state;
        for (let name in errors) {
            let ref = this[name];
            if (ref && ref.isFocused()) {
                delete errors[name];
            }
        }
        this.setState({ errors });
    }
    showPickerGender = () => {
        let { errors = {} } = this.state;
        for (let name in errors) {
            let ref = this[name];
            if (name == 'gender') {
                delete errors[name];
            }
        }
        this.setState({ errors });
        this.previousGender = this.state.gender;
        this.setState({ isShowPicker: true, gender: 'male' });
        Picker.init({
            pickerToolBarBg: [232, 232, 232, 1],
            pickerBg: [255, 255, 255, 1],
            pickerTitleText: 'Gender',
            selectedValue: ['male'],
            pickerConfirmBtnText: 'OK',
            pickerCancelBtnText: 'Cancel',
            pickerData: this.data,
            onPickerConfirm: data => this.setState({ isShowPicker: false }),
            onPickerCancel: data => this.setState({ gender: this.previousGender, isShowPicker: false }),
            onPickerSelect: data => {

                this.setState({ gender: data[0] })
            }
        });
        Picker.show();
    }
    componentWillUnmount = () => {
        this.hidePicker();
    }
    onChangeText = (text) => {
        ['keyword', 'name', 'school', 'classYear', 'organizations']
            .map((name) => ({ name, ref: this[name] }))
            .forEach(({ name, ref }) => {
                if (ref.state.focused) {
                    this.setState({ [name]: text });
                }
            });
    }
    onSubmitKeyword = () => { this.name.focus() }
    onSubmitName = () => { this.school.focus() }
    onSubmitSchool = () => { this.classYear.focus() }
    onSubmitClassYear = () => { this.organizations.focus() }

    onSearch = () => {
        this.hidePicker();
        const paramsSearch = {
            keyword: this.state.keyword,
            name: this.state.name,
            school: this.state.school,
            class_year: this.state.classYear ? (this.state.classYear) : null,
            organizations: this.state.organizations,
            gender: this.state.gender,
        }
        let {textSearch} = this.props;
        if(textSearch){
            textSearch(this.state.name);
        }
        if(this.props.searchMode === "advance"){
            FollowerHistory.push(this.props.fromScreen,{
                screen: SEARCH_RESULT,
                user_id: null,
                actionArrays: [
                    ()=>this.props.requestListSearchUsersAdvanced({ paramsSearch, fromScreen: this.props.fromScreen, searchMode: "advance" })
                ]
            });
        }else if(this.props.searchMode === "basic"){

        }
        this.props.requestListSearchUsersAdvanced({ paramsSearch, fromScreen: this.props.fromScreen, searchMode: "advance" });
        NavigationActions.toggleTabs(true);
        if (this.props.fromScreen === HOME) {
            NavigationActions.navigateToSearchPage({ textSearch: '', fromScreen: this.props.fromScreen, searchMode: "advance" });
        } else {
            NavigationActions.pop();
        }
    }
    renderForm = (props) => {
        const {
            keyword,
            name,
            gender,
            school,
            classYear,
            organizations
        } = this.state
        return <KeyboardAwareScrollView>
            <Header leftAction={this.back}
                actionRight={[{
                    icon: ICON_CHECKED,
                    action: this.onSearch
                }]}
                imageLeft={ICON_BACK} noShadow={true} stylesHeader={styles.header}>
                <Text allowFontScaling={false} style={styles.title}>Search filters</Text>
            </Header>


            <View style={styles.textInputForm}>
                <Text allowFontScaling={false} style={styles.titleInput}>Keywords</Text>
                <View style={styles.textInput}>
                    <TextField
                        tintColor={colors.white}
                        baseColor={colors.holderColor}
                        errorColor='#ff5252'
                        ref={this.keywordRef}
                        autoCorrect={false}
                        onFocus={this.onFocus}
                        enablesReturnKeyAutomatically={true}
                        textColor={colors.white}
                        returnKeyType='next'
                        label='Enter Keyword'
                        value={keyword}
                        // onChangeText={(text) => {
                        //     setFieldValue('keyword', text);
                        // }}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitKeyword}
                    //error={errors.username}
                    />
                </View>

                <Text allowFontScaling={false} style={styles.titleInput}>Name</Text>
                <View style={styles.textInput}>
                    <TextField
                        tintColor={colors.white}
                        baseColor={colors.holderColor}
                        errorColor='#ff5252'
                        ref={this.nameRef}
                        autoCorrect={false}
                        onFocus={this.onFocus}
                        enablesReturnKeyAutomatically={true}
                        textColor={colors.white}
                        returnKeyType='next'
                        label='First Last'
                        value={name}
                        // onChangeText={(text) => {
                        //     setFieldValue('name', text);
                        // }}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitName}
                    //error={errors.name}
                    /></View>


                <Text allowFontScaling={false} style={[styles.titleInput]}>Gender</Text>
                <TouchableOpacity onPress={this.showPickerGender} style={[styles.genderStyle]}>
                    <View pointerEvents='none' style={[styles.textInput]}>
                        <TextField
                            tintColor={colors.white}
                            baseColor={colors.holderColor}
                            errorColor='#ff5252'
                            ref={this.genderRef}
                            autoCorrect={false}
                            onFocus={null}
                            enablesReturnKeyAutomatically={true}
                            textColor={colors.white}
                            returnKeyType='default'
                            numberOfLines={1}
                            label='Select Gender'
                            value={gender}
                            // onChangeText={(text) => {
                            //     setFieldValue('gender', text);
                            // }}
                            onChangeText={this.onChangeText}
                            multiline={true}
                            renderAccessory={() => <Image style={{ right: 0, bottom: -3 }} resizeMode='contain' source={SELECT_ICON} />}
                        //error={errors.gender}
                        /></View>
                </TouchableOpacity>

                <Text allowFontScaling={false} style={styles.titleInput}>School</Text>
                <View style={styles.textInput}>
                    <TextField
                        tintColor={colors.white}
                        baseColor={colors.holderColor}
                        errorColor='#ff5252'
                        ref={this.schoolRef}
                        autoCorrect={false}
                        onFocus={this.onFocus}
                        enablesReturnKeyAutomatically={true}
                        textColor={colors.white}
                        returnKeyType='next'
                        label='Enter Name of School'
                        // style={{color: userReducer.school ? 'black' : colors.black}}
                        // editable = {userReducer.school ? false : true}
                        value={school}
                        // onChangeText={(text) => {
                        //     setFieldValue('school', text);
                        // }}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitSchool}
                    //error={errors.school}
                    /></View>

                <Text allowFontScaling={false} style={styles.titleInput}>Class Year</Text>
                <View style={styles.textInput}>
                    <TextField
                        tintColor={colors.white}
                        baseColor={colors.holderColor}
                        errorColor='#ff5252'
                        ref={this.classYearRef}
                        autoCorrect={false}
                        onFocus={this.onFocus}
                        enablesReturnKeyAutomatically={true}
                        textColor={colors.white}
                        returnKeyType='next'
                        maxLength={4}
                        label='Enter Class Year'
                        keyboardType={'numeric'}
                        value={classYear}
                        // onChangeText={(text) => {
                        //     setFieldValue('classYear', text);
                        // }}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitClassYear}
                    //error={errors.classYear}
                    /></View>

                <Text allowFontScaling={false} style={styles.titleInput}>Clubs & Organizations</Text>
                <View style={styles.textInput}>
                    <TextField
                        tintColor={colors.white}
                        baseColor={colors.holderColor}
                        errorColor='#ff5252'
                        ref={this.organizationsRef}
                        autoCorrect={false}
                        onFocus={this.onFocus}
                        enablesReturnKeyAutomatically={true}
                        textColor={colors.white}
                        returnKeyType='next'
                        numberOfLines={1}
                        multiline={true}
                        label='Enter Names of Clubs & Organizations'
                        value={organizations}
                        // onChangeText={(text) => {
                        //     setFieldValue('clubs', text);
                        // }}
                        onChangeText={this.onChangeText}
                    //error={errors.clubs}
                    /></View>

                <View style={{ top: 20 }}>
                </View>
            </View>
        </KeyboardAwareScrollView>
    }

    render() {
        return (
            <Container stylesContainer={{ backgroundColor: 'rgba(0,0,0,0.9)' }}>
                {this.renderForm()}
            </Container>
        );
    }
}
export default SearchAdvance;
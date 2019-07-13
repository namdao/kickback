import React from 'react';
import {
    View, Text, FlatList, TouchableOpacity,
    Image, TextInput, Keyboard, Dimensions

} from 'react-native';
import styles from './styles';
import { NavigationActions } from '@actions/navigate';
import SEARCH_BLACK from '../../../thumbnails/search_black.png';
import FILTER from '../../../thumbnails/filter.png';
import {HOME, USER_PROFILE} from "../../../actions/follower.history";
class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textSearch: ''
        };
        this.fromScreen = props.tabIndex === 0 ? HOME : (props.tabIndex === 2 ? USER_PROFILE: null);
    };

    onSearch = () => {
        Keyboard.dismiss();
        NavigationActions.dismissLightBox();
        if(this.props.tabIndex === 0){
            NavigationActions.navigateToSearchPage({textSearch: this.state.textSearch, tabIndex: this.props.tabIndex,fromScreen: this.fromScreen, searchMode: 'basic' });
        }else if(this.props.tabIndex === 2){
            NavigationActions.navigateToSearchPageFromProfile({textSearch: this.state.textSearch, tabIndex: this.props.tabIndex,fromScreen: this.fromScreen, searchMode: 'basic'  });
        }
    };

    onFilter = () => {
        NavigationActions.dismissLightBox();
        if(this.props.tabIndex === 0){
            NavigationActions.navigateToSearchAdvance({ fromScreen: this.fromScreen , searchMode: 'advance' });
        }else if(this.props.tabIndex === 2){
            NavigationActions.navigateToSearchAdvanceFromProfile({ fromScreen: this.fromScreen, searchMode: 'advance'  });
        }
    };

    onChangeText = (text) => {
        this.setState({ textSearch: text })
    };


    render() {
        const { width } = Dimensions.get('window');
        return (
            <View style={styles.container}>

                <View style={{
                    flexDirection: 'row'
                }}>
                    <Text allowFontScaling={false} style={styles.txtDiscription}>
                        Enter your search below:
                    </Text>
                    <View style={{ width: width / 8 }} />
                </View>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <View style={styles.searchSection}>
                        <TextInput
                            placeholder='Type anything...'
                            type='Text Input'
                            returnKeyType='done'
                            style={styles.txtSearchBox}
                            allowFontScaling={false}
                            onChangeText={this.onChangeText}
                            autoCorrect={false}
                            value={this.state.textSearch}
                            onSubmitEditing={() => {
                                this.onSearch();
                                Keyboard.dismiss();
                            }} />
                        <TouchableOpacity style={styles.btnSearch} onPress={this.onSearch}>
                            <Image source={SEARCH_BLACK} resizeMode='cover' />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.btnFilter} onPress={this.onFilter}>
                        <Image source={FILTER} resizeMode='cover' />
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

export default SearchBox
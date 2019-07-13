import {StyleSheet,Dimensions } from 'react-native'

import colors from '@constants/colors';
import fontSizes from '@constants/font-sizes';

const {height,width} = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
    searchSection: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:colors.white,
        borderRadius:35,
        height:40,
        width:width * 2.2 / 3,
        marginRight: 5
    },
    txtDiscription: {
        fontSize: fontSizes.smallRegular,
        fontFamily: 'Sofia Pro',
        fontWeight:'bold',
        color:colors.white,
        
    },
    txtSearchBox: {
        fontSize: fontSizes.largeRegular,
        fontFamily: 'Sofia Pro',      
        color:colors.black,
        paddingLeft:15,
        width:width * 1.9 / 3
    },
    btnSearch:{
        paddingRight:20,
    },
    btnFilter:{
        padding:9,
        backgroundColor: "#ffffff",
        borderRadius: 50,
        width: 40,
        height: 40
    }
})
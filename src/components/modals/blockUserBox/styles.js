import {StyleSheet,Dimensions } from 'react-native'

import colors from '@constants/colors';
import fontSizes from '@constants/font-sizes';

const {height,width} = Dimensions.get('window')
const sidePadding = width * 0.05;
const sizeBox = width * 2.5 / 4;
export default StyleSheet.create({
    container: {
      width: width, height: height,
      alignItems: 'center',
      justifyContent: 'center',
    },
    btnBlockUserBox: {
      backgroundColor: colors.black,
      borderRadius:10,
    },
    btnCancel:{
        width: width/4,
        borderRadius:10,
        borderWidth:2,        
    },
    searchSection: {
        backgroundColor:colors.white,
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center',
        borderRadius:35,
        height:320,
        width:width * 2.5 / 3 - 40,
        padding: sidePadding,
    },
    txtTittle : {
        color:'black',
        fontSize:fontSizes.largeRegular,
    },
    txtContent: {
        color:'black',
        textAlign:'center'
    }
})
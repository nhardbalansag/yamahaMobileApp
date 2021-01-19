import { StyleSheet } from 'react-native';

// colors
const lightColor = 'white';
const darkColor = 'black';
const primaryColor = '#3F51B5';
const dangerColor = 'tomato';
const warningColor = '#fcbe68';
const disableColor = '#898787';
const starColor = '#ffbf00';
const successColor = '#4A7023';

const colors = {
lightColor: lightColor,
primaryColor: primaryColor,
darkColor: darkColor,
dangerColor: dangerColor,
warningColor: warningColor,
disableColor: disableColor,
starColor: starColor,
successColor: successColor
};


const styles = StyleSheet.create({

    splashlogo:{
        width: 200,
        height: 58
      },

      container:{
        flex: 1,
        justifyContent:'center',
       alignItems: 'center',
      }, 
      border:{
        borderWidth: 1,
        borderColor: 'white'
      },
      splashTitle:{
        width: '90%',
        paddingBottom: 20
      },
      justifyCenter:{
        justifyContent:'center'
      },
      alignCenter:{
        alignItems: 'center'
      },
      textCenter:{
        textAlign:'center'
      },
      backgroundColor:{
        backgroundColor:  colors.lightColor
      },
      title:{
        fontSize:25,
        textTransform: 'capitalize',
        fontWeight: 'bold',
        textAlign:'center'
      },
      subtext:{
        fontSize:15,
        textTransform: 'capitalize',
        textAlign:'center'
      },
      GeneralButton:{
        backgroundColor: colors.primaryColor,
        padding: 12
      },
      GeneralButtonText:{
        color: colors.lightColor,
        textAlign:'center',
        textTransform: 'capitalize',
        fontSize: 15,
      },
      signupButton:{
        paddingVertical: '10%',
      },
      signUpText:{
        color: colors.primaryColor,
        textAlign:'center',
        textTransform: 'capitalize',
        fontSize: 15,
      },
      designText:{
          color: colors.lightColor,
          textAlign:'center',
          fontSize: 18,
          textTransform: 'capitalize',
          borderRadius: 10
      },
      inputGap:{
          marginBottom: 20
      },
      inputForm:{
        fontSize: 15,
        marginVertical: 5
      },
      marginVertical:{
        marginVertical: 20
      },
      marginHorizantal:{
        marginHorizontal: 20
      },

      screenWidth:{
          width:"90%",
      },  
      
      capitalize:{
        textTransform: 'capitalize',
      },
      errormessage:{
        color: 'red',
        marginLeft: 15
      },
      productTitle:{
        color: colors.primaryColor,
        fontWeight:'bold',
      },
      productDescription:{
          fontSize: 13,
          color: colors.disableColor
      },
      productPrice:{
          fontWeight: 'bold'
      },
      productlistContainer:{
          flex: 1, 
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical:5,
          paddingHorizontal:5,
          borderBottomWidth:1,
          borderBottomColor: 'rgba(52, 52, 52, 0.4)'
      },
      productContainer:{
          flex:1,
          justifyContent:'center',
          alignItems:'center',
          width:"99%"
      },
      productContainerViewOne:{
        flex:1,
        marginBottom:20
    },
      productViewImage:{
        width:"30%",
        justifyContent:'flex-end'
      },
      productViewTitle:{
        width:"60%",
        flex: 1, 
        paddingHorizontal:"5%",
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      productTitleRight:{
        width: "30%",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
      },
      


      


});

export {styles, colors}
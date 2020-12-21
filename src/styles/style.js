import { StyleSheet } from 'react-native';

// colors
const lightColor = 'white';
const darkColor = 'black';
const primaryColor = '#1b3295';
const dangerColor = '#bf1e2e';
const warningColor = '#fcbe68';
const disableColor = '#898787';

const colors = {
lightColor: lightColor,
primaryColor: primaryColor,
darkColor: darkColor,
dangerColor: dangerColor,
warningColor: warningColor,
disableColor: disableColor
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
        borderColor: 'red'
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
        borderBottomColor: colors.disableColor, 
        borderBottomWidth: 1, 
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
      }

      


});

export {styles, colors}
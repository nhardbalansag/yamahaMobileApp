import { StyleSheet, Dimensions } from 'react-native';

// colors
const baseColor    = '#f4f4f4';
const lightColor   = '#fff';
const light100     = '#E5E5E5';
const light200     = '#F6F6F6';
const darkColor    = '#000';
const darkColor200 = '#363636';
const primaryColor = '#045081';
const successColor = '#34A853';
const dangerColor  = '#ea1948';
const warningColor = '#fcbe68';
const disableColor = '#898787';
const gray         = '#F9F9F9';
const gray100      = '#DCDCDC';
const gray200      = '#C0C0C0';
const gray300      = '#696969';
const gray400      = '#575757';
const gray500      = '#f8f9fa';
const gray600      = '#818181';
const blue100      = '#EAF5FF'

const colorscopy = {
  baseColor   : baseColor,
  lightColor  : lightColor,
  light100    : light100,
  light200    : light200,
  primaryColor: primaryColor,
  successColor: successColor,
  darkColor   : darkColor,
  darkColor200: darkColor200,
  dangerColor : dangerColor,
  warningColor: warningColor,
  disableColor: disableColor,
  gray        : gray,
  gray100     : gray100,
  gray200     : gray200,
  gray300     : gray300,
  gray400     : gray400,
  gray500     : gray500,
  gray600     : gray600,
  blue100     : blue100,
};

const PLATFORM = {
  ANDROID: 'android',
  IOS: 'ios',
  MATERIAL: 'material',
  WEB: 'web'
};

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const platform = Platform.OS;
const isIphoneX =
  platform === PLATFORM.IOS &&
  (deviceHeight === 812 ||
    deviceWidth === 812 ||
    deviceHeight === 896 ||
    deviceWidth === 896);

const baseWidth = 15;

// styles
const stylescopy = StyleSheet.create({
  w100: {
    width: '100%'
  },
  w90: {
    width: '90%'
  },
  w85: {
    width: '85%'
  },
  w80: {
    width: '80%'
  },
  w70: {
    width: '70%'
  },
  w60: {
    width: '60%'
  },
  w50: {
    width: '50%'
  },
  w45: {
    width: '45%'
  },
  w40: {
    width: '40%'
  },
  w35: {
    width: '35%'
  },
  w30: {
    width: '30%'
  },
  w25: {
    width: '25%'
  },
  w20: {
    width: '20%'
  },
  w15: {
    width: '15%'
  },
  w10: {
    width: '10%'
  },
  w150: {
    width: 150
  },
  h100: {
    height: '100%'
  },
  h50: {
    height: '50%'
  },
  m0: {
    margin: 0
  },
  m1: {
    margin: baseWidth
  },
  m2: {
    margin: baseWidth * 2
  },
  m3: {
    margin: baseWidth * 3
  },
  m4: {
    margin: baseWidth * 4
  },
  m5: {
    margin: baseWidth * 5
  },
  mTBase3: {
    marginTop: baseWidth/3
  },
  mTHalf: {
    marginTop: baseWidth/2
  },
  mT10: {
    marginTop: 10
  },
  mT1: {
    marginTop: baseWidth
  },
  mT2: {
    marginTop: baseWidth * 2
  },
  mT3: {
    marginTop: baseWidth * 3
  },
  mT4: {
    marginTop: baseWidth * 4
  },
  mT5: {
    marginTop: baseWidth * 5
  },
  mB0: {
    marginBottom: 0
  },
  mB10: {
    marginBottom: 10
  },
  mB1: {
    marginBottom: baseWidth
  },
  mB2: {
    marginBottom: baseWidth * 2
  },
  mB3: {
    marginBottom: baseWidth * 3
  },
  mB4: {
    marginBottom: baseWidth * 4
  },
  mB5: {
    marginBottom: baseWidth * 5
  },
  mL0: {
    marginLeft: 0
  },
  mLHalf: {
    marginLeft: baseWidth/2
  },
  mL1: {
    marginLeft: baseWidth
  },
  mL2: {
    marginLeft: baseWidth * 2
  },
  mL3: {
    marginLeft: baseWidth * 3
  },
  mL4: {
    marginLeft: baseWidth * 4
  },
  mL5: {
    marginLeft: baseWidth * 5
  },
  mR0: {
    marginRight: 0
  },
  mR1: {
    marginRight: baseWidth
  },
  mR2: {
    marginRight: baseWidth * 2
  },
  mR3: {
    marginRight: baseWidth * 3
  },
  mR4: {
    marginRight: baseWidth * 4
  },
  mR5: {
    marginRight: baseWidth * 5
  },
  mXHalf: {
    marginLeft: baseWidth / 2,
    marginRight: baseWidth / 2
  },
  mX10: {
    marginLeft: 10,
    marginRight: 10
  },
  mX1: {
    marginLeft: baseWidth,
    marginRight: baseWidth
  },
  mX2: {
    marginLeft: baseWidth * 2,
    marginRight: baseWidth * 2
  },
  mX3: {
    marginLeft: baseWidth * 3,
    marginRight: baseWidth * 3
  },
  mX4: {
    marginLeft: baseWidth * 4,
    marginRight: baseWidth * 4
  },
  mX5: {
    marginLeft: baseWidth * 5,
    marginRight: baseWidth * 5
  },
  mYAuto: {
    marginBottom: 'auto',
    marginTop: 'auto'
  },
  mYHalf: {
    marginBottom: baseWidth/2,
    marginTop:  baseWidth/2
  },
  mY1: {
    marginTop: baseWidth,
    marginBottom: baseWidth
  },
  mY2: {
    marginTop: baseWidth * 2,
    marginBottom: baseWidth * 2
  },
  mY3: {
    marginTop: baseWidth * 3,
    marginBottom: baseWidth * 3
  },
  mY4: {
    marginTop: baseWidth * 4,
    marginBottom: baseWidth * 4
  },
  mY5: {
    marginTop: baseWidth * 5,
    marginBottom: baseWidth * 5
  },
  p0: {
    padding: 0
  },
  p13: {
    padding: baseWidth /3
  },
  p1: {
    padding: baseWidth
  },
  p2: {
    padding: baseWidth * 2
  },
  p3: {
    padding: baseWidth * 3
  },
  p4: {
    padding: baseWidth * 4
  },
  p5: {
    padding: baseWidth * 5
  },
  pLHalf: {
    paddingLeft: baseWidth/2
  },
  pL1: {
    paddingLeft: baseWidth
  },
  pL2: {
    paddingLeft: baseWidth * 2
  },
  pL3: {
    paddingLeft: baseWidth * 3
  },
  pL4: {
    paddingLeft: baseWidth * 4
  },
  pL5: {
    paddingLeft: baseWidth * 5
  },
  pRHalf: {
    paddingRight: baseWidth/2
  },
  pR1: {
    paddingRight: baseWidth
  },
  pR2: {
    paddingRight: baseWidth * 2
  },
  pR3: {
    paddingRight: baseWidth * 3
  },
  pR4: {
    paddingRight: baseWidth * 4
  },
  pR5: {
    paddingRight: baseWidth * 5
  },
  pX0: {
    paddingLeft: 0,
    paddingRight: 0
  },
  pH5: {
    paddingLeft: baseWidth / 3,
    paddingRight: baseWidth / 3
  },
  pXHalf: {
    paddingLeft: baseWidth / 2,
    paddingRight: baseWidth / 2
  },
  pX1: {
    paddingLeft: baseWidth,
    paddingRight: baseWidth
  },
  pX2: {
    paddingLeft: baseWidth * 2,
    paddingRight: baseWidth * 2
  },
  pX3: {
    paddingLeft: baseWidth * 3,
    paddingRight: baseWidth * 3
  },
  pX4: {
    paddingLeft: baseWidth * 4,
    paddingRight: baseWidth * 4
  },
  pX5: {
    paddingLeft: baseWidth * 5,
    paddingRight: baseWidth * 5
  },
  pYAuto: {
    paddingTop: 'auto',
    paddingBottom: 'auto'
  },
  pY1: {
    paddingTop: baseWidth,
    paddingBottom: baseWidth
  },
  pY2: {
    paddingTop: baseWidth * 2,
    paddingBottom: baseWidth * 2
  },
  pY3: {
    paddingTop: baseWidth * 3,
    paddingBottom: baseWidth * 3
  },
  pY4: {
    paddingTop: baseWidth * 4,
    paddingBottom: baseWidth * 4
  },
  pY5: {
    paddingTop: baseWidth * 5,
    paddingBottom: baseWidth * 5
  },
  pB1: {
    paddingBottom: baseWidth
  },
  pB2: {
    paddingBottom: baseWidth * 2
  },
  pB3: {
    paddingBottom: baseWidth * 3
  },
  pB4: {
    paddingBottom: baseWidth * 4
  },
  pB5: {
    paddingBottom: baseWidth * 5
  },
  pT1: {
    paddingTop: baseWidth
  },
  pT2: {
    paddingTop: baseWidth * 2
  },
  pT3: {
    paddingTop: baseWidth * 3
  },
  pT4: {
    paddingTop: baseWidth * 4
  },
  pT5: {
    paddingTop: baseWidth * 5
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  centerItems: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  justifyCenter: {
    justifyContent: 'center'
  },
  justifyStart: {
    justifyContent: 'flex-start'
  },
  alignCenter: {
    alignItems: 'center'
  },
  alignFlexStart: {
    alignItems: 'flex-start'
  },
  justifySpaceBetween: {
    justifyContent: 'space-between'
  },
  justifySpaceAround: {
    justifyContent: 'space-around'
  },
  justifyFlexEnd: {
    justifyContent: 'flex-end'
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  flexWrap: {
    flex: 1,
    flexWrap: 'wrap'
  },
  flexEnd: {
    alignSelf: 'flex-end'
  },
  flexSelfCenter: {
    alignSelf: 'center'
  },
  flexHalf: {
    flex: 1/2
  },
  flex1: {
    flex: 1,
  },
  flexCol: {
    flexDirection: 'column'
  },
  flexRow: {
    flexDirection: 'row'
  },
  textCenter: {
    textAlign: 'center'
  },
  textUppercase: {
    textTransform: 'uppercase'
  },
  textLowercase: {
    textTransform: 'lowercase'
  },
  textBold: {
    fontWeight: 'bold'
  },
  textWeight500: {
    fontWeight: '500'
  },
  textWeight300: {
    fontWeight: '300'
  },
  textWeight100: {
    fontWeight: '100'
  },
  textWhite: {
    color: lightColor
  },
  textGray: {
    color: disableColor
  },
  textGray400: {
    color: gray400
  },
  textGray600: {
    color: gray600
  },
  textPrimary: {
    color: primaryColor
  },
  textSuccess: {
    color: successColor
  },
  textDanger: {
    color: dangerColor
  },
  textWarning: {
    color: warningColor
  },
  textDark: {
    color: darkColor
  },
  textDark200: {
    color: darkColor200
  },
  textSubtitle: {
    fontSize: 12
  },
  textUppercase: {
    textTransform: 'uppercase'
  },
  textJustify: {
    textAlign: 'justify'
  },
  textMini: {
    fontSize: 9
  },
  textError: {
    color: dangerColor,
    fontSize: 12
  },
  backgroundPrimary: {
    backgroundColor: primaryColor
  },
  backgroundGray: {
    backgroundColor: gray
  },
  backgroundGray500: {
    backgroundColor: gray500
  },
  bgTransparent: {
    backgroundColor: 'transparent'
  },
  bgBase: {
    backgroundColor: baseColor
  },
  bgDanger: {
    backgroundColor: dangerColor
  },
  bgSuccess: {
    backgroundColor: successColor
  },
  bgGray: {
    backgroundColor: gray
  },
  bgGray100: {
    backgroundColor: gray100
  },
  bgGray200: {
    backgroundColor: gray200
  },
  bgLight: {
    backgroundColor: lightColor
  },
  bgLight100: {
    backgroundColor: light100
  },
  bgLight200: {
    backgroundColor: light200
  },
  bgBlue100: {
    backgroundColor: colorscopy.blue100
  },
  textUnderline: {
    textDecorationLine: 'underline'
  },
  font9: {
    fontSize: 9
  },
  font10: {
    fontSize: 10
  },
  font11: {
    fontSize: 11
  },
  font12: {
    fontSize: 12
  },
  font13: {
    fontSize: 13
  },
  font14: {
    fontSize: 14
  },
  font15: {
    fontSize: 15
  },
  font16: {
    fontSize: 16
  },
  font17: {
    fontSize: 17
  },
  font18: {
    fontSize: 18
  },
  font19: {
    fontSize: 19
  },
  font20: {
    fontSize: 20
  },
  font22: {
    fontSize: 20
  },
  font25: {
    fontSize: 25
  },
  font30: {
    fontSize: baseWidth * 2
  },
  font40: {
    fontSize: 40
  },
  rounded: {
    borderRadius: baseWidth / 3
  },
  lineSeparator: {
    borderBottomColor: '#D9D5DC',
    borderBottomWidth: .5,
  },
  cardSeparator : {
    height: baseWidth,
    backgroundColor: baseColor
  },

  splashLogo: {
    width: 300,
    height: 100,
  },
  appContainer: {
    paddingLeft: baseWidth,
    paddingRight: baseWidth
  },
  paginationContainer: {
    paddingVertical: 5
  },
  sliderContentContainer: {
    width: '100%'
  },
  headerContainer: {
    height: deviceHeight / 12,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  headerLogo: {
    height: 45,
    width: 140
  },
  headerInput: {
    height: 40,
    fontSize: 17,
    marginBottom: 0
  },
  headerBadge: {
    height: 40,
    width: 40,
    alignItems: 'center',
    borderRadius: 50
  },

  mainPageCarouselHeight: {
    height: deviceHeight * .75 - deviceHeight / 4.7,
  },

  mainBottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: baseWidth*2
  },

  carouselMainImage: {
    height: deviceHeight * .75 - deviceHeight / (isIphoneX ? 3 : 3),
    width: deviceWidth - baseWidth
  },

  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    alignItems: 'center',
    justifyContent: 'center'
  },

  carouselContainer: { height: deviceHeight/ 5 },
  carouselImage: {
    height: 160,
    width: '100%',
    borderRadius: 5
  },
  searchInput: {
    height: baseWidth*3,
    borderColor: dangerColor,
  },

  productCard: {
    borderColor: gray,
    flex: 1,
    borderRadius: baseWidth /3,
    backgroundColor: lightColor,
    height: 260,
    shadowColor: colorscopy.darkColor,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: baseWidth / 3,
  },

  productCardImage: {
    height: 130,
    width: null,
    flex: 1,
    resizeMode: 'contain'
  },
  productCardIcon: {
    position: 'absolute',
    top: 5,
    right: -15
  },

  productCardBody: {
    paddingRight: baseWidth,
    paddingLeft: baseWidth,
    paddingBottom: baseWidth,
    flexDirection: 'column'
  },

  noShadow: {
    elevation: 0,
    borderColor: baseColor,
    backgroundColor: lightColor,
  },

  bR25: {
    borderRadius: 25
  },

  mYHalf: {
    marginTop: baseWidth / 2,
    marginBottom: baseWidth / 2
  },

  WLDropdown1: {
    backgroundColor: '#ea1948',
    marginLeft: 20,
    color: '#fff',
    width: 100,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25
  },
  WLDropdown2: {
    backgroundColor: '#ea1948',
    marginLeft: 10, color: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25
  },

  WLDropdownStyle: {
    backgroundColor: '#fafafa',
    width: 150,
    marginLeft: 10
  },

  WLfontwhite: {
    color: '#fff'
  },

  profileContainer: {
    borderColor: colorscopy.gray,
    flex: 1,
    borderRadius: 10,
    backgroundColor: colorscopy.lightColor,
    height: isIphoneX ? (deviceHeight / 3) - (baseWidth * 3) : deviceHeight/3,
    elevation: 10,
    padding: 15,
    shadowColor: colorscopy.darkColor,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  profileCard: {
    paddingRight: baseWidth,
    paddingLeft: baseWidth,
    alignItems: 'center',
    marginTop: -50
  },
  profileCardImage: {
    height: 115,
    width: 115,
    borderRadius: 100
  },
});

export {
    stylescopy, colorscopy, deviceHeight, deviceWidth, baseWidth, PLATFORM, isIphoneX };
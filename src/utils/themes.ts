import { Dimensions, Platform, StatusBar } from 'react-native'

const { height, width } = Dimensions.get('window')
const isIphoneXGen =
  Platform.OS === 'ios' &&
  (height === 812 ||
    width === 812 ||
    height === 896 ||
    width === 896 ||
    height === 844 ||
    width === 844 ||
    height === 926 ||
    width === 926)

const isIphone14Pro =
  Platform.OS === 'ios' && (height === 852 || height === 932)

const statusBarHeight = Platform.select({
  ios: isIphone14Pro ? 50 : isIphoneXGen ? 44 : 24,
  android: StatusBar.currentHeight,
  default: 0,
})
const headerHeight = isIphone14Pro
  ? 145 - statusBarHeight
  : isIphoneXGen
  ? 130 - statusBarHeight
  : 84

const metrics = {
  padding: 15,
  lessPadding: 10,
  extraPadding: 20,
  radius: 8,
  screenWidth: width,
  screenHeight: height,
  coverWidth: 126,
  coverHeight: 168,
  statusBarHeight: statusBarHeight,
  headerHeightHalf: headerHeight / 2,
  headerHeight: headerHeight,
  headerHeightX2: headerHeight * 2,
  headerHeightX3: headerHeight * 3,
  tabbarHeight: 49,
  bottomSpaceHeight: isIphoneXGen ? 34 : 0,
}

const colors = {
  primary: '#1c86f4',
  primaryDark: '#1e5bef',
  primaryLight: '#1ba1f7',
  accent: '#3497FD',
  text: '#000000',
  textSecondary: '#8D8D92',
  divider: '#BDBDBD',
  white: '#ffffff',
  lightOpacity: 'rgba(255,255,255,0.8)',
  darkOpacity: 'rgba(0, 0, 0, 0.1)',
  black: '#000000',
  background: '#f1f1f1',
  star: '#fe8302',
  transparent: 'transparent',
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.9)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
      },
      android: {
        elevation: 1,
      },
    }),
  },
}

export { colors, metrics }

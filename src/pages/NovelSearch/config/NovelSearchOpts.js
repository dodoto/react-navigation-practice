// import Animated from 'react-native-reanimated';
import { Animated } from 'react-native';

const config = {
  stiffness: 1000,
  damping: 500,
  mass: 3,
  overshootClamping: true,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01,
};

const forSlideAndOpacity = ({ current: { progress }, inverted, layouts: { screen } }) => {
  const translateY = Animated.multiply(progress.interpolate({
    inputRange: [0, 1],
    outputRange: [screen.height, 0],
    extrapolate: 'clamp'
  }),inverted);
  return {
    cardStyle: {
      transform: [
        {
          translateY,
        }
      ]
    },
    overlayStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
        extrapolate: 'clamp',
      }),
    },
  }
}

export const NovelSearchOpts = {
  headerShown: false,
  cardStyle: {
    marginTop:60,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  cardOverlayEnabled: true,
  transitionSpec: {
    open: {
      animation: 'spring',
      config,
    },
    close: {
      aniamtion: 'spring',
      config
    }
  },
  cardStyleInterpolator: forSlideAndOpacity,
  mode: 'modal',
  // ...TransitionPresets.ModalSlideFromBottomIOS
};
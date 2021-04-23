import { Animated } from 'react-native';

const forXSlideAndOpacity = ({ current: { progress }, inverted, layouts: { screen } }) => {
  const translateX = Animated.multiply(progress.interpolate({
    inputRange: [0, 1],
    outputRange: [screen.width, 0],
    extrapolate: 'clamp'
  }),inverted);
  return {
    cardStyle: {
      transform: [
        {
          translateX,
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

export const NovelDetailOpts = ({route}) => ({
  title: route.params.bookName,
  cardOverlayEnabled: true,
  cardStyleInterpolator: forXSlideAndOpacity,
  mode: 'modal',
});
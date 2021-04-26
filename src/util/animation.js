import Animated, 
  { 
    cond, 
    set, 
    timing,
    Easing,
    Value,
    clockRunning,
    stopClock,
    startClock,
    spring,
    SpringUtils
  } from 'react-native-reanimated';

//时钟 初始值 最终值
export function runTiming( clock: Animated.Clock, value: Animated.Value<number>, dest: number ) {
  const state = {
      finished  : new Value(0),
      position  : new Value(0),
      frameTime : new Value(0),
      time      : new Value(0)
  };
  const config = {
      toValue  : new Value(0),
      duration : 300,
      easing   : Easing.linear
  };
  
  return [
    cond(
      clockRunning(clock),
      [
        set(config.toValue,dest)
      ],
      [
        set(state.finished, 0),
        set(state.frameTime, 0),
        set(state.time, 0),
        set(state.position, value),
        set(config.toValue, dest),
        startClock(clock)
      ]
    ),
    timing(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position
  ]
};
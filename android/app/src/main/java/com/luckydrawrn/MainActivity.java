package com.luckydrawrn;

import com.facebook.react.ReactActivity;

// react-native-gesture-handler
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
// react-native-gesture-handler

// react-native-splash-screen
import org.devio.rn.splashscreen.SplashScreen;
import android.os.Bundle;
// react-native-splash-screen

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "LuckyDrawRn";
  }

  // react-native-gesture-handler
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected ReactRootView createRootView() {
       return new RNGestureHandlerEnabledRootView(MainActivity.this);
      }
    };
  }

  // react-native-splash-screen
  @Override
  protected void onCreate(Bundle savedInstanceState) {
      SplashScreen.show(this, true);  // 添加这一句
      super.onCreate(savedInstanceState);
  }
}

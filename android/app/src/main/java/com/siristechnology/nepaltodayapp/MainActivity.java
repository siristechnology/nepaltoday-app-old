package com.siristechnology.nepaltodayapp;

import android.content.res.Configuration;
import android.os.Build;
import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

	/**
	 * Returns the name of the main component registered from JavaScript. This is
	 * used to schedule rendering of the component.
	 */
	@Override
	protected String getMainComponentName() {
		return "nepaltodayapp";
	}

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		SplashScreen.show(this, true);
		super.onCreate(savedInstanceState);
	}

	@Override
	protected ReactActivityDelegate createReactActivityDelegate() {
		return new ReactActivityDelegate(this, getMainComponentName()) {
			@Override
			protected ReactRootView createRootView() {
				return new RNGestureHandlerEnabledRootView(MainActivity.this);
			}
		};
	}

	@Override
    public void applyOverrideConfiguration(Configuration overrideConfiguration) {
        if (Build.VERSION.SDK_INT >= 21 && Build.VERSION.SDK_INT <= 25) {
            return;
        }
        super.applyOverrideConfiguration(overrideConfiguration);
    }
}

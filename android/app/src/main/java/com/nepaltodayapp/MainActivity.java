package com.siristechnology.nepaltodayapp;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.microsoft.appcenter.reactnative.crashes.AppCenterReactNativeCrashesPackage;
import com.microsoft.appcenter.reactnative.analytics.AppCenterReactNativeAnalyticsPackage;
import com.microsoft.appcenter.reactnative.appcenter.AppCenterReactNativePackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {

	/**
	 * Returns the name of the main component registered from JavaScript. This is used to schedule
	 * rendering of the component.
	 */
	@Override
	protected String getMainComponentName() {
		return "nepaltodayapp";
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
}

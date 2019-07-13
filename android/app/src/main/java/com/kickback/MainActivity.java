package com.kickback;

import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.view.LayoutInflater;
import android.widget.LinearLayout;

import com.reactnativenavigation.controllers.SplashActivity;

public class MainActivity extends SplashActivity {
    @Override
    public LinearLayout createSplashLayout() {
        SharedPreferences preferences =
                PreferenceManager.getDefaultSharedPreferences(getApplicationContext());
        preferences.edit().putString("debug_http_host", "192.168.1.122:8081").apply();
        LayoutInflater inflater = LayoutInflater.from(this);
        LinearLayout splash = (LinearLayout) inflater.inflate(R.layout.splash_screen, null, false);
        return splash;
    }
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
//    @Override
//    protected String getMainComponentName() {
//        return "templatereactnative";
//    }
}

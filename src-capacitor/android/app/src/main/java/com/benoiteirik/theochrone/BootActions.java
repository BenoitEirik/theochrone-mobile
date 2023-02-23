package com.benoiteirik.theochrone;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.util.Log;

import java.util.Objects;

public class BootActions extends BroadcastReceiver {

  @SuppressLint("UnsafeProtectedBroadcastReceiver")
  @Override
  public void onReceive(Context context, Intent intent) {
    // Check if user allow notification from the application
    SharedPreferences preferences = context.getSharedPreferences("CapacitorStorage", Activity.MODE_PRIVATE);
    String toggle = preferences.getString("notificationToggle", "true");
    if (Objects.equals(toggle, "false")) return;

    // Create an Intent to start your MainActivity
    Intent mainIntent = new Intent(context, MainActivity.class);
    PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, mainIntent, 0);

    FestNotification notify = new FestNotification(context, pendingIntent);
    notify.send();
  }
}

package com.benoiteirik.theochrone;

import android.annotation.SuppressLint;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.os.Build;

import androidx.core.app.NotificationCompat;

import java.util.ArrayList;

public class BootNotification extends BroadcastReceiver {

  @SuppressLint("UnsafeProtectedBroadcastReceiver")
  @Override
  public void onReceive(Context context, Intent intent) {
    if (intent.getAction().equals("android.intent.action.BOOT_COMPLETED")) {
      // Create an Intent to start your MainActivity
      Intent mainIntent = new Intent(context, MainActivity.class);
      PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, mainIntent, 0);

      FestNotification notify = new FestNotification(context, pendingIntent);
      notify.send();
    }
  }
}

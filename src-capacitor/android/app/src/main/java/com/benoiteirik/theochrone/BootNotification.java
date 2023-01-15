package com.benoiteirik.theochrone;

import android.annotation.SuppressLint;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

public class BootNotification extends BroadcastReceiver {

  @Override
  public void onReceive(Context context, Intent intent) {
    Log.d("BOOT", "Notification starting...");

    NotificationCompat.Builder builder = new NotificationCompat.Builder(context, "BootNotification")
      .setSmallIcon(R.drawable.ic_launcher_background)
      .setContentTitle("Theochrone")
      .setContentText("Deuxième Dimanche après l'Épiphanie")
      .setStyle(new NotificationCompat.BigTextStyle()
        .bigText("Much longer text that cannot fit one line..."))
      .setPriority(NotificationCompat.PRIORITY_DEFAULT);

    NotificationManagerCompat notificationManager = NotificationManagerCompat.from(context);
    notificationManager.notify(NotificationManagerCompat.IMPORTANCE_DEFAULT, builder.build());

  }
}

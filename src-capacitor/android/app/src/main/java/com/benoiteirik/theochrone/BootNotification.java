package com.benoiteirik.theochrone;

import android.annotation.SuppressLint;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.graphics.BitmapFactory;
import android.os.Build;
import android.util.Log;

import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

public class BootNotification extends BroadcastReceiver {

  @SuppressLint("UnsafeProtectedBroadcastReceiver")
  @Override
  public void onReceive(Context context, Intent intent) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      CharSequence name = context.getString(R.string.app_name);
      String description = context.getString(R.string.app_name);
      int importance = NotificationManager.IMPORTANCE_HIGH;
      NotificationChannel channel = new NotificationChannel("CHANNEL_ID", name, importance);
      channel.setDescription(description);
      channel.enableVibration(false);
      channel.enableLights(false);
      channel.setVibrationPattern(null);
      channel.setLockscreenVisibility(NotificationCompat.VISIBILITY_PUBLIC);
      // Register the channel with the system; you can't change the importance
      // or other notification behaviors after this
      NotificationManager notificationManager = context.getSystemService(NotificationManager.class);
      notificationManager.createNotificationChannel(channel);
      Log.d("BOOT", "Notification starting...");
    }

    NotificationCompat.Builder builder = new NotificationCompat.Builder(context, "CHANNEL_ID")
      .setSmallIcon(R.mipmap.ic_launcher_foreground)
      .setLargeIcon(BitmapFactory.decodeResource(context.getResources(), R.mipmap.ic_launcher_foreground))
      .setStyle(new NotificationCompat.BigPictureStyle()
        .bigLargeIcon(BitmapFactory.decodeResource(context.getResources(), R.mipmap.ic_launcher_foreground)))
      .setContentTitle("Dimanche 15 Janvier 2023")
      .setContentText("• Deuxième Dimanche après l'Épiphanie\n• Saint Paul, premier ermite et Confesseur\n• Saint Maur, abbé")
      .setStyle(new NotificationCompat.BigTextStyle()
        .bigText("• Deuxième Dimanche après l'Épiphanie\n• Saint Paul, premier ermite et Confesseur\n• Saint Maur, abbé"))
      .setPriority(NotificationCompat.PRIORITY_DEFAULT)
      .setVisibility(NotificationCompat.VISIBILITY_PUBLIC);


    NotificationManagerCompat notificationManager = NotificationManagerCompat.from(context);
    notificationManager.notify(1, builder.build());
  }
}

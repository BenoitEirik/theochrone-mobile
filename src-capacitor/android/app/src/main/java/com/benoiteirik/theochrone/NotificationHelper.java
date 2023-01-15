package com.benoiteirik.theochrone;

import android.graphics.Color;
import android.content.Context;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;

public class NotificationHelper {

  private static final String CHANNEL_HIGH_ID = "com.benoiteirik.theochrone.HIGH_CHANNEL";
  private static final String CHANNEL_HIGH_NAME = "High Channel";

  private static final String CHANNEL_DEFAULT_ID = "com.benoiteirik.theochrone.DEFAULT_CHANNEL";
  private static final String CHANNEL_DEFAUL_NAME = "Default Channel";


  public NotificationHelper(Context context) {

    NotificationManager notifyManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
    long [] swPattern = new long[] { 0, 500, 110, 500, 110, 450, 110, 200, 110,
      170, 40, 450, 110, 200, 110, 170, 40, 500 };

    NotificationChannel notificationChannelHigh = null;
    if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
      notificationChannelHigh = new NotificationChannel(
        CHANNEL_HIGH_ID, CHANNEL_HIGH_NAME, NotificationManager.IMPORTANCE_HIGH);
      notificationChannelHigh.enableLights( true );
      notificationChannelHigh.setLightColor( Color.RED );
      notificationChannelHigh.setShowBadge( true );
      notificationChannelHigh.enableVibration( true );
      notificationChannelHigh.setVibrationPattern( swPattern );
      notificationChannelHigh.setLockscreenVisibility( Notification.VISIBILITY_PUBLIC );
      notifyManager.createNotificationChannel( notificationChannelHigh );

      NotificationChannel notificationChannelDefault = new NotificationChannel(
        CHANNEL_DEFAULT_ID, CHANNEL_DEFAUL_NAME, NotificationManager.IMPORTANCE_DEFAULT);
      notificationChannelDefault.enableLights( true );
      notificationChannelDefault.setLightColor( Color.WHITE );
      notificationChannelDefault.enableVibration( true );
      notificationChannelDefault.setShowBadge( false );
      notifyManager.createNotificationChannel( notificationChannelDefault );
    }
  }
}

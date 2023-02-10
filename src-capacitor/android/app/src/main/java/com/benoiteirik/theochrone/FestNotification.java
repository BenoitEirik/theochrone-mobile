package com.benoiteirik.theochrone;

import android.app.AlarmManager;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.os.Build;

import androidx.core.app.NotificationCompat;

import java.util.ArrayList;
import java.util.Calendar;

public class FestNotification {
  private final Context context;
  private PendingIntent pendingIntent = null;
  private final NotificationManager notificationManager;
  private final int notificationId = 1110;

  public FestNotification(Context context) {
    this.context = context;
    this.notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
  }

  public FestNotification(Context context, PendingIntent pendingIntent) {
    this.context = context;
    this.notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
    this.pendingIntent = pendingIntent;
  }

  public void send() {
    createNotificationChannel();

    class NotificationTask extends AsyncTask<Void, Void, ArrayList<String>> {
      @Override
      protected ArrayList<String> doInBackground(Void... voids) {
        // Get fests of the day
        Fests fests = new Fests();
        ArrayList<String> arrayFests = fests.getDayFests();
        if (arrayFests.isEmpty()) cancel(true);
        StringBuilder parsedContent = new StringBuilder();
        for( int i = 0; i < arrayFests.size(); i++) {
          parsedContent.append("• ").append(arrayFests.get(i)).append("\n");
        }

        ArrayList<String> ret = new ArrayList<>();
        ret.add(fests.getDay());
        ret.add(parsedContent.toString());
        return ret;
      }

      @Override
      protected void onPostExecute(ArrayList<String> result) {
        // Create the Notification
        NotificationCompat.Builder builder = new NotificationCompat.Builder(context, "CHANNEL_ID")
          .setSmallIcon(R.mipmap.ic_launcher_foreground)
          .setLargeIcon(BitmapFactory.decodeResource(context.getResources(), R.mipmap.ic_launcher_foreground))
          .setStyle(new NotificationCompat.BigPictureStyle()
            .bigLargeIcon(BitmapFactory.decodeResource(context.getResources(), R.mipmap.ic_launcher_foreground)))
          .setContentTitle(result.get(0))
          .setContentText(result.get(1))
          .setStyle(new NotificationCompat.BigTextStyle()
            .bigText(result.get(1)))
          .setPriority(NotificationCompat.PRIORITY_DEFAULT)
          .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
          .setContentIntent(pendingIntent)
          .setOngoing(true)
          .setVibrate(new long[]{0});

        // Show the notification

        notificationManager.notify(notificationId, builder.build());
      }
    }

    NotificationTask task = new NotificationTask();
    task.execute();

    // Set notification when changing the day
    scheduleNotification();
  }

  private void createNotificationChannel() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      CharSequence name = context.getString(R.string.app_name);
      String description = context.getString(R.string.app_name);
      int importance = NotificationManager.IMPORTANCE_LOW;
      NotificationChannel channel = new NotificationChannel("CHANNEL_ID", name, importance);
      channel.setDescription(description);
      channel.enableVibration(false);
      channel.setVibrationPattern(new long[]{0});
      channel.setSound(null, null);
      channel.enableLights(false);
      channel.setLockscreenVisibility(NotificationCompat.VISIBILITY_PUBLIC);
      notificationManager.createNotificationChannel(channel);
    }
  }

  private void scheduleNotification() {
    AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
    Intent intent = new Intent(context, BootActions.class);
    PendingIntent pendingIntent = PendingIntent.getBroadcast(context, 0, intent, 0);
    Calendar calendar = Calendar.getInstance();
    calendar.setTimeInMillis(System.currentTimeMillis());
    calendar.set(Calendar.HOUR_OF_DAY, 0);
    calendar.set(Calendar.MINUTE, 0);
    calendar.set(Calendar.SECOND, 0);
    calendar.add(Calendar.DAY_OF_MONTH, 1);
    alarmManager.setRepeating(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), AlarmManager.INTERVAL_DAY, pendingIntent);
  }
}

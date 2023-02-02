package com.benoiteirik.theochrone;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;

import androidx.core.app.NotificationCompat;

import com.getcapacitor.BridgeActivity;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    registerPlugin(BridgePlugin.class);

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      CharSequence name = getString(R.string.app_name);
      String description = getString(R.string.app_name);
      int importance = NotificationManager.IMPORTANCE_HIGH;
      NotificationChannel channel = new NotificationChannel("CHANNEL_ID", name, importance);
      channel.setDescription(description);
      channel.enableVibration(false);
      channel.enableLights(false);
      channel.setVibrationPattern(null);
      channel.setLockscreenVisibility(NotificationCompat.VISIBILITY_PUBLIC);
      // Register the channel with the system; you can't change the importance
      // or other notification behaviors after this
      NotificationManager notificationManager = getSystemService(NotificationManager.class);
      notificationManager.createNotificationChannel(channel);
    }

    class ThreadTask extends AsyncTask<Void, Void, ArrayList<String>> {
      @Override
      protected ArrayList<String> doInBackground(Void... voids) {
        // Get fests of the day
        Fests fests = new Fests();
        ArrayList<String> arrayFests = fests.getDayFests();
        String parsedContent = "";
        for( int i = 0; i < arrayFests.size(); i++) {
          parsedContent += "• "+ arrayFests.get(i) + "\n";
        }

        ArrayList<String> ret = new ArrayList<>();
        ret.add(fests.getDay());
        ret.add(parsedContent);
        return ret;
      }

      @Override
      protected void onPostExecute(ArrayList<String> result) {
        // Create a Notification with the intent
        NotificationCompat.Builder builder = new NotificationCompat.Builder(getBaseContext(), "CHANNEL_ID")
          .setSmallIcon(R.mipmap.ic_launcher_foreground)
          .setLargeIcon(BitmapFactory.decodeResource(getResources(), R.mipmap.ic_launcher_foreground))
          .setStyle(new NotificationCompat.BigPictureStyle()
            .bigLargeIcon(BitmapFactory.decodeResource(getResources(), R.mipmap.ic_launcher_foreground)))
          .setContentTitle(result.get(0))
          .setContentText(result.get(1))
          .setStyle(new NotificationCompat.BigTextStyle()
            .bigText(result.get(1)))
          .setPriority(NotificationCompat.PRIORITY_DEFAULT)
          .setVisibility(NotificationCompat.VISIBILITY_PUBLIC);

        // Show the notification
        NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        notificationManager.notify(0, builder.build());
      }
    }

    AsyncTask<Void, Void, ArrayList<String>> task = new ThreadTask().execute();
  }
}

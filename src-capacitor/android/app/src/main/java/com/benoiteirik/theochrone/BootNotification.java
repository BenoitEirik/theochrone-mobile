package com.benoiteirik.theochrone;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

public class BootNotification extends BroadcastReceiver {
  @Override
  public void onReceive(Context context, Intent intent) {
    Log.d("BOOT", "Notification starting...");
  }
}

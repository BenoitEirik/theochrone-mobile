package com.benoiteirik.theochrone;

import android.os.AsyncTask;
import android.util.Log;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;

@CapacitorPlugin(name = "TextesPlugin")
public class TextesPlugin extends Plugin {
  private JSObject dataHTML;

  // Bridge data between back and front
  private PluginCall festTextesCall;


  @PluginMethod()
  public void echo(PluginCall call) {
    String value = call.getString("value");
    Log.d("MSG:", " " + value);
    JSObject ret = new JSObject();
    ret.put("value", value);
    call.resolve(ret);
  }

  @PluginMethod()
  public void  getFestTextes(PluginCall call) {
    String festURL = call.getString("url");
    festTextesCall = call;
    AsyncTask<String, Void, Void> fetch = new fetchFestTextes().execute(festURL);
  }

  private class fetchFestTextes extends AsyncTask<String, Void, Void> {

    @Override
    protected Void doInBackground(String... params) {
      try {
        dataHTML = new JSObject();
        Document doc = Jsoup.connect(params[0])
          .timeout(0)
          .header("Content-Type", "text/html; charset=ISO-8859-1")
          .get();

        Elements imgs = doc.select("img[src]");
        for (Element img : imgs) {
          String src = img.attr("src");
          if (!src.startsWith("http")) {
            src = "https://introibo.fr/" + src;
          }
          img.attr("src", src);
          img.attr("style", "width:100%; object-fit: contain;");
        }

        Elements links = doc.select("a[href]");
        for (Element link : links) {
          String href = link.attr("href");
          if(href.charAt(0) == '#') {
            link.removeAttr("href");
          }
        }

        Element h3 = doc.select("h3.spip:contains(Sommaire)").first();
        if (h3 != null) {
          Element table = h3.nextElementSibling();
          if (table != null && table.hasClass("spip")) {
            table.attr("style", "width: 100%; border: 1px solid lightgrey;border-radius: 4px;");
          }
        }

        Elements cells = doc.select("td");
        for (Element cell : cells) {
          cell.attr("valign", "top");
        }

        String textes = doc.select("#principal .texte").html();

        dataHTML.put("data", textes);
      } catch (IOException e) {
        e.printStackTrace();
      }

      return null;
    }

    protected void onPostExecute(Void result) {
      festTextesCall.resolve(dataHTML);
    }
  }
}

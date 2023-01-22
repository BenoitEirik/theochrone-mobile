package com.benoiteirik.theochrone;

import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import java.io.IOException;
import java.util.ArrayList;

public class Fests {
  private String baseURL = "https://theochrone.fr/kalendarium/accueil";

  String getDay() {
    String day = "";

    try {
      Document doc = Jsoup.connect(baseURL).timeout(0).get();

      // Get title the day
      day = doc.select("#resultup .container .row div h3 a").text();
    } catch (IOException e) {
      e.printStackTrace();
    }

    return day;
  }

  ArrayList<String> getDayFests() {
    ArrayList<String> fests = new ArrayList<>();
    try {
      Document doc = Jsoup.connect(baseURL).timeout(0).get();

      // Get fests
      Elements festsElements = doc.select("#resultup .container .row div div .panel-group .panel-default");
      for (Element el : festsElements) {
        fests.add(el.select(".panel-heading .panel-title a").text());
      }
      return fests;
    } catch (IOException e) {
      e.printStackTrace();
    }

    return fests;
  }
}

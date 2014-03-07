define({
  "root": {
    "module-demo-backbone": {
      "projectName": 'Demo: BackboneJS',
      "nameSpaces":['demo-bb-'],
      "labels": [{
        "LABEL_0": "Submit",
        "LABEL_1": "demo-backbone",
        "LABEL_2": "Home",
        "LABEL_3": "Articles",
        "LABEL_4": "Links",
        "LABEL_5": "Appland documentation",
        "LABEL_6": "GitHub source",
        "LABEL_7": "http://appland.io/",
        "LABEL_8": "https://github.com/jabdul/appland/tree/demo/backbone",
        "LABEL_9": "Module: ",
        "LABEL_10": "A single page WebApp.",
        "LABEL_11": "Develop a Backbone.js WebApp" +
          " on Appland; the end-to-end UI development platform.",
        "LABEL_12": "Start your journey",
        "LABEL_13": "./#/articles",
        "LABEL_14": "Search articles",
        "LABEL_15": "Craft Turf",
        "LABEL_16": "2014",
        "LABEL_17": "Next",
        "LABEL_18": "Previous",
        "LABEL_19": "Error!",
        "LABEL_20": "The article requested is not available.",
        "LABEL_21": "more",
        "LABEL_22": "The tutorial is currently not available."
      }],
      "pathToAssets": "/assets/",
      "services": {
        "findArticles": {
          "resource": "articles",
          "path": "/api/demo/",
          'isLocal': false,
          "httpRequestMethod": "GET",
          "params": {}
        }
      }
    }
  },
  "zh-cn": true
});
define({
  "root": {
    "module-demo-backbone": {
      "projectName": 'Demo: BackboneJS',
      "nameSpaces":['demo-bb-'],
      "labels": [{
        "LABEL_0": "Submit",
        "LABEL_1": "demo-web-app",
        "LABEL_2": "Home",
        "LABEL_3": "Articles",
        "LABEL_4": "Links",
        "LABEL_5": "Admin",
        "LABEL_6": "Run tests",
        "LABEL_7": "http://localhost:9010/",
        "LABEL_8": "http://localhost:9011/src-test/module-demo-web-app/TestRunner.html",
        "LABEL_9": "Module: ",
        "LABEL_10": "A single page WebApp.",
        "LABEL_11": "Develop a WebApp" +
          " using Appland; an end-to-end modular development platform.",
        "LABEL_12": "Start your journey",
        "LABEL_13": "./#/articles",
        "LABEL_14": "Search articles",
        "LABEL_15": "Craft Turf",
        "LABEL_16": "2014",
        "LABEL_17": "Next",
        "LABEL_18": "Previous",
        "LABEL_19": "Error!",
        "LABEL_20": "The article requested is not available.",
        "LABEL_21": "more"
      }],
      "pathToAssets": "../",
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
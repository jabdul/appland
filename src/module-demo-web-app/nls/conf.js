define({
  "root": {
    "module-demo-web-app": {
      "projectName": "Demo Web App",
      "nameSpaces":['demo-web-app-'],
      "labels": [{
        "LABEL_0": "Submit",
        "LABEL_1": "demo-web-app",
        "LABEL_2": "Home",
        "LABEL_3": "Articles",
        "LABEL_4": "Links",
        "LABEL_5": "Admin",
        "LABEL_6": "Run tests"
      }],
      "labels2": {
        "LABEL_0": "Submit",
        "LABEL_1": "demo-web-app",
        "LABEL_2": "Home",
        "LABEL_3": "Articles",
        "LABEL_4": "Admin",
        "LABEL_5": "Run tests"
      },
      "labels3": [
        {"LABEL_0": "Submit"},
        {"LABEL_1": "demo-web-app"},
        {"LABEL_2": "Home"},
        {"LABEL_3": "Articles"},
        {"LABEL_4": "Admin"},
        {"LABEL_5": "Run tests"}
      ],
      "pathToAssets": "../",
      "services": {
        "findArticles": {
          "resource": "",
          "path": "/raw.php?",
          'isLocal': false,
          "httpRequestMethod": "GET",
          "params": {
            "i": "bfUB0TPQ"
          }
        }
      },
      "maxDefaultTags": 2,
      "activeArticles": 6
    }
  },
  "zh-cn": true
});
define({
  "root": {
    "module-demo-web-app": {
      "projectName": 'Demo Web App',
      "nameSpaces":['demo-web-app-'],
      "labels": [
        {"LABEL_0": "Welcome"},
        {"LABEL_1": "Articles"}
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
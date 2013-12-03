define({
  "root": {
    "module-tt-article": {
      "projectName": 'Talk Talk Articles',
      "nameSpaces":['tt-articles-'],
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
      "maxDefaultTags": 2
    }
  },
  "zh-cn": true
});
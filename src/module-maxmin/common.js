if (typeof requirejs === 'undefined') {
  throw 'RequireJs script loader is required.';
}
requirejs.config({
  baseUrl: '../../',
  waitSeconds: 7,
  paths: {
    'jquery': 'lib/jquery/jquery',
    'underscore': 'lib/underscore-amd/underscore',
    'backbone': 'lib/backbone-amd/backbone',
    'domReady': 'lib/requirejs/domReady'
  }
});
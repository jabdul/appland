if (typeof requirejs === 'undefined') {
  throw 'RequireJs script loader is required.';
}
requirejs.config({
  baseUrl: './',
  waitSeconds: 7,
  paths: {
    'jquery': '../../src/lib/jquery/jquery',
    'underscore': '../../src/lib/underscore-amd/underscore',
    'backbone': '../../src/lib/backbone-amd/backbone',
    'domReady': '../../src/lib/requirejs/domReady'
  }
});
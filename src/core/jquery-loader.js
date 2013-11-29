/**
 * see http://stackoverflow.com/questions/4858431/use-requirejs-and-jquery-without-clobbering-global-jquery
 */
define('jquery', ['lib/jquery-1-9-1/jquery'], function () {
  return jQuery.noConflict(true);
});
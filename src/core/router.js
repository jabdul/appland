/**
 * Routing object for handling url changes
 * and loading content according to sub-pages
 */
define(['jquery' /*, 'module-mywgsn-navigation/controller/image-list-controller'*/],

    /*, ImageListController*/

    function($) {

	function Router() {

	}

	/**
	 * Handles the browser url's hash part
	 * @param  {string} url
	 * @return {undefined}
	 */
	Router.prototype.handleURL = function(url) {

		switch (url) {

			case 'images':

				var container = $('.wgsn-cnt-iml');

				/*
				control = new ImageListController({
					container: container
				});
            */

				break;
      case 'reports':
        break;
      default:
        break;
		}
	};

      /**
    * Sets up the routing by assigning history handling for all anchor tags
    * @param  {Object} options
    * @return {boolean} false.
    */
	Router.prototype.init = function(options) {

		var self = this;

		/**
		 * Looking for all the links with a valid href attribute
		 */
		$('body').click(function(event) {

			var el = event.target;

			if (el.nodeName == 'A' && el.href && el.href.length > 0) {

				// keep the link in the browser history
				history.pushState(null, null, el.href);

				var returnLocation = history.location || document.location;
				self.handleURL(returnLocation.hash.replace('#', ''));

				return false;
			}
		});

		// hang on popstate event triggered by pressing back/forward in browser
		$(window).bind('popstate', function(e) {

			/*
			 * Note, this is the only difference when using this library,
			 * because the object document.location cannot be overriden,
			 * so library the returns generated "location" object within
			 * an object window.history, so get it out of "history.location".
			 * For browsers supporting "history.pushState" get generated
			 * object "location" with the usual "document.location".
			 */
			var returnLocation = history.location || document.location;
		});

	};
	return Router;

    });

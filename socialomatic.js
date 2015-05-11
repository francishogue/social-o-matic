/* global socialOmatic, console, window, document */

(function(window, document, undefined) {

	'use strict';

	var socialOmatic = window.socialOmatic = window.socialOmatic || {};

	socialOmatic.youtube = (function() {

		var
			opts,
			defaults = {
				hasLoaded: function() {}
			};

		/**
		 * Loads YouTube JS SDK
		 * @param {Object} options for the SDK
		 */
		var init = function(options) {

			opts = extend({}, defaults, options);

			var tag = document.createElement('script');
			tag.src = "https://www.youtube.com/iframe_api";
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

			if(window.YT) {
				youtubeReady();
			} else {
				window.onYouTubeIframeAPIReady = youtubeReady;
			}
		};

		var youtubeReady = function() {
			if(opts.hasLoaded && typeof(opts.hasLoaded) === 'function') {
				opts.hasLoaded();
			}
		};

		return {
			init: init
		};
	})();


	socialOmatic.facebook = (function() {

		var
			opts,
			defaults = {
				lang: 'en',
				fbInitOptions: {
					appId: '379621572239384',
					status: false,
					xfbml: true,
					version: 'v2.3'
				},
				hasLoaded: function() {}
			};

		/**
		 * Loads Facebook JS SDK
		 * @param {Object} options for the SDK
		 */
		var init = function(options) {

			// console.log(options);

			if(typeof options === 'undefined') {
				console.error('socialOmatic.facebook.init requires an options object parameter');
			}

			opts = extend({}, defaults, options);

			// console.log(opts);

			// https://developers.facebook.com/docs/reference/javascript/FB.init/
			(function(d, s, id) {
				var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) return;
				js = d.createElement(s); js.id = id;
				js.src = "//connect.facebook.net/"+opts.lang+"/all.js";
				fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));

			if(window.FB) {
				facebookReady();
			} else {
				window.fbAsyncInit = facebookReady;
			}
		};

		var facebookReady = function() {
			window.FB.init(opts.fbInitOptions);

			if(opts.hasLoaded && typeof(opts.hasLoaded) === 'function') {
				opts.hasLoaded();
			}
		};

		return {
			init: init
		};
	})();


	socialOmatic.twitter = (function() {

		var
			opts,
			defaults = {
				hasLoaded: function() {}
			};

		/**
		 * Loads Twitter JS SDK
		 * @param {Object} options for the SDK
		 */
		var init = function(options) {

			opts = extend({}, defaults, options);

			window.twttr = (function(d, s, id) {
				var js, fjs = d.getElementsByTagName(s)[0],
				  t = window.twttr || {};
				if (d.getElementById(id)) return t;
				js = d.createElement(s);
				js.id = id;
				js.src = "https://platform.twitter.com/widgets.js";
				fjs.parentNode.insertBefore(js, fjs);

				t._e = [];
				t.ready = function(f) {
				  t._e.push(f);
				};

				return t;
			}(document, "script", "twitter-wjs"));

			window.twttr.ready(function (twttr) {
				twitterReady(twttr);
			});

		};

		var twitterReady = function(twttr) {
			// console.log('twttr', twttr);
			if(opts.hasLoaded && typeof(opts.hasLoaded) === 'function') {
				opts.hasLoaded(twttr);
			}
		};

		return {
			init: init
		};
	})();


	// Extend helper
	var extend = function(out) {
		out = out || {};

		for (var i = 1; i < arguments.length; i++) {
			if (!arguments[i])
				continue;

			for (var key in arguments[i]) {
				if (arguments[i].hasOwnProperty(key))
					out[key] = arguments[i][key];
			}
		}

		return out;
	};

})(window, document);

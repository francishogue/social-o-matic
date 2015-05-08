Social-O-matic
==============

Quick and easy way to add social plugins to your website (Facebook JS API, Twitter API & YouTube API).

## Usage ##
```JavaScript
// Initialize FB SDK
socialOmatic.facebook.init({
	lang: 'en', // Make this part dynamic by reading your document language
	fbInitOptions: {
		appId: '379621572239384', // Make this part dynamic by using data-attr on your <body>
		status: false,
		xfbml: true,
		version: 'v2.3'
	},
	hasLoaded: function() {
		console.log('Facebook JS SDK ready!');
		document.getElementById('fb-api').textContent = 'Facebook JS SDK ready!';

		// You can now start using it safely (binding events, using methods, etc).
	}
});

// Initialize YouTube SDK
socialOmatic.youtube.init({
	hasLoaded: function() {
		console.log('YouTube JS API ready!');
		document.getElementById('yt-api').textContent = 'YouTube JS API ready!';

		// You can now start using it safely (binding events, using methods, etc).
	}
});


// Initialize Twitter SDK
socialOmatic.twitter.init({
	hasLoaded: function() {
		console.log('Twitter JS API ready!');
		document.getElementById('tw-api').textContent = 'Twitter JS API ready!';

		// You can now start using it safely (binding events, using methods, etc).
	}
});
```

## TODO ##
- add more APIs
- add Gulp
- ?


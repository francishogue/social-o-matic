/* ===========================================================================
Social plugins (FB like button, Twitter tweet button and Google +1)
============================================================================== */
var socialPlugins = (function($, window, undefined) {
    var lang = null;

    var initFB = function() {
        // https://developers.facebook.com/docs/reference/javascript/FB.init/
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/"+lang+"/all.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        window.fbAsyncInit = function() {
            FB.init({
                appId      : $('body').data('fb-appid'),
                status     : true,
                cookie     : true,
                xfbml      : true
            });

            FB.Event.subscribe('edge.create', function(href, widget){
                _gaq.push(['_trackSocial', 'Facebook', 'Like', href]);
            });
        }
    }

    var initGoogle = function() {
        // https://developers.google.com/+/web/+1button/#async-load
        window.___gcfg = {
            lang: lang,
            parsetags: 'onload'
        };
        (function() {
            var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
            po.src = 'https://apis.google.com/js/plusone.js?onload=test';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
        })();
    }

    var initTwitter = function() {
        // https://dev.twitter.com/docs/intents/events
        window.twttr = (function (d,s,id) {
            var t, js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return; js=d.createElement(s); js.id=id;
            js.src="//platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs);
            return window.twttr || (t = { _e: [], ready: function(f){ t._e.push(f) } });
        }(document, "script", "twitter-wjs"));

        twttr.ready(function(twttr) {
            function trackSocialIntent(intent_event) {
                if (!intent_event) { return; }
                _gaq.push(['_trackSocial', 'twitter', intent_event.type]);
            }
            twttr.events.bind('click', trackSocialIntent);
            twttr.events.bind('tweet', trackSocialIntent);
            twttr.events.bind('retweet', trackSocialIntent);
            twttr.events.bind('favorite', trackSocialIntent);
            twttr.events.bind('follow', trackSocialIntent);
        });
    }

    // Render specific FB widgets
    var renderFB = function(id) {
        // id = ID of the container (string)
        if(id !== 'undefined') {
            FB.XFBML.parse(document.getElementById(id));
        }else {
            FB.XFBML.parse();
        }
    }

    // Render all Twitter widgets on the page
    var renderTwitter = function() {
        twttr.widgets.load();
    }

    // Render specific Google +1 widget
    var renderPlusone = function(id) {
        // id = ID of the container (string)
        // https://developers.google.com/+/web/+1button/#jsapi
        $el = $('#'+id);
        container = id;
        parameters = {
            'href': $el.data('href'),
            'size': $el.data('size'),
            'annotation': $el.data('annotation'),
            'callback': plusoneCallback
        }
        gapi.plusone.render(container, parameters);
    }

    var plusoneCallback = function(json) {
        //console.log(json);
        _gaq.push(['_trackSocial', 'Google', 'PlusOne', json.href, json.state]);
    }

    $(function() {
        // TODO: only initialize those when needed!
        if($('html').attr('lang') === 'fr') {
            lang = 'fr_CA';
        }else {
            lang = 'en_US';
        }

        if(!$('body').hasClass('front')) {
            initFB();
            initTwitter();
            initGoogle();
        }
    });

    return {
        renderFB: renderFB,
        renderPlusone: renderPlusone,
        renderTwitter: renderTwitter
    }
}(jQuery, window));

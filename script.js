/**
* subscribe popup
* for umlaut
* by @aravindanve
* https://github.com/aravindanve
**/

+function ($, window, document) {

    var SUBSCRIBE_OVERLAY_SELECTOR = '.subscribe_overlay';
    var SUBSCRIBE_OVERLAY_HIDDEN_CLASS = 'subscribe_overlay_ishidden';
    var SUBSCRIBE_OVERLAY_DELAY = 10 * 1000;
    var SUBSCRIBE_OVERLAY_FADE_IN_DURATION = 1000;
    var SUBSCRIBE_OVERLAY_FADE_OUT_DURATION = 500;
    var SUBSCRIBE_MODAL_SELECTOR = '.modal_newslettersignup';
    var SUBSCRIBE_CLOSE_BUTTON_SELECTOR = '.button__close';
    var SUBSCRIBE_FORM_SELECTOR = 'form#email-form-2';
    var SUBSCRIBE_COOKIE = 'subscribed';

    function showSubscribeOverlay() {
        $(SUBSCRIBE_OVERLAY_SELECTOR)
            .stop(true, true)
            .css('opacity', '0')
            .removeClass(SUBSCRIBE_OVERLAY_HIDDEN_CLASS)
            .animate({
                opacity: 1

            }, SUBSCRIBE_OVERLAY_FADE_IN_DURATION, function () {
                $(SUBSCRIBE_OVERLAY_SELECTOR)
                    .css('opacity', '');
            });
    }

    function hideSubscribeOverlay() {
        $(SUBSCRIBE_OVERLAY_SELECTOR)
            .stop(true, true)
            .css('opacity', '1')
            .removeClass(SUBSCRIBE_OVERLAY_HIDDEN_CLASS)
            .animate({
                opacity: 0

            }, SUBSCRIBE_OVERLAY_FADE_OUT_DURATION, function () {
                $(SUBSCRIBE_OVERLAY_SELECTOR)
                    .addClass(SUBSCRIBE_OVERLAY_HIDDEN_CLASS)
                    .css('opacity', '');
            });
    }

    function setCookie(name, value, exp) {
        var expires = 'expires=' + exp;
        document.cookie = 
            name + '=' + 
            value + ';' + 
            expires + ';path=/';
    }

    function getCookie(name) {
        name += '=';
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = (ca[i]+'').trim();
            if (c.match(new RegExp('^' + name))) {
                return c.substring(name.length, c.length);
            }
        }
        return false;
    }

    function removeCookie(name) {
        document.cookie = name + 
            '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }

    function setSubscribedCookie() {
        var expires = 10 * 365 * 24 * 60 * 60;
        setCookie(SUBSCRIBE_COOKIE, 1, expires);
    }

    function isAlreadySubscribed() {
        if (getCookie(SUBSCRIBE_COOKIE)) return true;
        return false;
    }

    function attachEventHandlers() {
        $(SUBSCRIBE_OVERLAY_SELECTOR)
            .on('click', function (e) {
                var target = e.target || e.srcElement;
                var clickedInside = 
                    $(SUBSCRIBE_MODAL_SELECTOR)[0] === target ||
                        $(SUBSCRIBE_MODAL_SELECTOR).find(target).length;

                if (!clickedInside) hideSubscribeOverlay();

            })
            .find(SUBSCRIBE_CLOSE_BUTTON_SELECTOR)
                .on('click', function (e) {
                    hideSubscribeOverlay();
                });

        $(SUBSCRIBE_FORM_SELECTOR)
            .on('submit', function () {
                setSubscribedCookie();
            });
    }

    $(document).ready(function () {
        attachEventHandlers();
    });

    $(window).on('load', function () {
        if (!isAlreadySubscribed()) {
            setTimeout(showSubscribeOverlay, SUBSCRIBE_OVERLAY_DELAY);
        }
    });

}(jQuery, window, document);



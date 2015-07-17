const INSTAGRAM_CLIENT_ID = '904bea01e9d24f8890b35d8a2c351858';
const INSTAGRAM_REDIRECT_URI = encodeURI('http://findwheretheylive.divshot.io');
const INSTAGRAM_ACCESS_TOKEN = location.href.split('#access_token=')[1];
const GOOGLE_API_KEY = 'AIzaSyB732RVASpKiOhtILtgAr1pBkrhu6xk-mQ';

const $jsonp = {
  send: function(src, options) {
    const callback_name = options.callbackName || 'callback',
      on_success = options.onSuccess || function(){},
      on_timeout = options.onTimeout || function(){},
      timeout = options.timeout || 10; // sec

    const timeout_trigger = window.setTimeout(function(){
      window[callback_name] = function() {};
      on_timeout();
    }, timeout * 1000);

    window[callback_name] = function(data) {
      window.clearTimeout(timeout_trigger);
      on_success(data);
    };

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = src;

    document.getElementsByTagName('head')[0].appendChild(script);
  }
};

function searchUsers(username) {
  let url = `https://api.instagram.com/v1/users/search?q=${username}&callback=handleSearchUsers&access_token=${INSTAGRAM_ACCESS_TOKEN}`;
  return new Promise(function(resolve, reject) {
    $jsonp.send(url, {
      callbackName: 'handleSearchUsers',
      onSuccess(json) {
        resolve(json);
      },
      onTimeout() {
        reject();
      }
    });
  });
}

function getMedias(userId) {
  let url = `https://api.instagram.com/v1/users/${userId}/media/recent/?access_token=${INSTAGRAM_ACCESS_TOKEN}&count=100&callback=handleGetMedias`;
  return new Promise(function(resolve, reject) {
    $jsonp.send(url, {
      callbackName: 'handleGetMedias',
      onSuccess(json) {
        resolve(json);
      },
      onTimeout() {
        reject();
      }
    });
  });
}

function getLocation(locationId) {
  let url = `https://api.instagram.com/v1/locations/${locationId}?access_token=${INSTAGRAM_ACCESS_TOKEN}&callback=handleGetLocation`;
  return new Promise(function(resolve, reject) {
    $jsonp.send(url, {
      callbackName: 'handleGetLocation',
      onSuccess(json) {
        resolve(json);
      },
      onTimeout() {
        reject();
      }
    });
  });
}

export default {
  searchUsers,
  getMedias,
  getLocation,
  INSTAGRAM_REDIRECT_URI,
  INSTAGRAM_ACCESS_TOKEN,
  INSTAGRAM_CLIENT_ID,
  GOOGLE_API_KEY
};

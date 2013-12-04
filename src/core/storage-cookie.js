/**
 * Subcookie
 *
 * Gets around the per-domain # cookie limitation
 * by diferent browser vendors. Instead of
 * name=value;name2=value2; an & concat is used, giving:
 * data=name1=value1&name2=value2; Access and update is done
 * using a single wrapping cookie variable. However the 
 * size of the cookies in total is still limited to 4096 bytes.
 * 
 * @category StorageCookie
 * @package Util
 * @author Nicholas Zakas
 * @author James Abdul (james.abdul@craftturf.com)
 * @note Cookie will not be sent to server in JSONP operations.
 * @example Cookie("data", "author", "James Abdul");
 */
define(function () {
  return {
    /**
     * Get subcookie
     * Retrieve a single subcookie value.
     * @example get("data", "author");
     * @param {string} name Container object
     * @param {string} subName The key to retrieve
     * @return {?string}
     */
    get: function (name, subName){
        var subCookies = this.getAll(name);
        if (subCookies){
            return subCookies[subName];
        } else {
            return null;
        }
    },
    /**
     * Get all subcookie
     * Returns all subcookies as parameters of an object.
     * @example getAll("data");
     * @param {string} name Container object's name
     * @return {?object}
     */
    getAll: function(name){
      var cookieName = encodeURIComponent(name) + "=",
          cookieStart = document.cookie.indexOf(cookieName),
          cookieValue = null,
          result = {};
      
      if (cookieStart > -1){
        var cookieEnd = document.cookie.indexOf(";", cookieStart);
        if (cookieEnd == -1){
            cookieEnd = document.cookie.length;
        }
        cookieValue = document.cookie.substring(cookieStart +
            cookieName.length, cookieEnd);

        if (cookieValue.length > 0){
          var subCookies = cookieValue.split("&");
          
          for (var i=0, len=subCookies.length; i < len; i++){
            var parts = subCookies[i].split("=");
            result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
          }
          return result;
        }
      }
      return null;
    },
    /**
     * Set a subcookie
     * Set cookie value including optional params.
     * @example set("data", "author", "James", new Date("February 1, 2010"));
     * @param {string} name Container variable
     * @param {string} subName The contained variable to set
     * @param {string} value The value to set the contained variable
     * @param {string=} expires Date of expiration using the Date Object
     * @param {string=} path Domain path that the cookie is restricted to
     * @param {string=} domain Domain that the cookie is restricted to
     * @param {string=} secure HTTPS only?
     * @return {?object}
     */
    set: function (name, subName, value, expires, path, domain, secure) {
      var subcookies = this.getAll(name) || {};
      subcookies[subName] = value;
      this.setAll(name, subcookies, expires, path, domain, secure);
    },
    /**
     * Set one or more subcookie
     * Set cookies' value including optional params.
     * @example setAll("data", {author, "James"book: "Professional JavaScript"}, 
     *                  Date("February 1, 2010"));
     * @param {string} name Container object
     * @param {string} subcookies The contained {variables:"values"} to set
     * @param {string=} expires Date of expiration using the Date Object
     * @param {string=} path Domain path that the cookie is restricted to
     * @param {string=} domain Domain that the cookie is restricted to
     * @param {string=} secure HTTPS only?
     * @return {?object}
     */
    setAll: function(name, subcookies, expires, path, domain, secure){
      var cookieText = encodeURIComponent(name) + "=";
      var subcookieParts = [];
      
      for (var subName in subcookies){
        if (subName.length > 0 && subcookies.hasOwnProperty(subName)){
          subcookieParts.push(encodeURIComponent(subName) + "=" +
            encodeURIComponent(subcookies[subName]));
        }
      }

      if (subcookieParts.length > 0){
        cookieText += subcookieParts.join("&");
        
        if (expires instanceof Date) {
          cookieText += "; expires=" + expires.toGMTString();
        }
        
        if (path) {
          cookieText += "; path=" + path;
        }
        
        if (domain) {
          cookieText += "; domain=" + domain;
        }
      
        if (secure) {
          cookieText += "; secure";
        }
      } else {
        cookieText += "; expires=" + (new Date(0)).toGMTString();
      }
      
      document.cookie = cookieText;

    },
    /**
     * Unset a subcookie
     * @example unset("data", "author");
     * @param {string} name Container object
     * @param {string} subName The contained variable to set
     * @param {string=} path Domain path that the cookie is restricted to
     * @param {string=} domain Domain that the cookie is restricted to
     * @param {string=} secure HTTPS only?
     * @return {?object}
     */
    unset: function (name, subName, path, domain, secure){
      var subcookies = this.getAll(name);
      if (subcookies){
          delete subcookies[subName];
          this.setAll(name, subcookies, null, path, domain, secure);
      }
    },
    /**
     * Unset all subcookies and key
     * Remove cookie.
     * @example unset("data");
     * @param {string} name Container object
     * @param {string} path The contained variable to set
     * @param {string=} domain Domain path that the cookie is restricted to
     * @param {string=} secure HTTPS only?
     * @return {?object}
     */
    unsetAll: function(name, path, domain, secure){
        this.setAll(name, null, new Date(0), path, domain, secure);
    }
  };
});
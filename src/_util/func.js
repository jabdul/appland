/**
 * Helper Functions
 *
 * Discrete functions and helpers.
 * 
 * @category Func
 * @package Util
 * @author James Abdul (james.abdul@craftturf.com)
 */
define(function () {
  return {
    /**
     * Inheritance - Prototype Inheritance
     *
     * Inheritance using 'Parasitic combination inheritance' pattern.
     * 
     * @param object subType
     * @param object superType
     */
    extend: function(subType, superType){
      var prototype = new Object(superType.prototype);  //create object
      prototype.constructor = subType;                  //augment object
      subType.prototype = prototype;                    //assign object
    },

    /**
     * Capitalise First Letter
     * 
     * @param {string} The text
     * @return {string}
     */
    capFirstLetter: function(str){
      return str.charAt(0).toUpperCase() + str.slice(1);
    },

    /**
     * Remove Value(s) from an Array
     * 
     * @param mixed needle
     * @param {Array} hayStack
     * @param mixed replace   Default=null
     * @return {Array} hayStack
     */
    arrayVal: function(needle,hayStack,replace){
      for(var i=0; i<hayStack.length;i++ ){ 
        if(hayStack[i]==needle) {
          hayStack.splice(i,1);
          i--;
        } 
      }
      return hayStack;
    },

    /**
     * Is value in Array?
     * 
     * @param mixed needle
     * @param {Array} hayStack
     * @return {Boolean}
     */
    inArray: function(needle,hayStack){
      for(var i=0; i < hayStack.length; i++ ){
        if(hayStack[i]==needle) {
          return true;
        }
      }
      return false;
    },

    /**
     * Count and Display Remaining Allowable Characters.
     * 
     * @param {Object} txtField
     * @param {Object} counterField
     * @param {Number} limit
     * @return {Number}
     */
    textCoundown: function (txtField,counterField,limit) {
      if (txtField.value.length > limit)  {
        txtField.value = txtField.value.substring(0, limit);
      } else {
        counterField.value = limit - txtField.value.length;
      }
    },

    /**
     * Fetch Query Parameters
     * 
     * @param null
     * @return object Name value propeties
     */
    getQueryStringArgs: function (){
      //get query string without the initial ?
      var qs = (location.search.length > 0 ? location.search.substring(1) : ""),
      args = {},
      //get individual items
      items = qs.length ? qs.split("&") : [],
      item = null,
      name = null,
      value = null,
      i = 0,
      len = items.length;
      //assign each item onto the args object
      for (i=0; i < len; i++){
        item = items[i].split("=");
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length) {
          args[name] = value;
        }
      }
      return args;
    },

    /**
     * Dynamically Load Styles
     * 
     * @param string url
     * @param int pos
     * @return string
     */
    loadStyles: function(url, pos){
      var link='', head='', items=null, n=0;
      pos = (typeof pos === 'number')? pos: 0;
        link = document.createElement("link");
        link.rel = "stylesheet";
        //link.type = "text/css";
        link.href = url;
        head = document.getElementsByTagName("head")[0];
      head.insertBefore(link, head.childNodes[pos]);
    },

    /**
     * Dynamically Add Text at Cursor in TextArea
     * 
     * @param string areaId CSS ID
     * @param string text Text value
     * @return string
     * @author http://www.scottklarr.com/topic/425/how-to-insert-text-into-a-textarea-where-the-cursor-is/
     */
    insertAtCaret: function ( areaId, text ) {
      var txtarea = document.getElementById(areaId);
      var scrollPos = txtarea.scrollTop;
      var strPos = 0;
      var range  = null;
      var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ? 
        "ff" : (document.selection ? "ie" : false ) );
      if (br == "ie") { 
        txtarea.focus();
        range = document.selection.createRange();
        range.moveStart ('character', -txtarea.value.length);
        strPos = range.text.length;
      }
      else if (br == "ff") strPos = txtarea.selectionStart;
      
      var front = (txtarea.value).substring(0,strPos);  
      var back = (txtarea.value).substring(strPos,txtarea.value.length); 
      txtarea.value=front+text+back;
      strPos = strPos + text.length;
      if (br == "ie") { 
        txtarea.focus();
        range = document.selection.createRange();
        range.moveStart ('character', -txtarea.value.length);
        range.moveStart ('character', strPos);
        range.moveEnd ('character', 0);
        range.select();
      }
      else if (br == "ff") {
        txtarea.selectionStart = strPos;
        txtarea.selectionEnd = strPos;
        txtarea.focus();
      }
      txtarea.scrollTop = scrollPos;
    },

    /**
     * Format a Float
     * 
     * @param string | float value
     * @param int precision
     * @return string
     * @example CT.Util.Funcs.formatFloat('123.456', 2);
     * @see http://stackoverflow.com/questions/661562/how-to-format-a-float-in-javascript
     */
    formatFloat: function (value, precision) {
        var power = Math.pow(10, precision || 0);
        return String( (Math.round(value * power) / power).toFixed(precision) );
    },

    /**
     * Return Frame Window's Name
     * 
     * @param string name
     * @param string url
     * @return string
     * @example CT.Util.Funcs.getFrameByName('name_attr');
     * @see http://joekuan.wordpress.com/2009/06/12/ajax-a-simplified-version-of-file-upload-form-using-iframe/
     * @see http://javascript.info/tutorial/same-origin-security-policy
     * @see http://easyxdm.net/wp/
     * @see http://softwareas.com/cross-domain-communication-with-iframes
     */
    getFrameByName: function (name, url) {
      for (var i = 0, len = frames.length; i < len; i++) {
        if (frames[i].name == name) {
        return frames[i];
        }
      }
      return null;
    },

    /**
     * Send Datetime Format
     * 
     * @param string dateTime
     * @return object d
     * @see http://stackoverflow.com/questions/3075577/convert-mysql-datetime-stamp-into-javascripts-date-format
     * @see http://www.w3schools.com/jsref/jsref_obj_date.asp
     */
    formatToDateTime: function(dateTime) {
      var d = null, t = null;
      // Split timestamp into [ Y, M, D, h, m, s ]
      t = dateTime.split(/[\- :]/);
      // Wed Apr 04 2012 22:09:00 GMT+0100 (BST)
      d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3]-1, t[4], t[5]));
      return d;
    }
  };
});
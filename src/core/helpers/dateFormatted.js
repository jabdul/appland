define([
    'handlebars',
    'lib/datejs/build/date'
    ], function ( Handlebars ) {
  function dateFormatted ( date) {
      if (typeof date !== 'undefined') {
          var tDate = Date.parse(date);

          if ( Object.prototype.toString.call(tDate) === "[object Date]" ) {
              // it is a date
              if ( isNaN( tDate.getTime() ) ) {
                  throw new Error("Date is not valid");
              }
              else {
                  return tDate.toString("dd MMM yyyy");
              }
          }
          else {
              throw new Error("Not a date!");
          }
      } else {
        throw new Error("No date was supplied for helper")
      }

  }
  Handlebars.registerHelper( 'dateFormatted', dateFormatted );
  
  return dateFormatted;
});
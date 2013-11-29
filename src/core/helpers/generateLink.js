define(['handlebars'], function ( Handlebars ) {
  function generateLink ( context, options ) {
    var len = context.length,
        links = [];
    for (var i = 0; i < len; i++) {
      links.push('<a href="' + context[i] + '">title</a>');
    }
    
    return links.join("\n");
  }
  Handlebars.registerHelper( 'generateLink', generateLink );
  
  return generateLink;
});
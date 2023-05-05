$(document).ready(() => {
  $('input[type=checkbox]').click((e) => { 
      
      const tags = []
      for (const inp of $('input[type=checkbox]:checked')) {
          const name = $(inp).attr('data-name');
          tags.push(name)
          $('.amenities h4').text(tags.toString())
      }
      if (tags.length == 0) {
          $('.amenities h4').html("&nbsp;")
      }
  });

  $.ajax({
    method: "GET",
    url: "api/v1/status/",
    data: {}
  })
    .done(function( msg ) {
      alert( "Data Saved: " + msg );
  });

  $.ajax(
    {url:'http://localhost:5003/api/v1/status/', success: (result) => {
      if (result.status == "OK") {
        $("div#api_status").addClass("available")
      } else {
        $("div#api_status").removeClass("available")
      }
      
    }}
  )
  
});
$(document).ready(() => {
 
  const createElement = data => `
  <article>
    <div class="title_box">
      <h2>${data.name}</h2>
      <div class="price_by_night">${ data.price_by_night }</div>
    </div>
    <div class="information">
      <div class="max_guest">${ data.max_guest } Guest${data.max_guest > 1 ? 's' : ''}</div>
            <div class="number_rooms">${ data.number_rooms } Bedroom${data.number_rooms > 1 ? 's' : ''}</div>
            <div class="number_bathrooms">${ data.number_bathrooms } Bathroom${data.number_bathrooms > 1 ? 's' : ''}</div>
    </div>
    <div class="user">
            <b>Owner:</b> red
          </div>
          <div class="description">
            ${ place.description | "safe" }
          </div>
  </article>`
  
  const filterAjax = (Place_Amenities, obj=null) => {
    console.log(obj)
    if (!obj){
      $.ajax({
        type: "POST",
        url: "http://localhost:5001/api/v1/places_search/",
        contentType: "application/json",
        data: '{}',
        success: (result) => {
          $("section.places").html(" ")
          console.log(result)
          for (place of result) {
            $("section.places").append(createElement(place))
          }
        }
      });
    }
    if (Place_Amenities == "amenities" && obj != null){
      $.ajax({
        type: "POST",
        url: "http://localhost:5001/api/v1/places_search/",
        contentType: "application/json",
        data: JSON.stringify(obj),
        success: (result) => {
          $("section.places").html(" ")
          console.log(result)
          for (place of result) {
            $("section.places").append(createElement(place))
          }
        }
      });
    }
  }

  $('input[type=checkbox]').click((e) => { 
    const ids = []
    const tags = []
    const obj = {}
    for (const inp of $('input[type=checkbox]:checked')) {
        const name = $(inp).attr('data-name');
        const id = $(inp).attr('data-id');

        ids.push(id);
        tags.push(name)
        obj.amenities = ids

        $('.amenities h4').text(tags.toString())
    }
    if (tags.length == 0) {
        $('.amenities h4').html("&nbsp;")
        filterAjax("places")

    } else {
      filterAjax("amenities", obj)
    }
});
  $.ajax({
    type: "POST",
    url: "http://localhost:5001/api/v1/places_search/",
    contentType: "application/json",
    data: '{}',
    success: (result) => {
      for (place of result) {
        $("section.places").append(createElement(place))
      }
    }
  });


  $.ajax(
    {url:'http://localhost:5001/api/v1/status/', success: (result) => {
      if (result.status == "OK") {
        $("div#api_status").addClass("available")
      } else {
        $("div#api_status").removeClass("available")
      }

    }}
  )

});
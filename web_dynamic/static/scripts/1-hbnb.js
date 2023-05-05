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
});
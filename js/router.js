$('document').ready(function() {
    var route = window.location.href.split('route=')[1];
    console.log(route);
    if(!route) {
        $('main').load('/pages/home.html');
    }
});

window._ = require('lodash');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
    window.$ = window.jQuery = require('jquery');

    require('bootstrap-sass');
} catch (e) {}
require('font-awesome/css/font-awesome.css');
/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo'

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: 'your-pusher-key'
// });

//
window.GetQueryString = (name) =>{
    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if(r)return  unescape(r[2]); return null;
};

$(()=>{
    $.ajaxSetup({headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}});
    $(document).on('click','.ajax',(e) => {
        e.preventDefault()
        $.ajax({
            type:$(e.target).attr('methods'),
            url: $(e.target).attr('href'),
            success: (data, textStatus) => {
                console.log(data)
                //location.reload(true);
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.log(jqXHR.responseText)
                let failModal = $('#failModal')
                failModal.find(".modal-content").text(errorThrown);
                failModal.modal('show');
            }
        })
    });
    $('form').submit((e)=>{
        e.preventDefault();
        console.log()
        $.ajax({
            type:$(e.target).attr('method'),
            url: $(e.target).attr('action'),
            data: $(e.target).serialize(),
            success: (data, textStatus) => {
                console.log(data)
                location.href = $(e.target).attr('data-forward')
                //location.reload(true);
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.log(jqXHR.responseText)
                let failModal = $('#failModal')
                failModal.find(".modal-content").text(errorThrown);
                failModal.modal('show');
            }
        })
    })
})


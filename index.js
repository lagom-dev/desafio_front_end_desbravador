import Result_list from './components/Result_list.js';
import Utils from './Utils.js';

//require('./components/Result_list');
var ID_SEARCH_BOX = 'search_box';
var ID_CONTAINER_RESULT_LIST = 'container_result_list';
var ID_RESULT_LIST = 'result_list';
var container_result_list;
var result_list;
var search_box_element;
var search_time_out;


function handle_search_box_events() {
    search_box_element.addEventListener('keydown',
        search_box_type_callback);
}

function search_box_type_callback() {
    clearTimeout(search_time_out);
    search_time_out = setTimeout(
        function () {
            var typed_value = Utils.get_prop_value(search_box_element, 'value');
            var normalized_value = normalize_string(typed_value);
            run_search(normalized_value);
        }, 800);
}



function normalize_string(_typed_value) {
    if (Utils.is_valid_value(_typed_value)) {
        var typed_value = JSON.stringify(_typed_value);
        var white_space_regex = /\s/g;
        var special_char_regex = /[^\w\s]/gi;
        var trimmed_value = typed_value.replace(white_space_regex, '');
        var normalized_value = trimmed_value.replace(special_char_regex, '');
        return normalized_value;
    } else {
        var caller = arguments.callee.caller.name;
        console.log('value is not valid: ', _typed_value, 'caller: ', caller);
    }
}


var SEARCH_BASE_URL = 'https://api.github.com/search/';
var USER_SEARCH_PARAM = 'users?q=';

function make_search_url(_topic) {
    var search_url = SEARCH_BASE_URL + USER_SEARCH_PARAM + _topic;
    return search_url;
}


function run_search(typed_value) {
    var search_url = make_search_url(typed_value);
    if (self.fetch) {
        fetch(search_url)
            .then(function (response) {
                var contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json().then(function (json) {
                        console.log(json);
                        var items = Utils.get_prop_value(json, 'items');
                        var element_result_list = new Result_list(result_list, items);
                        element_result_list.show();
                    });
                } else {
                    console.log("Oops, we haven't got JSON!");
                }
            });
    } else {
        // do something with XMLHttpRequest?
    }
}


document.addEventListener('DOMContentLoaded', function () {
    search_box_element = document.getElementById(ID_SEARCH_BOX);
    container_result_list = document.getElementById(ID_CONTAINER_RESULT_LIST);
    result_list = document.getElementById(ID_RESULT_LIST);
    handle_search_box_events();
});

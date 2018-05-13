
var ID_SEARCH_BOX = 'search_box';
var ID_CONTAINER_RESULT_LIST = 'container_result_list';
var container_result_list;
var search_box_element;
var search_time_out;

function get_prop_value(_object, _prop_name) {
    var prop_value;
    try {
        if (is_valid_value(_object) && is_valid_value(_prop_name)) {
            prop_value = _object[_prop_name];
        }
    } catch (error) {
        console.log(error);
    }
    return prop_value;
}

function handle_search_box_events() {
    search_box_element.addEventListener('keydown',
        search_box_type_callback);
}

function search_box_type_callback() {
    clearTimeout(search_time_out);
    search_time_out = setTimeout(
        function () {
            var typed_value = get_prop_value(search_box_element, 'value');
            var normalized_value = normalize_string(typed_value);
            run_search(normalized_value);
        }, 800);
}

function is_valid_value(_value) {
    var value = false;
    if (typeof _value != 'undefined' && _value != null && _value != '') {
        value = _value || false;
    } else {
        var caller = arguments.callee.caller.name;
        console.log('value is not valid: ', _value, 'caller: ', caller);
    }
    return value;
}

function normalize_string(_typed_value) {
    if (is_valid_value(_typed_value)) {
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
                        var items = get_prop_value(json, 'items');
                        fill_result_list(items);
                    });
                } else {
                    console.log("Oops, we haven't got JSON!");
                }
            });
    } else {
        // do something with XMLHttpRequest?
    }
}

function fill_result_list(items) {
    items.forEach(item => {
        var element_list_item = make_result_list_element_item(item);
        container_result_list.append(element_list_item);
    });
    toggle_result_list();
}

function toggle_result_list() {
    var display_state = container_result_list.style.display;
    if (display_state === 'none') {
        container_result_list.style.display = 'block';
    } else {
        container_result_list.style.display = 'none';
    }
}

function make_result_list_element_item(item) {
    var login = get_prop_value(item, 'login');
    var id = get_prop_value(item, 'id');
    var li_element = document.createElement('li');
    li_element.id = id;
    var span_element = document.createElement('span');
    span_element.innerText = login;
    li_element.append(span_element);
    return li_element;
}

document.addEventListener('DOMContentLoaded', function () {
    search_box_element = document.getElementById(ID_SEARCH_BOX);
    container_result_list = document.getElementById(ID_CONTAINER_RESULT_LIST);
    handle_search_box_events();
});

import { ID_SEARCH_BOX, NAME_SEARCH, NAME_USERS, URL_GITHUB_API } from '../constants.js';
import Utils from '../Utils.js';
import Result_list from './Result_list.js'

export default class Search_box {


    constructor(_selection_callback) {
        this.html_element = document.getElementById(ID_SEARCH_BOX);
        this.bind_events();
        this.search_box_time_out = 0;
        this.selection_callback = _selection_callback;
    }

    bind_events() {
        this.html_element.addEventListener('keydown',
            () => this.type_callback());

    }

    type_callback() {
        clearTimeout(this.search_box_time_out);
        this.search_box_time_out = setTimeout(() => this.delayed_type_callback(), 400);
    }

    delayed_type_callback() {
        let typed_value = Utils.get_prop_value(this.html_element, 'value');
        let normalized_value = Utils.normalize_string(typed_value);
        this.run_search(normalized_value);
    }


    make_search_url(_topic) {
        let search_url =  URL_GITHUB_API + NAME_SEARCH + '/' + NAME_USERS + '?q=' + _topic;
        return search_url;
    }

    get_items(_json) {
        console.log(_json);
        let items = Utils.get_prop_value(_json, 'items');
        let element_result_list = new Result_list(items, this.selection_callback);
        element_result_list.show();
    }

    get_json_response(_response) {
        let content_type = _response.headers.get('content-type');
        if (content_type && content_type.indexOf('application/json') !== -1) {
            return _response.json().then(json => this.get_items(json));
        } else {
            console.log("Oops, we haven't got JSON!");
        }
    }

    run_search(typed_value) {
        let search_url = this.make_search_url(typed_value);
        if (self.fetch) {
            fetch(search_url)
                .then(response => this.get_json_response(response));
        } else {
            // do something with XMLHttpRequest?
        }
    }


}
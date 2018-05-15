import Utils from '../Utils.js';
import Search_box from '../components/Search_box.js';
import { NAME_LOGIN, NAME_ID, ID_CONTAINER_USER_INFO, NAME_SEARCH, NAME_USERS, URL_GITHUB_API } from '../constants.js';
import Repos_container from './Repos_container.js';

export default class Main_container {

    constructor() {
        let search_box = new Search_box(this.load_user_content);
    }



    load_user_content(_user_name) {
        let username = Utils.is_valid_value(_user_name);
        if (username) {
            fetch_user_info();

            let repos_container = new Repos_container(username);

            function fetch_user_info() {
                let url_user = make_user_url();
                let promise;
                if (self.fetch) {
                    promise = fetch(url_user)
                        .then(response => get_json_response(response));
                } else {
                    // do something with XMLHttpRequest?
                }
                return promise;
            }

            function make_user_url() {
                let user_url = URL_GITHUB_API + NAME_USERS + '/' + username;
                return user_url;
            }

            function get_user_info(_json) {
                console.log(_json);
                Utils.set_field_values(_json, ID_CONTAINER_USER_INFO)
            }

            function get_json_response(_response) {
                let content_type = _response.headers.get('content-type');
                if (content_type && content_type.indexOf('application/json') !== -1) {
                    return _response.json().then(json => get_user_info(json));
                } else {
                    console.log("Oops, we haven't got JSON!");
                }
            }
        }
    }

}
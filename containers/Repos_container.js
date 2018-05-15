import { NAME_REPOS, NAME_USERS, ID_REPOS_LIST, URL_GITHUB_API } from '../constants.js';
import Utils from '../Utils.js';
import List_item from '../components/List_item.js';
import Repos_list from '../components/Repos_list.js';

export default class Repos_container {

    constructor(_username) {
        this.load_user_repos(_username);
    }

    load_user_repos(_username) {
        let username = Utils.is_valid_value(_username);
        if (username) {

            fetch_user_repos(username);

            function fetch_user_repos(_username) {
                let url_user = make_repos_url(_username);
                let promise;
                if (self.fetch) {
                    promise = fetch(url_user)
                        .then(response => get_json_response(response));
                } else {
                    // do something with XMLHttpRequest?
                }
                return promise;
            }

            function make_repos_url(_username) {
                let repos_url = URL_GITHUB_API + NAME_USERS + '/' + _username + '/' + NAME_REPOS;
                return repos_url;
            }

            function list_repos(_repos) {
                let repos_list = new Repos_list(ID_REPOS_LIST, _repos);
            }

            function get_json_response(_response) {
                let content_type = _response.headers.get('content-type');
                if (content_type && content_type.indexOf('application/json') !== -1) {
                    return _response.json().then(json => list_repos(json));
                } else {
                    console.log("Oops, we haven't got JSON!");
                }
            }
        }
    }
}
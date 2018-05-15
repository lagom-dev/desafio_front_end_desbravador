import { NAME_HTML_ELEMENT, ID_RESULT_LIST, NAME_FULL_NAME, NAME_ID } from '../constants.js';
import Utils from '../Utils.js';
import List_item from './List_item.js';

export default class Repos_list{

    constructor(_html_id_selector, _repos) {
        this.html_element = document.getElementById(_html_id_selector);
        this.repos = _repos;
        this.list_repos();
    }
  
    list_repos() {
        console.log('repos', this.repos);
        this.repos.forEach(repo => {
            let repo_full_name = Utils.get_prop_value(repo, NAME_FULL_NAME);
            let repo_id = Utils.get_prop_value(repo, NAME_ID);
            let list_item = new List_item(repo_full_name, repo_full_name, this.load_full_repo);
            let html_list_item = Utils.get_prop_value(list_item, NAME_HTML_ELEMENT);
            this.html_element.append(html_list_item);
        });
    }

    load_full_repo(repo) {
        console.log('repo', repo);
    }

}
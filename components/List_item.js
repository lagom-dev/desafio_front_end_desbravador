import { NAME_LOGIN, NAME_ID } from '../constants.js';
import Utils from '../Utils.js';

export default class List_item {

    constructor(_item, _click_callback) {
        this.username = Utils.get_prop_value(_item, NAME_LOGIN);
        this.user_id = Utils.get_prop_value(_item, NAME_ID);
        this.user_data = _item;
        this.click_callback = _click_callback;
        this.html_element = this.render_html(_item, _click_callback);
    }

    selection_callback(){
        this.click_callback(this.user_data);
    }

    render_html(_item, _click_callback) {
        var li_element = document.createElement('li');
        var anchor_element = document.createElement('a');
        anchor_element.innerText = this.username;
        anchor_element.id = this.user_id;
        li_element.append(anchor_element);
        anchor_element.addEventListener('click', () => this.selection_callback());
        return li_element;
    }
}
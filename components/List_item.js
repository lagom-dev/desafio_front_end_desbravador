import { NAME_LOGIN, NAME_ID } from '../constants.js';
import Utils from '../Utils.js';

export default class List_item {

    constructor(item) {
        this.username = Utils.get_prop_value(item, NAME_LOGIN);
        this.user_id = Utils.get_prop_value(item, NAME_ID);
        this.html_element = this.render_html();
    }

    render_html() {
        var li_element = document.createElement('li');
        li_element.id = this.user_id;
        var span_element = document.createElement('span');
        span_element.innerText = this.username;
        li_element.append(span_element);
        return li_element;
    }
}
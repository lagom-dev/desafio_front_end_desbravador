import { NAME_LOGIN, NAME_ID } from '../constants.js';
import Utils from '../Utils.js';

export default class List_item {

    constructor(_text, _id, _click_callback) {
        this.text = _text;
        this.id = _id;
        this.click_callback = _click_callback;
        this.html_element = this.render_html(_click_callback);
    }

    selection_callback(){
        this.click_callback(this.id);
    }

    render_html( _click_callback) {
        var li_element = document.createElement('li');
        var anchor_element = document.createElement('a');
        anchor_element.innerText = this.text;
        anchor_element.id = this.id;
        li_element.append(anchor_element);
        anchor_element.addEventListener('click', () => this.selection_callback());
        return li_element;
    }
}
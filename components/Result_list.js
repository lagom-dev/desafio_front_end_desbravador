import { NAME_HTML_ELEMENT } from '../constants.js';
import Utils from '../Utils.js';
import List_item from './List_item.js';

export default class Result_list {

    constructor(_html_element, _items) {
        this.html_element = _html_element;
        this.handle_events();
        this.items = _items;
        this.fill_results();
    }

    handle_events() {
        let _this = this;
        this.html_element.addEventListener('mouseleave', function(){
            _this.hide();
        });
       
    }

    show() {
        this.html_element.style.display = 'block';
        this.html_element.focus();
    }

    hide() {
        this.html_element.style.display = 'none';
    }

    toggle() {
        let display_state = this.html_element.style.display;
        if (display_state === 'none') {
            this.show();
        } else {
            this.hide();
        }
    }


    clear() {
        while (this.html_element.firstChild) {
            this.html_element.removeChild(this.html_element.firstChild);
        }
    }

    fill_results(_items) {
        this.clear();
        var items = _items || this.items;
        items.forEach(item => {
            var list_item = new List_item(item);
            var html_list_item = Utils.get_prop_value(list_item, NAME_HTML_ELEMENT);
            this.html_element.append(html_list_item);
        });
       
    }
}

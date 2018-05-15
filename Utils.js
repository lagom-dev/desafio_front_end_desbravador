export default class Utils {

    static get_prop_value(_object, _prop_name) {
        let prop_value;
        try {
            if (this.is_valid_value(_object) && this.is_valid_value(_prop_name)) {
                prop_value = _object[_prop_name];
            }
        } catch (error) {
            console.log(error);
        }
        return prop_value;
    }

    static is_valid_value(_value) {
        let value = false;
        if (typeof _value != 'undefined' && _value != null && _value != '') {
            value = _value || false;
        } else {
            //    let caller = arguments ? arguments.callee.caller.name  : 'strict';
            //    console.log('value is not valid: ', _value, 'caller: ', caller);
            console.log('value is not valid: ', _value);
        }
        return value;
    }


    static normalize_string(_typed_value) {
        if (this.is_valid_value(_typed_value)) {
            let typed_value = JSON.stringify(_typed_value);
            let white_space_regex = /\s/g;
            let special_char_regex = /[^\w\s]/gi;
            let trimmed_value = typed_value.replace(white_space_regex, '');
            let normalized_value = trimmed_value.replace(special_char_regex, '');
            return normalized_value;
        } else {
            // let caller = arguments.callee.caller.name;
            console.log('value is not valid: ', _typed_value);
        }
    }

    static set_field_values(json_data, _html_id_selector) {
        let json_props = Object.keys(json_data);
        let content = document.getElementById(_html_id_selector);
        json_props.forEach(prop => {
            var field = content.getElementsByClassName(prop)[0];
            if (field) {
                let value = Utils.get_prop_value(json_data, prop);
                let tag_name = Utils.get_prop_value(field, 'tagName');
                if (tag_name === 'IMG') {
                    field.src = value;
                } else {
                    field.innerHTML = value || 'N/A';
                }
            }
        });
    }

    static clear_field_values(_content_id_selector) {
        let content = document.getElementById(_content_id_selector);
        let value_fields = content.getElementById.
            value_fields.forEach(field => {
                if (field && fied) {
                    let tag_name = Utils.get_prop_value(field, 'tagName');
                    if (tag_name === 'img') {
                        field.src = '';
                    } else {
                        field.innerHTML = '';
                    }
                }
            });
    }

}



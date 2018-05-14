export default class Utils {

    static get_prop_value(_object, _prop_name) {
        var prop_value;
        try {
            if (Utils.is_valid_value(_object) && Utils.is_valid_value(_prop_name)) {
                prop_value = _object[_prop_name];
            }
        } catch (error) {
            console.log(error);
        }
        return prop_value;
    }

    static is_valid_value(_value) {
        var value = false;
        if (typeof _value != 'undefined' && _value != null && _value != '') {
            value = _value || false;
        } else {
            var caller = arguments.callee.caller.name;
            console.log('value is not valid: ', _value, 'caller: ', caller);
        }
        return value;
    }
    
}



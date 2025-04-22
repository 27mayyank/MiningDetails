sap.ui.define([
    "sap/m/MessageBox"
], (MessageBox) => {
    "use strict";

    return {
        validateFields: function (fields) {
            let invalidFields = [];
            for (let field of fields) {
                if (!field.value) {
                    invalidFields.push(field.id);
                }
            }
            if (invalidFields.length > 0) {
                MessageBox.error("Please fill all the fields.");
                return invalidFields;
            }
            return true;
        }
    };
});

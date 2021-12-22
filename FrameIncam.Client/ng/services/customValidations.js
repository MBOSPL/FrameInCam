(function ($, ng, debugMode, undefined) {
    "use strict";

    // --------------------------------------------------------------------------------
    // Dependencies
    // --------------------------------------------------------------------------------
    var module = ng.module("app");

    // --------------------------------------------------------------------------------
    // Validations
    // --------------------------------------------------------------------------------
    module.config(function ($validatorProvider) {

        $validatorProvider.setDefaults({
            errorElement: 'small',
            highlight: function (p_element, p_errorClass) {

                if (!$(p_element).is('select'))
                    $(p_element).addClass("is-invalid")

                $(p_element).addClass("invalid-input");
                $(p_element).next("small").addClass("text-danger");
            },
            unhighlight: function (p_element, p_errorClass) {
                $(p_element).removeClass("is-invalid").removeClass("invalid-input");
                $(p_element).next("small").removeClass("text-danger");
            }
        });

        $validatorProvider.addMethod('mobileIndia', function (value, element) {
            return this.optional(element) || /^[6-9]\d{9}/.test(value);
        }, "Please enter a valid phone number");

        $validatorProvider.addMethod("pwdCheck", function (value) {
            return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) // consists of only these
                && /[a-z]/.test(value) // has a lowercase letter
                && /\d/.test(value) // has a digit
        });

        $validatorProvider.addMethod('numberRequired', function (value, element) {
            var currentVal = value;

            if (currentVal.indexOf('number:') > -1)
                currentVal = currentVal.replace("number:", "")

            return currentVal && currentVal > 0;
        });
    });

})(jQuery, angular, document.children[0].hasAttribute("debug"));
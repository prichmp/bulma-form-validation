var formValidation =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scripts/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scripts/FieldValidator.ts":
/*!***************************************!*\
  !*** ./src/scripts/FieldValidator.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var FieldValidator = /** @class */ (function () {
    function FieldValidator() {
    }
    FieldValidator.notBlank = function (value) {
        return /\S/.test(value);
    };
    FieldValidator.email = function (value) {
        return !FieldValidator.notBlank(value) || /^.+@.+\..+$/.test(value);
    };
    FieldValidator.phone = function (value) {
        return !FieldValidator.notBlank(value) || /^\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/.test(value);
    };
    FieldValidator.number = function (value) {
        return !FieldValidator.notBlank(value) || /^[+-][0-9.,]+$/.test(value) && parseFloat(value.replace(/[^0-9.,]/g, "")) != NaN;
    };
    return FieldValidator;
}());
exports["default"] = FieldValidator;


/***/ }),

/***/ "./src/scripts/ValidateFields.ts":
/*!***************************************!*\
  !*** ./src/scripts/ValidateFields.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var FieldValidator_1 = __webpack_require__(/*! ./FieldValidator */ "./src/scripts/FieldValidator.ts");
var ValidateFields = /** @class */ (function () {
    function ValidateFields(form) {
        this.hasErrors = true;
        this.form = form;
        this.hasErrors = this.validateFields(Array.from(this.form.querySelectorAll("input,select,textarea")), true);
        this.onLoad();
    }
    ValidateFields.prototype.onLoad = function () {
        var _this = this;
        var fields = this.form.querySelectorAll("input,select,textarea");
        Array.from(fields).forEach(function (field) {
            field.addEventListener("change", _this.onChange.bind(_this));
        });
        var submitButtons = this.form.querySelectorAll("button[type='submit']");
        Array.from(submitButtons).forEach(function (button) {
            button.addEventListener("click", _this.onSubmit.bind(_this));
        });
    };
    ValidateFields.prototype.onChange = function (event) {
        if (event.currentTarget) {
            if (!this.validateField(event.currentTarget)) {
                this.hasErrors = this.validateFields(Array.from(this.form.querySelectorAll("input,select,textarea")), true);
                if (!this.hasErrors) {
                    this.onSubmitErrors();
                }
            }
        }
    };
    ValidateFields.prototype.onSubmitErrors = function () {
        var _this = this;
        var fields = Array.from(this.form.querySelectorAll("button[type='submit']"));
        fields.forEach(function (field) {
            var parent = _this.searchForParent(field, 'field');
            var messages = parent.querySelectorAll('.validation-error-message');
            if (_this.hasErrors) {
                field.classList.add('is-danger');
                field.classList.remove('is-success');
                Array.from(messages).forEach(function (message) {
                    message.classList.remove('hidden');
                    message.classList.add('visible');
                });
            }
            else {
                field.classList.add('is-success');
                field.classList.remove('is-danger');
                Array.from(messages).forEach(function (message) {
                    message.classList.remove('visible');
                    message.classList.add('hidden');
                });
            }
        });
    };
    ValidateFields.prototype.onSubmit = function (event) {
        var field = event.currentTarget;
        var fields = this.form.querySelectorAll("input,select,textarea");
        var parent = this.searchForParent(field, 'field');
        var messages = parent.querySelectorAll('.validation-error-message');
        this.hasErrors = this.validateFields(Array.from(fields));
        if (this.hasErrors) {
            event.preventDefault();
        }
        this.onSubmitErrors();
    };
    ValidateFields.prototype.validateFields = function (fields, silently) {
        var _this = this;
        if (silently === void 0) { silently = false; }
        var hasErrors = false;
        fields.forEach(function (field) {
            var thisField = _this.validateField(field, silently);
            hasErrors = hasErrors || thisField;
        });
        return hasErrors;
    };
    /**
     *
     * @param {*} field
     * @returns isValid
     */
    ValidateFields.prototype.validateField = function (field, silently) {
        if (silently === void 0) { silently = false; }
        var hasErrors = false;
        var attr = Array.from(field.attributes).find(function (a) {
            return a.name === 'data-validation';
        });
        var attrValue = "";
        if (attr) {
            attrValue = attr.value;
        }
        var validator = this.getValidatorFunction(attrValue);
        var val = "";
        if (field.value) {
            val = field.value;
        }
        var parent = this.searchForParent(field, 'field');
        var messages = parent.querySelectorAll('.validation-error-message');
        if (!validator(val)) {
            // Look for a parent with a class name of field
            hasErrors = true;
            if (!silently) {
                field.classList.add('is-danger');
                field.classList.remove('is-success');
                Array.from(messages).forEach(function (message) {
                    message.classList.remove('hidden');
                    message.classList.add('visible');
                });
            }
        }
        else {
            hasErrors = false;
            if (!silently) {
                field.classList.add('is-success');
                field.classList.remove('is-danger');
                Array.from(messages).forEach(function (message) {
                    message.classList.remove('visible');
                    message.classList.add('hidden');
                });
            }
        }
        return hasErrors;
    };
    ValidateFields.prototype.searchForParent = function (field, className) {
        var currentAncestor = field;
        do {
            if (currentAncestor.parentElement !== null) {
                currentAncestor = currentAncestor.parentElement;
            }
            else {
                break;
            }
        } while (currentAncestor && currentAncestor.parentElement && !currentAncestor.classList.contains(className));
        return currentAncestor;
    };
    ValidateFields.prototype.getValidatorFunction = function (dataValidationAttr) {
        if (dataValidationAttr !== null && dataValidationAttr !== undefined) {
            var validators = dataValidationAttr.split(" ");
            var result = function (value) { return true; };
            var resultArr_1 = [];
            validators.forEach(function (validator) {
                switch (validator) {
                    case 'not-blank':
                        resultArr_1.push(FieldValidator_1["default"].notBlank);
                        break;
                    case 'email':
                        resultArr_1.push(FieldValidator_1["default"].email);
                        break;
                    case 'phone':
                        resultArr_1.push(FieldValidator_1["default"].phone);
                        break;
                    case 'number':
                        resultArr_1.push(FieldValidator_1["default"].number);
                        break;
                }
            });
            return function (value) {
                return resultArr_1.map(function (fun) { return fun(value); })
                    .reduce(function (previous, current) { return previous && current; }, true);
            };
        }
        else {
            return function (value) { return true; };
        }
    };
    return ValidateFields;
}());
exports["default"] = ValidateFields;


/***/ }),

/***/ "./src/scripts/index.ts":
/*!******************************!*\
  !*** ./src/scripts/index.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var ValidateFields_1 = __webpack_require__(/*! ./ValidateFields */ "./src/scripts/ValidateFields.ts");
window.addEventListener("load", function (event) {
    var styles = document.createElement("style");
    styles.setAttribute('type', 'text/css');
    styles.setAttribute('rel', 'stylesheet');
    styles.innerHTML = "\n    .validation-error-message.hidden\n    {\n        visibility: hidden;\n    }\n\n    .validation-error-message.visible\n    {\n        visibility: visible;\n    }\n    ";
    document.head.appendChild(styles);
    Array.from(document.querySelectorAll('form.validate')).forEach(function (form) {
        new ValidateFields_1["default"](form);
    });
});


/***/ })

/******/ });
//# sourceMappingURL=bulma-form-validation.js.map
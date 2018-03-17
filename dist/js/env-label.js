(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.EnvLabel = factory());
}(this, (function () { 'use strict';

var EnvLabelView = /** @class */ (function () {
    function EnvLabelView(labelText, labelColor) {
        this.labelText = labelText;
        this.labelColor = labelColor;
    }
    EnvLabelView.prototype.toHTML = function () {
        return ("\n      <style>\n        a {\n          background: " + this.labelColor + ";\n          color: #fff;\n          text-decoration: none;\n          font-family: arial, sans-serif;\n          text-align: center;\n          font-weight: bold;\n          padding: 5px 40px;\n          font-size: 1rem;\n          line-height: 2rem;\n          position: relative;\n          transition: 0.5s;\n        }\n        #env-label a:hover {\n          background: rgba(0,0,0,0);\n          color: rgba(0,0,0,0);\n        }\n        #env-label a::before,\n        #env-label a::after {\n          content: \"\";\n          width: 100%;\n          display: block;\n          position: absolute;\n          top: 1px;\n          left: 0;\n          height: 1px;\n          background: #fff;\n        }\n        #env-label a::after {\n          bottom: 1px;\n          top: auto;\n        }\n        @media screen and (min-width: 800px) {\n          #env-label {\n            position: fixed;\n            display: block;\n            top: 0;\n            right: 0;\n            width: 200px;\n            overflow: hidden;\n            height: 200px;\n            z-index: 9999;\n          }\n          #env-label a {\n            width: 200px;\n            position: absolute;\n            top: 60px;\n            right: -60px;\n            transform: rotate(45deg);\n            -webkit-transform: rotate(45deg);\n            -ms-transform: rotate(45deg);\n            -moz-transform: rotate(45deg);\n            -o-transform: rotate(45deg);\n            box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.8);\n          }\n        }\n      </style>\n      <span id=\"env-label\" onclick=\"this.remove()\">\n        <a href=\"#\">" + this.labelText + "</a>\n      </span>\n    ").trim();
    };
    return EnvLabelView;
}());

var EnvLabel = /** @class */ (function () {
    function EnvLabel(conditions) {
        this.conditions = conditions;
    }
    EnvLabel.init = function (_a) {
        var conditions = _a.conditions;
        var instance = new EnvLabel(conditions);
        instance.init();
    };
    EnvLabel.prototype.init = function () {
        var _this = this;
        if (!this.validate())
            return;
        if (document.readyState === 'complete') {
            this.showLabel();
        }
        else {
            document.addEventListener("DOMContentLoaded", function () { return _this.showLabel(); });
        }
    };
    EnvLabel.prototype.validate = function () {
        if (!document) {
            console.log('This environment is out of support.');
            return false;
        }
        if (!('content' in document.createElement('template'))) {
            console.log('This browser does not support HTML template tag.');
            return false;
        }
        if (!this.conditions || this.conditions.length == 0) {
            console.log('You have to set at least one condition to check environment.');
            return false;
        }
        return true;
    };
    EnvLabel.prototype.showLabel = function () {
        var hostname = window.location.hostname;
        var matchedCondition = this.findMatchedCondition(hostname);
        if (!matchedCondition)
            return;
        var labelText = matchedCondition.labelText || hostname;
        var labelColor = matchedCondition.labelColor || '#000';
        var template = document.createElement('template');
        template.innerHTML = new EnvLabelView(labelText, labelColor).toHTML();
        var clone = document.importNode(template.content, true);
        document.body.appendChild(clone);
    };
    EnvLabel.prototype.findMatchedCondition = function (hostname) {
        var condition;
        for (var i = 0; i < this.conditions.length; i++) {
            condition = this.conditions[i];
            if (condition.regex.test(hostname)) {
                return condition;
            }
        }
        return;
    };
    return EnvLabel;
}());

return EnvLabel;

})));

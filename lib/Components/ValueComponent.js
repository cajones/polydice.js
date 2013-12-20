var Component = require('./Component');

var ValueComponent = function (value) {
        Component.set('value', parseInt(value, 10), this);
    };

ValueComponent.prototype.resolve = function () {
    if(!this.hasResolved) {
        Component.set('hasResolved', true, this);
    }
    return this;
};
ValueComponent.prototype.toHtml = function () {
    return '<span class="value component">' + this.value + '</span>'
};
module.exports = ValueComponent;
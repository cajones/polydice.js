var ValueComponent = function (value) {
    Object.defineProperty(this, 'value', {
        value: parseInt(value, 10),
        enumerable : true
    });
};
ValueComponent.prototype.resolve = function () {
    return this.value;
};
ValueComponent.prototype.toHtml = function () {
    return '<span class="value component">' + this.value + '</span>'
};
module.exports = ValueComponent;
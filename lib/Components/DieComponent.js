var Component = require('./Component');

var DieComponent = function (sides) {
        Component.set('sides', sides, this);
        Component.set('hasResolved', false, this);
    };

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

DieComponent.prototype.resolve = function () {
    if(!this.hasResolved) {
        Component.set('value', getRandomInt(1, this.sides), this);
        Component.set('hasResolved', true, this);
    }
    return this;
};
DieComponent.prototype.toHtml = function () {
    return '<span class="die component size-' + this.sides + '">' + this.value + '</span>'
};
module.exports = DieComponent;
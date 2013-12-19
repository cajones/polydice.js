var DieComponent = function (sides) {
    Object.defineProperty(this, 'sides', {
        value: parseInt(sides, 10),
        enumerable : true
    });
    Object.defineProperty(this, 'hasResolved', {
        value: false,
        enumerable : true,
        configurable: true
    });
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

DieComponent.prototype.resolve = function () {
    if(!this.hasResolved) {
        Object.defineProperty(this, 'value', {
            value: getRandomInt(1, this.sides),
            enumerable: true,
            configurable: false
        });
        Object.defineProperty(this, 'hasResolved', {
            value: true,
            enumerable : true,
            configurable: false
        });    
    }
    return this;
};
DieComponent.prototype.toHtml = function () {
    return '<span class="die component size-' + this.sides + '">' + this.value + '</span>'
};
module.exports = DieComponent;
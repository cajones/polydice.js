var DieComponent = function (size) {
    Object.defineProperty(this, 'sides', {
        value: size,
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
            enumerable: false,
            configurable: false
        });
        Object.defineProperty(this, 'hasResolved', {
            value: true,
            enumerable : true,
            configurable: false
        });    
    }
    return this.value;     
};
DieComponent.prototype.toHtml = function () {
    return '<span class="die component">' + this.value + '</span>'
};
module.exports = DieComponent;
var DieComponent = require('./DieComponent'),
    MultiDieComponent = function (quantity, sides) {
    Object.defineProperty(this, 'quantity', {
        value: parseInt(quantity, 10),
        enumerable : true
    });
    DieComponent.call(this, sides);
};

MultiDieComponent.prototype.resolve = function () {
    if(!this.hasResolved) {
        var value = [];
        
        for(var i = 1; i<= this.quantity; i++) {
            var die = new DieComponent(this.sides);
            die.resolve();
            value.push(die);
        }

        Object.defineProperty(this, 'value', {
            value: value,
            enumerable: true,
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
MultiDieComponent.prototype.toHtml = function () {
    return null;
};
module.exports = MultiDieComponent;
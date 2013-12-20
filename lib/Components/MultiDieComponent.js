var Set = require('./Set'),
    Component = require('./Component'),
    DieComponent = require('./DieComponent');

var MultiDieComponent = function (quantity, sides) {
        Component.set('quantity', parseInt(quantity, 10), this);
        Component.set('sides', sides, this);
        Component.set('hasResolved', false, this);
    };

MultiDieComponent.prototype.resolve = function () {
    if(!this.hasResolved) {
        var members = [];
        for(var i = 1; i<= this.quantity; i++) {
            var die = new DieComponent(this.sides);
            members.push(die.resolve());
        }
        Set.call(this, members);
        Component.set('hasResolved', true, this);
    }
    return this;
};

MultiDieComponent.prototype.reduce = Set.prototype.reduce;

MultiDieComponent.prototype.toHtml = function () {
    var members = this.reduce(function (accumulator, component) {
        return accumulator += component.toHtml();
    }, '');

    return '<div class="multi component set">' + members + '</div>'; 
};
module.exports = MultiDieComponent;
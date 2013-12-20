var expect = require('expect.js'),
    lib = '../../../lib',
    components = lib + '/components',
    DieComponent = require(components+ '/DieComponent');

describe('Given I have a multiple dice component', function () {
    var MultiDieComponent = require(components + '/MultiDieComponent');

    describe('When I create it', function () {

        it('it should provide a the correct number of unresolved dice component of the correct number of sides' , function () {
            var component = new MultiDieComponent(3, 6);

            expect(component.quantity).to.be(3);
            expect(component.hasResolved).to.be(false);
        });

    });

    describe('When I resolve it', function () {

        it('it should resolve the set of components equal to the quantity each between 1 and the number of sides' , function () {
            var component = new MultiDieComponent(3, 6),
                result = component.resolve();

            expect(result).to.be.a(MultiDieComponent);
            expect(result.members.length).to.be(3);
            result.members.forEach(function (die) {
                expect(die).to.be.a(DieComponent);
                expect(die.hasResolved).to.be(true);
                expect(die.sides).to.be(6);
                expect(die.value).to.be.within(1, die.sides);
            });
        });
    });

});
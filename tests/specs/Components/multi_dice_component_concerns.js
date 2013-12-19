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

    describe('When I resolve a multiple dice  component', function () {

        it('it should provide an array of values equal to the quanity each between 1 and the number of sides' , function () {
            var component = new MultiDieComponent(3, 6),
                result = component.resolve();

            expect(result).to.be.an(Array);
            expect(result.length).to.be(3);
            result.forEach(function (die) {
                expect(die).to.be.a(DieComponent);
                expect(die.hasResolved).to.be(true);
            });
        });

        it('it should become resolved and consistently provide the resolved number' , function () {
            var component = new MultiDieComponent(3, 6);

            expect(component.resolve()).to.be(component.resolve());
        });

    });

});
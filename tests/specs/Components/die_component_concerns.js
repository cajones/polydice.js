var expect = require('expect.js'),
    lib = '../../../lib',
    components = lib + '/components';

describe('Given I have a dice component', function () {
    var DieComponent = require(components + '/DieComponent');

    describe('When I create it', function () {

        it('it should provide an unresolved dice component of the correct number of sides' , function () {
            var die = new DieComponent(6);

            expect(die.sides).to.be(6);
            expect(die.hasResolved).to.be(false);
        });

    });

    describe('When I resolve it', function () {

        it('it should provide a number between 1 and the number of sides' , function () {
            var die = new DieComponent(6);

            expect(die.resolve().value).to.be.within(1, die.sides);
        });

        it('it should become resolved and consistently provide the resolved number' , function () {
            var die = new DieComponent(6),
                resolvedValue = die.resolve().value;

            expect(die.hasResolved).to.be(true);
            expect(die.resolve().value).to.be(resolvedValue);
        });

    });

});
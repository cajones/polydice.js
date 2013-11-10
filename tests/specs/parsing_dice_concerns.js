var expect = require('expect.js'),
    lib = '../../lib',
    components = lib + '/components';

describe('Given I have a parser', function () {
    var Parser = require(lib +'/Parser'),
        DieComponent = require(components + '/DieComponent');

    describe('When I parse an expression of a single dice component', function () {

        it('it should provide a dice component of the correct sides', function () {
            var parser = new Parser(),
            expression = 'd12';

            expect(parser.parse(expression)).to.be.a(Array);
            expect(parser.parse(expression).length).to.be(1);
            expect(parser.parse(expression)[0].sides).to.be(12);
        });

    });

    describe('When I parse an expression of a multiple numeric components', function () {

        it('it should provide each as a value component', function () {
            
        });
    
    });
});
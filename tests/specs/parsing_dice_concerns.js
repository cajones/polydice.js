var expect = require('expect.js'),
    lib = '../../lib',
    components = lib + '/components';

describe('Given I have a parser', function () {
    var Parser = require(lib +'/Parser'),
        DieComponent = require(components + '/DieComponent'),
        MultiDieComponent = require(components + '/MultiDieComponent');;

    describe('When I parse an expression of a single dice component', function () {

        it('it should provide a dice component of the correct sides', function () {
            var parser = new Parser(),
            expression = 'd12';

            expect(parser.parse(expression)).to.be.a(Array);
            expect(parser.parse(expression).length).to.be(1);
            expect(parser.parse(expression)[0]).to.be.a(DieComponent);
            expect(parser.parse(expression)[0].sides).to.be(12);
        });

    });

    describe('When I parse an expression of a single multi dice component', function () {

        it('it should provide a multi dice component', function () {
            var parser = new Parser(),
            expression = '4d8';

            expect(parser.parse(expression)).to.be.a(Array);
            expect(parser.parse(expression).length).to.be(1);
            expect(parser.parse(expression)[0]).to.be.a(MultiDieComponent);
        });

        it('it should provide a component of the correct sides', function () {
            var parser = new Parser(),
            expression = '4d8';

            expect(parser.parse(expression)).to.be.a(Array);
            expect(parser.parse(expression).length).to.be(1);
            expect(parser.parse(expression)[0].sides).to.be(8);
        });

        it('it should provide a component of the correct quantity', function () {
            var parser = new Parser(),
            expression = '4d8';

            expect(parser.parse(expression)).to.be.a(Array);
            expect(parser.parse(expression).length).to.be(1);
            expect(parser.parse(expression)[0].quantity).to.be(4);
        });
    });

    describe('When I parse an expression of a multiple numeric components', function () {

        it('it should provide each as a value component', function () {
            var parser = new Parser(),
            expression = '1 1 2 3 5 8 13';

            expect(parser.parse(expression)).to.be.a(Array);
            expect(parser.parse(expression).length).to.be(7);
            expect(parser.parse(expression)[0].value).to.be(1);
            expect(parser.parse(expression)[1].value).to.be(1);
            expect(parser.parse(expression)[2].value).to.be(2);
            expect(parser.parse(expression)[3].value).to.be(3);
            expect(parser.parse(expression)[4].value).to.be(5);
            expect(parser.parse(expression)[5].value).to.be(8);
            expect(parser.parse(expression)[6].value).to.be(13);
        });
    
    });
});
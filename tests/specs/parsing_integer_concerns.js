var expect = require('expect.js'),
    lib = '../../lib',
    components = lib + '/components';

describe('Given I have a parser', function () {
    var Parser = require(lib +'/Parser'),
        ValueComponent = require(components + '/ValueComponent');

    describe('When I parse an expression of a single numeric component', function () {

        it('it should provide a value component of the correct integer value' , function () {
            var parser = new Parser(),
            expression = '69';

            expect(parser.parse(expression)).to.be.a(Array);
            expect(parser.parse(expression).length).to.be(1);
            expect(parser.parse(expression)[0]).to.be.a(ValueComponent);
            expect(parser.parse(expression)[0].resolve().value).to.be(parseInt(expression, 10));
        });

    });

    describe('When I parse an expression of a multiple numeric components', function () {

        it('it should provide each as a value component' , function () {
            var parser = new Parser(),
            expression = '78, 97';

            expect(parser.parse(expression)).to.be.a(Array);
            
            expect(parser.parse(expression)[0]).to.be.a(ValueComponent);
            expect(parser.parse(expression)[0].resolve().value).to.be(parseInt(expression.split(',')[0], 10));

            expect(parser.parse(expression)[1]).to.be.a(ValueComponent);
            expect(parser.parse(expression)[1].resolve().value).to.be(parseInt(expression.split(',')[1], 10));
        });
    
    });
});
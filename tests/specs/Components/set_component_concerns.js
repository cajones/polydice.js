var expect = require('expect.js'),
    lib = '../../../lib',
    components = lib + '/components',
    Set = require(components+ '/Set'),
    ValueComponent = require(components + '/ValueComponent'),
    DieComponent = require(components + '/DieComponent'),
    MultiDieComponent = require(components + '/MultiDieComponent');

describe('Given I have an empty set', function () {
    

    describe('When I create it', function () {

        it('it should provide a set of zero components' , function () {
            var set = new Set();

            expect(set.length).to.be(0);
        });

    });
});

describe('Given I have a set of components', function () {
    
    describe('When I create it', function () {

        it('it should provide a length equal to the number of components' , function () {
            var component1 = new ValueComponent(1), 
                component2 = new ValueComponent(2),
                components = [ component1, component2 ],
                set = new Set(components);

            expect(set.length).to.be(components.length);
        });

    });

    describe('When I resolve it', function () {

        it('it should resolve each component' , function () {
            var component1 = new DieComponent(6), 
                component2 = new DieComponent(6),
                components = [ component1, component2 ],
                set = new Set(components);

            set.resolve();
            set.members.forEach(function (member) {
                expect(member.hasResolved).to.be(true);    
            })
            
        });

    });

    describe('When I reduce it', function () {

        it('it should provide the sum of each components resolved value' , function () {
            var component1 = new DieComponent(6), 
                component2 = new DieComponent(6),
                component3 = new DieComponent(6),
                components = [ component1, component2, component3 ],
                set = new Set(components);

            var actual = set.reduce();
                sumOfComponents = component1.value + component2.value + component3.value;

            expect(actual).to.be(sumOfComponents);
        });

    });

});

describe('Given I have a set of of sets', function () {
    
    describe('When I reduce it', function () {

        it('it should provide the sum of each set of components' , function () {
            var component1 = new DieComponent(6), 
                component2 = new DieComponent(6),
                component3 = new DieComponent(6),
                component4 = new DieComponent(6)
                components = [ new Set([component1, component2, component3 ]), component4 ];
                set = new Set(components);

            var actual = set.reduce();
                sumOfComponents = component1.value + component2.value + component3.value + component4.value;

            expect(actual).to.be(sumOfComponents);
        });

    });
});
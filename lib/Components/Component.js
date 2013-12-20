var Component = function () {
},
propertyConfigurations = {
};

function configuration(propertyName) {
    return (propertyConfigurations[propertyName] || { 
        enumerable: true,
        configurable: true
    }); 
}

Component.set = function (propertyName, value, context) {
    context = context || this;
    Object.defineProperty(context, propertyName, {
        value: value,
        enumerable: configuration(propertyName).enumerable,
        configurable: configuration(propertyName).configurable 
    });
};
module.exports = Component;

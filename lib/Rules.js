var ValueComponent = require('./components/ValueComponent'),
    DieComponent = require('./components/DieComponent'),
    MultiDieComponent = require('./components/MultiDieComponent');

module.exports = [
    {
        name: 'MultiDie',
        pattern: /(\d+)d(\d+)/,
        args: function () {
            return [
                parseInt(this.match[1], 10) || 0,
                parseInt(this.match[2], 10) || 0
            ];
        },
        type: MultiDieComponent
    },
    {
        name: 'Die',
        pattern: /d(\d+)/,
        args: function () {
            return [
                parseInt(this.match[1], 10) || 0
            ];
        },
        type: DieComponent
    },
    {
        name: 'Value',
        pattern: /\d+/,
        type: ValueComponent
    }
];
var extend = require('lodash.assign'),
    format = require('string-template');

module.exports = buildConsole({
    time: Date.now
});

/**
 * Returns a new console instance
 * @param {Object=} args
 * @return {Function} console
 */
function buildConsole(args) {

    // create console base
    // this is a function so that we can extend the console via currying
    function console(newArgs) {
        return buildConsole(extend({}, args, newArgs));
    }

    // add options and bound functions
    return extend(console, {
        options: args,
        log: log.bind(console, 'log'),
        error: log.bind(console, 'error'),
    });
}

//
// Util
//

/**
 * Log a template string
 * Bound to console so has access this.options as well as options
 * @param {String} type - eg log, info, error, etc..
 * @param {String} template - using {{key}} for templating
 * @param {Object=} options
 */
function log(type, template, options) {

    // case: no template string render json
    if (typeof template !== 'string') {
        var data = extend({}, this.options, template),
            string = JSON.stringify(data, null, 4);

        return console[type](JSON.stringify(data, null, 4));
    }

    // case: template string
    var data = extend({}, this.options, options),
        string = format(template, data);

    return console[type](string);
}

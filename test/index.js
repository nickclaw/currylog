var currylog = require('../');

//
// Setup
//

// make stdout and stderr emit data events on write
before(function() {
    var oldStdoutWrite = process.stdout.write,
        oldStderrWrite = process.stderr.write;

    process.stdout.write = function(chunk, encoding) {
        this.emit('data', chunk, encoding);
        oldStdoutWrite.apply(this, arguments);
    }

    process.stderr.write = function(chunk, encoding) {
        this.emit('data', chunk, encoding);
        oldStderrWrite.apply(this, arguments);
    }

});


//
// Tests
//

describe('currylog', function() {

    describe('basic behavior', function() {

        it('should be a function', function() {
            expect(currylog).to.be.instanceOf(Function);
        });

        it('should have a log function', function() {
            expect(currylog.log).to.be.instanceOf(Function);
        });

        it('should have a error function', function() {
            expect(currylog.log).to.be.instanceOf(Function);
        });
    });

    describe('basic logging', function() {

        it('should be able to log to stdout', function(done) {
            process.stdout.once('data', function() {
                done();
            });

            currylog.log('test');
        });

        it('should be able to log to stderr', function(done) {
            process.stderr.once('data', function() {
                done();
            });

            currylog.error('test');
        });
    });

    describe('extending', function() {

        it('calling currylog should create a new instance', function() {

            var newLog = currylog();

            expect(newLog).to.be.instanceOf(Function);
            expect(newLog).to.have.keys(Object.keys(currylog));
        });

        it('should extend the parent currylogs options', function() {

            var parentLog = currylog({ a: 1, b: 2 });
            var childLog = parentLog({ b: 1, c: 2 });

            expect(childLog).to.be.instanceOf(Function);
            expect(childLog).to.have.keys(Object.keys(parentLog));
            expect(childLog.options.a).to.equal(1);
            expect(childLog.options.b).to.equal(1);
            expect(childLog.options.c).to.equal(2);
        });
    });

    describe('templating', function() {

        it('should contain time by default', function() {
            expect(currylog.options.time).to.exist;
        });

        it('should be able to render current timestamp by default', function(done) {

            process.stderr.once('data', function(text) {
                expect(text.length).to.be.at.least(13);
                done();
            });

            currylog.error('{{time}}');
        });

        it('should use current instances values', function(done) {
            process.stderr.once('data', function(text) {
                expect(text).to.equal('to get a watch\n');
                done();
            });

            var log = currylog({ time: 'to get a watch' });

            log.error('{{time}}');
        });

        it('should use log supplied values by default', function(done) {
            process.stderr.once('data', function(text) {
                expect(text).to.equal('to get a watch\n');
                done();
            });

            currylog.error('{{time}}', { time: 'to get a watch' });
        });
    });
});

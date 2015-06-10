currylog
---------------

A simple template based logger with an extendable syntax.



## Example

```javascript

// setup.js
require('currylog').setDefaults({
    version: 2,
    time: function() {
        return new Date().toJSON();
    }
});

// auth-router.js
var router = require('express').Router();
var currylog = require('currylog')({
    tag: "AUTH"
});
var anotherLog = currylog({
    tag: "ANOTHER",
    version: 3
})

router.get('/', function(req, res) {
    currylog.log('[{time}] [V{version}] [{tag}] get request to {url}', { url: req.originalUrl });
    // logs "[2015-06-10T10:11:33.653Z] [V2] [AUTH] got request to /"

    res.status(200).send();
});

router.post('/', function(req, res) {
    anotherLog.log('[{time}] [V{version}] [{tag}] post request to {url}', { url: req.originalUrl });
    // logs "[2015-06-10T10:11:33.653Z] [V3] [ANOTHER] got request to /"

    res.status(200).send();
});


```

currylog
---------------

An insanely simple logger.



## Example

```javascript

// setup.js
require('currylog').setDefaults({
    tag: "TEST"
    version: 2,
    time: function() {
        return new Date().toJSON();
    }
});

// auth-router.js
var router = require('express').Router();
var currylog = require('currylog');
var authLog = currylog({
    tag: "AUTH"
});

router.get('/', function(req, res) {
    authLog.log('[{time}] [V{version}] [{tag}] get request to {url}', { url: req.originalUrl });
    // logs "[2015-06-10T10:11:33.653Z] [V2] [AUTH] got request to /"

    makeRequest(function(err, res) {
        if (err) {
            currylog.error("[{time}] [V{version}] [{tag}] error");
            // logs "[2015-06-10T10:11:36.653Z] [V2] [TEST] error"

            return res.status(500).send();
        }
        res.status(200).send();
    });
});
```

var express = require('express');
var router = express.Router();

router.get('/session/set/:name/:email', function(req, res) {
    var user = {name: req.params.name, email : req.params.email};
    req.session.user = user;
    res.send('session written to Redis successfully: '+JSON.stringify(user));
});

router.get('/session/get/', function(req, res) {
    if(req.session.user) {
        res.send('Session value stored in Redis: ' + JSON.stringify(req.session.user));
    }
    else{
        res.send("No session value stored in Redis ");
    }
});

module.exports = router;
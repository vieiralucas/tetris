var express = require('express'),
    path = require('path'),

    app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.get(/.*/, function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(1337, function() {
    console.log('Listening on port %d', this.address().port);
});

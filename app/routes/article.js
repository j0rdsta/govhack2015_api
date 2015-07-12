var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Article = mongoose.model('Article');

module.exports = function (app) {
    app.use('/api/article', router);
};

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/', function (req, res) {
    var qSkip = req.query.skip;
    var qTake = req.query.take;
    var qSort = req.query.sort;
    var qFilter = {};
    if (req.query.filter !== undefined ) {
        qFilter = JSON.parse(req.query.filter);
    }
    return Article.find({"Story": { "$ne": "" }, "Primary image": { "$ne": "" } }).sort(qSort).skip(qSkip).limit(qTake).find(qFilter)
        .exec(function (err, articles) {
            res.json(articles);
        });
});

router.get('/:id', function (req, res) {
    return Article.findById(req.params.id, function (err, articles) {
        res.json(articles);
    });
});
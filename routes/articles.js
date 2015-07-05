var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;
mongoose.connect('mongodb://dev01.jahead.io/govhack2015'); 
var ArticlesSchema = new Schema({
    Title: String,
    URL: String,
    Date: String,
    'Primary image': String,
    'Primary image caption': String,
    'Primary image rights information': String,
    Subjects: String,
    Station: String,
    State: String,
    Place: String,
    Keywords: String,
    Latitude: String,
    Longitude: String,
    'MediaRSS URL': String,
    Story: String 
  });

var ArticlesModel = mongoose.model('articles', ArticlesSchema);

router.get('/', function (req, res) {
    var qSkip = req.query.skip;
    var qTake = Math.min(10, req.query.take);
    var qSort = req.query.sort;
    var qFilter = req.query.filter;
    return ArticlesModel.find().sort(qSort).skip(qSkip).limit(qTake)
    .exec(function (err, articles) {
           res.json(articles);
    });
});

router.post('/', function (req, res) {
    var article;
    
    article.save(function (err) {
    // more code
        });
        return res.send(article);
    });

router.get('/:id', function (req, res) {
    return ArticlesModel.findById(req.params.id, function (err, articles) {
        res.json(articles);
    });
});

// router.put('/articles/:id', function (req, res) {
//     return ArticlesModel.findById(req.params.id, function (err, articles) {
//     // more code
//     });
// });

// router.delete('/api/articles/:id', function (req, res) {
//     return ArticlesModel.findById(req.params.id, function (err, articles) {
//         return articles.remove(function (err) {
//           // more code
//         });
//     });
// });

module.exports = router;
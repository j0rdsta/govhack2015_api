var express = require('express');
var promise = require("bluebird");
var request = promise.promisify(require("request"));
var mongoose = require('mongoose');
var cheerio = require('cheerio')

var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/govhack2015')
promise.promisifyAll(request);


var router = express.Router();


function updateData() {
  var url = "http://data.gov.au/dataset/3fd356c6-0ad4-453e-82e9-03af582024c3/resource/3182591a-085a-465b-b8e5-6bfd934137f1/download/Localphotostories2009-2014-JSON.json";
  return request(url).spread(function (params) {
    var metadata = JSON.parse(params.body);
    return metadata;
  });
};


var ArticleMetaDataSchema = new Schema({
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

function handleSave(err) {
  if (err) { 
    console.log(err);
  }
}

function isEmpty(str) {
    return (!str || 0 === str.length);
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

var ArticleMetaDataModel = mongoose.model('Article', ArticleMetaDataSchema);

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  var checkArt = ArticleMetaDataModel.count({}).then(function(count, err) {
    var p;
    if (count == 0 || count == undefined) {
      p = updateData().map(function(element) {
        // console.log(element);ç        
        element.Story = "";
        var art = new ArticleMetaDataModel(element);
        return(art.save(handleSave));
      }).then(function(data) { return data; });
    } else return new promise.resolve();
    
    return p;
  });
  
  checkArt.then(function () {
    var query = ArticleMetaDataModel.find({});
    var pq = query.exec();
    return pq.then(function(data) {
      promise.map(data, function (data) {
        console.log("Downloading: " + data.URL);
        return request(data.URL).then(function (params) {
          // console.log(data);
          data.Story = params.body;
          // ArticleMetaDataModel.update(data._id, data)
          return new promise.resolve(ArticleMetaDataModel.update(data._id, data).exec());
        }).catch(function (err) {
          console.log(err);
        })
      });
    });
  }).then(function () {
    res.send("done");
  });
  
  
});

module.exports = router;

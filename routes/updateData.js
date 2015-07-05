var express = require('express');
var promise = require("bluebird");
var async = require('async')
var request = promise.promisify(require("request"));
var mongoose = require('mongoose');
var cheerio = require('cheerio')

promise.promisifyAll(request);

function updateData() {
  var url = "http://data.gov.au/dataset/3fd356c6-0ad4-453e-82e9-03af582024c3/resource/3182591a-085a-465b-b8e5-6bfd934137f1/download/Localphotostories2009-2014-JSON.json";
  return request(url).spread(function (params) {
    var metadata = JSON.parse(params.body);
    return metadata;
  });
};
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

module.exports = function (app, options) {

    var mongoose = options.mongoose;
    var Schema = options.mongoose.Schema;
    var db = options.db;

    var ArticlesModel = require('../schemas/ArticlesSchema')(db);

/* GET users listing. */
  app.get('/', function(req, res, next) {
    var checkArt = Articles.count({}).then(function(count, err) {
      var p;
      if (count == 0 || count == undefined) {
        p = updateData().map(function(element) {
          if (element.URL.indexOf('http://www.abc.net.au/local') > -1) {
            element.URL += "?desktop=true";
          }   
          if (element.URL.indexOf('wwwdev.abc.net.au') > -1) {
            return;
          }   
          element.Story = "";
          var art = new Articles(element);
          return(art.save(handleSave));
        }).then(function(data) { return data; });
      } else return new promise.resolve();
      
      return p;
    });
    
    checkArt.then(function () {
      var query = Articles.find({});
      var pq = query.exec();
      return pq.then(function(data) {
        var q = async.queue(function (task, done) {
          request(task.url, function(err, resp, body) {
            console.log("Finshed: " +resp.request.href);
            Articles.update({URL: resp.request.href }, {$set: { Story: resp.body }}).exec();
            done();
          }).catch(function (err) {
            console.log(err);
          });
        }, 5)
        for (var index = 0; index < data.length; index++) {
          var element = data[index];
          q.push({ url: element.URL });
        }
         
      });
    });
  });
};

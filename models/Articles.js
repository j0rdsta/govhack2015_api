var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
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

module.exports.Article = ArticleSchema;
// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

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

//ArticleSchema.virtual('date')
//  .get(function(){
//    return this._id.getTimestamp();
//  });

mongoose.model('Article', ArticleSchema);


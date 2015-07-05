module.exports = function(db) {
        return db.model('Acticles', ArticleSchema());
}

function ArticleSchema () {
  var Schema = require('mongoose').Schema;
        
  return new Schema({
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
}
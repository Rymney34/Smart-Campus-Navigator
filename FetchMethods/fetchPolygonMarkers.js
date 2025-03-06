const Marker = require('../models/Marker');

module.exports = function fetchPolygonMarkers() {
  return Marker.find().select('blockName -_id')
    .then(markers => {
      console.log(markers); 
    })
    .catch(err => {
      console.error("Error: ", err); 
    });
};

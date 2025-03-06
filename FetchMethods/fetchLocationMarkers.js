/*
const Marker = require('./models/Marker');

module.exports = function fetchPolygonMarkers() {
  return Marker.find().select('blockName -_id')
    .then(markers => {
      console.log(markers); 
    })
    .catch(err => {
      console.error("Error: ", err); 
    });
};
*/

// Lat and Lng Values of All Markers on Map
export const locations = [
    { lat: 51.49651417611058, lng: -3.2147777080535893, name: "Block O" },
    { lat: 51.496527534845214, lng: -3.212637305259705, name: "Block B" },
    { lat: 51.49623698148315, lng: -3.2115215063095097, name: "Block F" },
    { lat: 51.496687839355616, lng: -3.213887214660645, name: "Block M" },
    { lat: 51.496767991399395, lng: -3.213313221931458, name: "Block N" },
    { lat: 51.496130110815095, lng: -3.2129967212677006, name: "Block D" },
    { lat: 51.49599652212769, lng: -3.2137745618820195, name: "Block T" },
    { lat: 51.49558573446089, lng: -3.2131415605545044, name: "Block L" },
    { lat: 51.49531521373177, lng: -3.212787508964539, name: "Block P" },
    { lat: 51.49601990017624, lng: -3.212036490440369, name: "Block A" },
    { lat: 51.49580949730753, lng: -3.2121276855468754, name: "Block C" }, 
];


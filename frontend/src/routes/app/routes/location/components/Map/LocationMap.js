import React from 'react';

const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} = require("react-google-maps");

const MapWithAMarker = withScriptjs(withGoogleMap((props) =>
    (<GoogleMap
        defaultZoom={8}
        defaultCenter={{lat: -34.397, lng: 150.644}}
    >
        <Marker
            position={{lat: -34.397, lng: 150.644}}
        />
     </GoogleMap>)));

class LocationMap extends React.Component {
    render() {
        return (
            <MapWithAMarker
                googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyDvs5nlZtO7_ckBfTn1ah-UuDhBkIl52uU&v=3.exp&libraries=geometry,drawing,places'
                loadingElement={<div style={{height: `100%`}} />}
                containerElement={<div style={{height: `400px`}} />}
                mapElement={<div style={{height: `100%`}} />}
            />
        );
    }
}

module.exports = LocationMap;

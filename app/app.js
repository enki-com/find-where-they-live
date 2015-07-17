import React from 'react';

import api from './api';
import algo from './algo';

import UserSearch from './userSearch';
import {GoogleMaps, Marker, InfoWindow} from "react-google-maps";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {userId: null, medias: [], location: null};
    this.handleSelectUser = this.handleSelectUser.bind(this);
  }

  render() {
    if (this.state.userId) {
      const medias = this.state.medias
            .filter((media) => media.location.latitude)
            .map((media) => {
        // <img src={media.images.thumbnail.url} />
        return (
          <Marker
            position={{
              lat: parseFloat(media.location.latitude),
              lng: parseFloat(media.location.longitude)
            }}
            key={media.id}
            animation={2} />
        );
      });
      const location = this.state.location ?
        (
          <Marker
            position={{
              lat: this.state.location[0],
              lng: this.state.location[1]
            }}
            key={'where they live'}
            animation={2}>
            <InfoWindow content="Where they live" />
          </Marker>
        ) : false;
      return (
        <GoogleMaps containerProps={{style: {
              height: '100vh',
              width: '100vw'
            }}}
          ref="map"
          googleMapsApi={window.google.maps}
          center={new window.google.maps.LatLng(-25.363882, 131.044922)}
          zoom={0} >
          {medias}
          {location}
        </GoogleMaps>
      );
    } else {
      return <UserSearch onSelect={this.handleSelectUser} />;
    }
  }

  handleSelectUser(userId) {
    if (userId !== this.state.userId) {
      this.setState({userId});
      api.getMedias(userId).then((response) => {
        const medias = response.data.filter((media) => media.location);
        this.setState({medias});
        return medias;
      }).then(algo.findLocationFromMedias)
      .then((location) => {
        this.setState({location});
        this.refs.map.panTo({
          lat: location[0],
          lng: location[1]
        });
      }).catch((err) => { console.log(err); });
    }
  }
}

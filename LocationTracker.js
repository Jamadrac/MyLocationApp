import React, { Component } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import Geolocation from 'react-geolocated';

class LocationTracker extends Component {
  componentDidMount() {
    // Start watching for location changes
    this.watchId = Geolocation.watchPosition(
      this.sendLocationToAPI,
      (error) => console.error('Error getting location:', error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  componentWillUnmount() {
    // Stop watching for location changes when the component unmounts
    if (this.watchId) {
      Geolocation.clearWatch(this.watchId);
    }
  }

  sendLocationToAPI = (position) => {
    // Replace 'API_ENDPOINT' with your actual API endpoint
    axios
      .post('API_ENDPOINT', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
      .then((response) => {
        console.log('Location sent to API:', response.data);
      })
      .catch((error) => {
        console.error('Error sending location:', error);
      });
  };

  render() {
    return (
      <View>
        {/* You can display the user's location here if needed */}
      </View>
    );
  }
}

export default LocationTracker;

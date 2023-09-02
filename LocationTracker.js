import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const LocationTracker = () => {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const startLocationUpdates = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 1000 },
        (location) => {
          if (isMounted) {
            setCurrentLocation(location.coords);
          }
        }
      );
    };

    startLocationUpdates();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View style={styles.container}>
      {currentLocation && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title="Your Location"
          />
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: windowWidth,
    height: windowHeight,
  },
});

export default LocationTracker;

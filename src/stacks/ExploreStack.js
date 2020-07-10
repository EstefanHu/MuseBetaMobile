import React, { useEffect, useContext } from 'react';
import { Linking, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { Context as LocationContext } from './../providers/LocationProvider.js';
import { ExploreHomeScreen } from './../screens/explore/ExploreHomeScreen';

const Stack = createStackNavigator();

export const ExploreStack = () => {
  const { setCoords } = useContext(LocationContext);

  useEffect(() => {
    (async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync({});
        setCoords(location);
      } else {
        Alert.alert(
          'Grant Location',
          'Permission is required for :Muse explore feature',
          [
            {
              text: 'Later',
              style: 'cancel'
            },
            {
              text: 'Settings',
              onPress: () => Linking.openSettings(),
            }
          ],
          { cancelable: false }
        )
      }
    })();
  }, []);

  return (
    <Stack.Navigator mode='modal'>
      <Stack.Screen
        options={{ header: () => null }}
        name='ExploreHomeScreen'
        component={ExploreHomeScreen}
      />
    </Stack.Navigator>
  );
};


const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

const initialRegion = {
  latitude: -37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

class MyMapView extends React.Component {

  map = null;

  state = {
    region: {
      latitude: -37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    ready: true,
    filteredMarkers: []
  };

  setRegion(region) {
    if(this.state.ready) {
      setTimeout(() => this.map.mapview.animateToRegion(region), 10);
    }
    //this.setState({ region });
  }

  componentDidMount() {
    console.log('Component did mount');
    this.getCurrentPosition();
  }

  getCurrentPosition() {
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          };
          this.setRegion(region);
        },
        (error) => {
          //TODO: better design
          switch (error.code) {
            case 1:
              if (Platform.OS === "ios") {
                Alert.alert("", "Para ubicar tu locación habilita permiso para la aplicación en Ajustes - Privacidad - Localización");
              } else {
                Alert.alert("", "Para ubicar tu locación habilita permiso para la aplicación en Ajustes - Apps - ExampleApp - Localización");
              }
              break;
            default:
              Alert.alert("", "Error al detectar tu locación");
          }
        }
      );
    } catch(e) {
      alert(e.message || "");
    }
  };

  render() {

    const { children, renderMarker, markers } = this.props;

    return (
      <MapView
        ref={ map => { this.map = map }}
        data={markers}
        initialRegion={initialRegion}
        renderMarker={renderMarker}
        showsMyLocationButton={false}
        style={StyleSheet.absoluteFill}
        textStyle={{ color: '#bc8b00' }}
        containerStyle={{backgroundColor: 'white', borderColor: '#BC8B00'}}>

        {markers.map(renderMarker)}

        {children && children || null}

      </MapView>
    );
  }
}
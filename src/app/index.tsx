import SearchBar from '@/components/searchBar';
import { auth } from '@/config/firebaseConfig';
import { fetchJournals } from '@/config/firebaseHandlers';
import { router, useIsFocused } from "expo-router";
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from "react-native";
import MapView, { Callout, LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';

/**
 * Index is the main page of the app with a Map view along with a search bar.
 * @version 1.0
 * @author Hannah Shiang
 */
export default function Index() {
  const [location, setLocation] = useState<LatLng | null>();
  const [locationPermission, setLocationPermission] = useState<Boolean>(false)
  const [userJournals, setUserJournals] = useState<Array<{ id: string;[key: string]: unknown }>>([]);
  const isFocused = useIsFocused();
  const [user, setUser] = useState<any | null>(null)

  // Ask user for location permission.
  request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((status) => {
    switch (status) {
      case RESULTS.UNAVAILABLE:
        return console.log('This feature is not available (on this device / in this context)');
      case RESULTS.DENIED:
        return console.log('The permission has not been requested / is denied but requestable');
      case RESULTS.BLOCKED:
        return console.log('The permission is denied and not requestable');
      case RESULTS.GRANTED:
        setLocationPermission(true);
        return console.log('The permission is granted');
      case RESULTS.LIMITED:
        return console.log('The permission is granted but with limitations');
    }
  });


  // Check if user is logged in.
  useEffect(() => {
    const authChange = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        console.log('No user found');
      }
    });
    return () => authChange();
  }, []);

  // Get current location of user and load user's journals.
  useEffect(() => {
    async function getCurrentLocation() {

      if (locationPermission) {
        return
      }
      setLocation(location);
    }
    getCurrentLocation();

    if (isFocused) {
      const loadJournals = async () => {
        const journals = await fetchJournals();
        setUserJournals(journals ?? []);
      };
      loadJournals();
    }

  }, [isFocused]);


  return (
    <View style={styles.container}>
      <MapView style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        initialRegion={{
          latitude: 49.310441,
          longitude: -123.080884,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
        }}
        mapPadding={{
          top: 700,
          right: 0,
          left: 0,
          bottom: 0
        }
        }>
        {
          (user?.uid) ?
            userJournals.map((entry) => {
              return (
                <Marker
                  key={entry.id}
                  tracksViewChanges={true}
                  coordinate={{ longitude: Number(entry.location.details.location.longitude), latitude: Number(entry.location.details.location.latitude) }}
                >
                  <Callout style={{ width: 250, padding: 10 }}
                    onPress={() => {
                      router.navigate({
                        pathname: '/journals/[id]',
                        params: { id: String(entry?.id) }
                      })
                    }}>
                    <View >
                      <Text style={{ fontWeight: 'bold' }}>{String(entry.title)}</Text>
                      <Text>{entry.location.text.text + "\nDate: " + String(entry.date.toDate())}</Text>
                    </View>
                  </Callout>
                </Marker>
              );
            })
            : null}
      </MapView>
      <SearchBar handlePlaceSelect={(placeData) => { setLocation(placeData.location.location) }} />

    </View >
  );
}

// Style for page.
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
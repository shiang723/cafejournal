import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import GooglePlacesTextInput, { Place } from 'react-native-google-places-textinput';

/**
 * Location search bar. Limited to cafe, bakery, and restaurants.
 * @version 1.0
 * @author Hannah Shiang
 * @param handlePlaceSelect function for how to use the location information.
 * @param oldLocation the location selected, if exists.
 * @returns A Location search bar.
 */
export default function SearchBar({ handlePlaceSelect, oldLocation }: { handlePlaceSelect: (place: any) => void; oldLocation?: any }) {

    const [location, setLocation] = useState('')

    // Get the text representation of the location.
    const getLocationText = (place?: any) => {
        return place?.structuredFormat?.mainText?.text
            ?? place?.text?.text
            ?? place?.structuredFormat?.text?.text
            ?? '';
    };

    // Load selected location, if exists.
    useEffect(() => {
        if (oldLocation) {
            setLocation(getLocationText(oldLocation))
        }
    }, [oldLocation])

    return (
        <View style={styles.container}>
            <GooglePlacesTextInput
                value={location}
                placeHolderText='Cafe location'
                apiKey={String(process.env.EXPO_PUBLIC_GOOGLE_MAP_API)}
                types={['cafe', 'restaurant', 'bakery']}
                onTextChange={(text) => { setLocation(text) }}
                onPlaceSelect={(place) => {
                    setLocation(getLocationText(place))
                    handlePlaceSelect(place)
                }}
                fetchDetails={true}
            />
        </View>
    )
};

// Style sheet for component.
const styles = StyleSheet.create({
    container: {
        borderColor: 'black',
        borderWidth: 1,
        margin: 12,
    },
});

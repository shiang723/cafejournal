import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import GooglePlacesTextInput, { Place } from 'react-native-google-places-textinput';

export default function SearchBar({ handlePlaceSelect, oldLocation }: { handlePlaceSelect: (place: any) => void; oldLocation?: any }) {

    const [location, setLocation] = useState('')

    const getLocationText = (place?: any) => {
        return place?.structuredFormat?.mainText?.text
            ?? place?.text?.text
            ?? place?.structuredFormat?.text?.text
            ?? '';
    };

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

const styles = StyleSheet.create({
    container: {
        borderColor: 'black',
        borderWidth: 1,
        margin: 12,
    },
});

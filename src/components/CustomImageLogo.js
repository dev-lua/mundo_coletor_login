import * as React from 'react';
import { Text, Image, StyleSheet } from 'react-native';

export default function CustomImageLogo({ fromWeb, image, text }) {
    return (
        <>
            {fromWeb || <Image source={image} style={styles.logoImage} />}
            <Text style={styles.logoText} >{text}</Text>
        </>
    );
}

const styles = StyleSheet.create({
    logoImage: {
        marginTop: 20,
        height: 90,
        width: 120,
        marginBottom: 25,
    },
    logoText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#000000',
        marginBottom: 50,
        textAlign: 'center'
    }
});

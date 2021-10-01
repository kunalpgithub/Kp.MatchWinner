import { StyleSheet, Dimensions } from "react-native";

export const dimensions = {
    fullHeight: Dimensions.get('window').height,
    fullWidth: Dimensions.get('window').width
}

export const textSize = {
    header: 30,
    subHeader: 25,
    largeText: 20,
    content: 15
}

export const textColor = {
    primary: '#757575'
    // primary: 'red'
}

const baseStyles = {
    screenHeader: {
        fontSize: textSize.header,
        color: textColor.primary,
        padding: 1,
        fontWeight: 'bold'

    },
    container: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',

    }
}

export default function createStyles(overrides: any) {
    return StyleSheet.create({ ...baseStyles, ...overrides })
}
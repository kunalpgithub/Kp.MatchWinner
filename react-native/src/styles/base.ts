import { StyleSheet, Dimensions } from "react-native";

export const dimensions = {
    fullHeight: Dimensions.get('window').height,
    fullWidth: Dimensions.get('window').width
}

export const textSize = {
    header: 20,
    subHeader: 19,
    largeText: 17,
    content: 15,
    smallText: 13
}

export const textColor = {
    primary: '#757575'
    // primary: 'red'
}

export const baseStyles = {
    header: {
        fontSize: textSize.header,
        padding: 15
        // color: textColor.primary,
        // padding: 1,
        // fontWeight: 'bold'

    },
    subHeader: {
        fontSize: textSize.subHeader,
    },

    largeText: {
        fontSize: textSize.largeText
    },

    contentText: {
        fontSize: textSize.content
    },

    smallText: {
        fontSize: textSize.smallText
    },

    container: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
        width: '100%'
    }
}

// '.tournamentTitle': {
//     // color: '#000',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },

export default function createStyles(overrides: any) {
    return StyleSheet.create({ ...baseStyles, ...overrides })
}


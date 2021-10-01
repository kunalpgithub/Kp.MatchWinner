import createStyles, { textSize, textColor, dimensions } from "../../styles/base";
import { StyleSheet } from "react-native";

const matchStyles = createStyles({

    cardFullWidth: {
        // color: textColor.primary,
        minWidth: dimensions.fullWidth - 20,
        padding: 5

    },
    cardHeder: {
        fontSize: textSize.subHeader,
        color: textColor.primary,
        fontWeight: 'bold'
    },
    cardContent: {
        fontSize: textSize.largeText,
        color: textColor.primary,
    },
    cardDescription: {
        fontSize: textSize.content,
        color: textColor.primary,

    }
})

export default matchStyles
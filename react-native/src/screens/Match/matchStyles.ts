import createStyles, { textSize, textColor, dimensions } from "../../styles/base";
import { StyleSheet } from "react-native";

const matchStyles = createStyles({

    cardFullWidth: {
        // color: textColor.primary,
        minWidth: dimensions.fullWidth - 20,
        padding: 5

    },
    cardHeader: {
        fontSize: textSize.smallText,
        // color: textColor.primary,
        // fontWeight: 'bold'
    },
    cardContent: {
        fontSize: textSize.content,
        // color: textColor.primary,
    },
    matchCard: {
        // maxWidth: 350,
        // minWidth: 350,
        width: dimensions.fullWidth > 450 ? 450 : dimensions.fullWidth - 20,
        // padding: 10,
        backgroundColor: '#fff',
        // padding: 0,
    },
})

export default matchStyles
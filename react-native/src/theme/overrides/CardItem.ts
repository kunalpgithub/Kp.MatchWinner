import cardItemTheme from '../components/CardItem';

export default variables => {
    const cardItemOverrides = {
        ...cardItemTheme(variables),
        '.zeroPadding': {
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 5,
            paddingRight: 5
        },
        // backgroundColor: '#00897B'
    }
    return cardItemOverrides
}
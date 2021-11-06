import cardTheme from '../components/Card';

export default variables => {
    const cardOverrides = {
        ...cardTheme(variables),
        '.matchCard': {
            minWidth: 300,
            // width: 500,
            // backgroundColor: '#00897B'
        },
        // backgroundColor: '#00897B'
    }
    return cardOverrides
}
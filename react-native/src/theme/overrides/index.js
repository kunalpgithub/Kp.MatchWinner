import textTheme from './Text';
import iconTheme from './Icon';
import inputTheme from './Input';
import inputGroupTheme from './InputGroup';
import labelTheme from './Label';
import buttonTheme from './Button';
import contentTheme from './Content';
import itemTheme from './Item';
import cardTheme from './Card';
import cardItemTheme from './CardItem';

export default variables => {
  const theme = {
    'NativeBase.Text': {
      ...textTheme(variables),
    },
    'NativeBase.Icon': {
      ...iconTheme(variables),
    },
    'NativeBase.Input': {
      ...inputTheme(variables),
    },
    'NativeBase.InputGroup': {
      ...inputGroupTheme(variables),
    },
    'NativeBase.Label': {
      ...labelTheme(variables),
    },
    'NativeBase.Button': {
      ...buttonTheme(variables),
    },
    'NativeBase.Content': {
      ...contentTheme(variables),
    },
    'NativeBase.Item': {
      ...itemTheme(variables),
    },
    'NativeBase.Card': {
      ...cardTheme(variables),
    },
    'NativeBase.CardItem': {
      ...cardItemTheme(variables),
    },
  };

  return theme;
};

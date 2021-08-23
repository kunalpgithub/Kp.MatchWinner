import platform from './Platform';
import material from './Material';
import commonColor from './CommonColor';

export const customVariables = {
  zIndex: {
    overlay: 50,
    loaders: 150,
  },
};

export const activeTheme = { ...platform, ...customVariables };
export const materialTheme = { ...material, ...customVariables };
export const commonColorTheme = { ...commonColor, ...customVariables };

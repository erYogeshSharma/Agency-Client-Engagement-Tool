import { createTheme, MantineThemeOverride } from '@mantine/core';

export const generateTheme = (mode: 'light' | 'dark'): MantineThemeOverride => {
  return {
    primaryColor: mode === 'light' ? 'indigo' : 'red',
    black: '#181D27',
    colors: {
      text: [
        '#ffffff',
        '#FAFAFA',
        '#D5D7DA',
        '#D5D7DA',
        '#535862',
        '#414651',
        '#717680',
        '#717680',
        '#181D27',
        '#181D27',
      ],
    },
    // primaryShade: {
    //   dark: 8,
    //   light: 9,
    // },
    scale: 1,
    /** Put your mantine theme override here */
  };
};

export const getTheme = (mode: 'light' | 'dark') => createTheme(generateTheme(mode));

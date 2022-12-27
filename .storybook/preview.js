import { addDecorator, addParameters } from '@storybook/react';
import React from 'react';
import GlobalStyle from '../src/styles/globalStyles';

addDecorator((story) => {
  return (
    <>
      <GlobalStyle />
      {story()}
    </>
  );
});

const customViewports = {
  desktop: {
    name: 'Desktop',
    styles: {
      width: '1280px',
      height: '800px',
    },
  },
  mobile: {
    name: 'Mobile',
    styles: {
      width: '375px',
      height: '667px',
    },
  },
};

addParameters({
  viewport: {
    viewports: customViewports,
    defaultViewport: 'desktop',
  },
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};
import React from 'react';
import LazyLoad from 'react-lazyload';

const Picture = ({ src, ...props }) => (
  <LazyLoad height="100%" once>
    <picture>
      <source srcSet={src + '?format=webp'} type="image/webp" />
      <img src={src} {...props} />
    </picture>
  </LazyLoad>
);

export default Picture;

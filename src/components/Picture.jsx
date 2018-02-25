import React from 'react';

const Picture = ({ src, ...props }) => (
  <picture>
    <source srcSet={src + '?format=webp'} type="image/webp" />
    <img src={src} {...props} />
  </picture>
);

export default Picture;

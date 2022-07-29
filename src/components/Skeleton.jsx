import React from 'react';
import ContentLoader from 'react-content-loader';

export const Skeleton = (props) => (
  <ContentLoader
    speed={1}
    width={400}
    height={160}
    viewBox="0 0 400 160"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="180" y="22" rx="3" ry="3" width="150" height="10" />
    <rect x="180" y="55" rx="10" ry="10" width="200" height="50" />
    <rect x="5" y="10" rx="10" ry="10" width="150" height="120" />
    <rect x="350" y="120" rx="5" ry="5" width="50" height="8" />
  </ContentLoader>
);

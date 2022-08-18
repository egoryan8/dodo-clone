import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = () => (
  <div className="pizza-block-wrapper">
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={460}
      viewBox="0 0 280 460"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <rect x="0" y="320" rx="10" ry="10" width="280" height="90" />
      <rect x="0" y="430" rx="10" ry="10" width="92" height="27" />
      <rect x="127" y="425" rx="25" ry="25" width="152" height="45" />
      <circle cx="130" cy="130" r="130" />
      <rect x="0" y="275" rx="10" ry="10" width="280" height="26" />
    </ContentLoader>
  </div>
);

export default Skeleton;

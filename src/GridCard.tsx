import { Card } from 'antd';
import React from 'react';
import { getName, getPosterImage } from './tmdb';
import { SearchTypes } from './tmdbTypes';

import './GridCard.css';

const { Meta } = Card;

type GridCardProps = {
  info: SearchTypes;
};

const GridCard = ({ info }: GridCardProps) => {
  const formattedName = getName(info);

  const poster = () => {
    const image = getPosterImage(info);
    if (image) return <img alt={formattedName} src={getPosterImage(info)} />;
    return <div className="no-image" />;
  };

  return (
    <Card className="movie-card" hoverable cover={poster()}>
      <Meta title={formattedName} />
    </Card>
  );
};

export default GridCard;

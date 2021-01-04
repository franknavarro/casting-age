import { Col, Row } from 'antd';
import React from 'react';
import GridCard from './GridCard';
import { SearchResultTypes, SearchTypes } from './tmdbTypes';

type SearchGridProps = {
  cardList: SearchResultTypes;
  setSelected: (info: SearchTypes) => void;
};

const SearchGrid = ({ cardList, setSelected }: SearchGridProps) => {
  return (
    <Row gutter={[16, 16]}>
      {cardList.map((info) => (
        <Col
          span={6}
          key={`${info.media_type}${info.id}`}
          onClick={() => setSelected(info)}
        >
          <GridCard info={info} />
        </Col>
      ))}
    </Row>
  );
};

export default SearchGrid;

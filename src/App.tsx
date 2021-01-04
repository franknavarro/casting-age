import React, { useEffect, useRef, useState } from 'react';
import { Input, Modal } from 'antd';
import { getName, searchTMDB } from './tmdb';
import { SearchResultTypes, SearchTypes } from './tmdbTypes';
import SearchGrid from './SearchGrid';
import Layout, { Content } from 'antd/lib/layout/layout';
import './App.css';
import { debounce } from 'throttle-debounce';
import { LoadingOutlined } from '@ant-design/icons';
import AgeTable from './AgeTable';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResultTypes>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<SearchTypes | null>(null);

  const debouncedSearch = useRef(
    debounce(200, async (q: string) => {
      setLoading(false);
      const results = await searchTMDB(q);
      setSearchResults(results);
    }),
  ).current;

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const search = e.target.value;
    setSearchTerm(search);
    if (search) debouncedSearch(search);
    else {
      setLoading(false);
      debouncedSearch.cancel();
      setSearchResults([]);
    }
  };

  const GetGrid = () => {
    if (loading)
      return (
        <div className="loading">
          <LoadingOutlined />
        </div>
      );
    if (!searchResults.length && searchTerm) return <>No Results Found...</>;
    if (!searchResults.length) return <>Search Above</>;
    return <SearchGrid cardList={searchResults} setSelected={setSelected} />;
  };

  return (
    <Layout className="layout">
      <Content className="site-content">
        <Input
          onChange={onChange}
          placeholder="Search Movies, TV Shows or Actors..."
        />
        <div className="site-content-layout">
          <div className="movie-grid">
            <div>
              <GetGrid />
            </div>
          </div>
        </div>
      </Content>
      <Modal
        visible={selected ? true : false}
        title={selected ? getName(selected) : ''}
        onCancel={() => setSelected(null)}
        footer={null}
      >
        <AgeTable info={selected} />
      </Modal>
    </Layout>
  );
};

export default App;

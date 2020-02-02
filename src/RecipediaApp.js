// @flow
import React from 'react';
import SearchBar from 'components/SearchBar';

const style = {
  upperContainer: {
    height: '10em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: '6em',
    fontStyle: 'bold',
    marginBottom: '2em',
  },
};

const RecipediaApp = () => (
  <div style={style.upperContainer}>
    <div>
      <span style={style.title}>Recipedia</span>
      <SearchBar />
    </div>
  </div>
);

export default RecipediaApp;

// @flow
import React from 'react';
import SearchBar from 'components/SearchBar';

const style = {
  upperContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  verticalContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: '4em',
    fontStyle: 'bold',
    alignText: 'center',
  },
};

const RecipediaApp = () => (
  <div style={style.upperContainer}>
    <div style={style.verticalContainer}>
      <span style={style.title}>Recipedia</span>
      <SearchBar />
    </div>
  </div>
);

export default RecipediaApp;

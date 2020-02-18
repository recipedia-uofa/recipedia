// @flow
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TokenInput from 'react-customize-token-input';
// Be sure to include styles at some point, probably during your bootstraping
import 'react-customize-token-input/dist/react-customize-token-input.css';
import styles from 'styles/searchbar.module.css';
import * as colours from 'constants/colours';

import { executeSearch } from 'actions';

type Props = {|
  text: string,
  executeSearch: () => void,
|};

const BORDER_WIDTH = 1;
const CORNER_RADIUS = 15;
const KEYWORD_MARGIN = 5;

const style = {
  outerSearchBox: {
    border: `${BORDER_WIDTH}px solid ${colours.LIGHT_BACKGROUND_DEFAULT_COLOUR}`,
    borderRadius: `${CORNER_RADIUS}px`,
    padding: CORNER_RADIUS - BORDER_WIDTH,
    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
    height: 'auto',
    display: 'flex',
    flexWrap: 'nowrap',
    boxSizing: 'border-box',
    width: '100%',
  },
  editBox: {
    flex: '2 1 100%',
    alignSelf: 'stretch',
    border: 'none',
    boxSizing: 'border-box',
    height: 40,
  },
  searchButton: {
    flex: `0 1 ${CORNER_RADIUS + 50}`,
    alignSelf: 'stretch',
    color: 'grey',
    borderRadius: `${CORNER_RADIUS}px`,
    margin: '0 auto',
    marginTop: `${CORNER_RADIUS}px`,
    padding: `${CORNER_RADIUS}px`,
  },
};

class SearchBar extends React.PureComponent<Props> {
  render() {
    // const { text } = this.props;
    return (
      <div className={styles.searchContainer}>
        <div style={style.outerSearchBox}>
          <TokenInput style={style.editBox} autoFocus/>
        </div>
        <div className={styles.buttonContainer}>
          <button type="button" className={styles.searchButtonAttitude}
            style={style.searchButton} onClick={this.props.executeSearch}>
              Search
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  text: 'SomeText',
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    executeSearch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

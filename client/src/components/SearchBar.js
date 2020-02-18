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
import type { PartialSearchToken, FullSearchToken, SearchToken } from 'types/tokens';

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

// NOTE: For the full token container, need to add a margin-right of 5px
const searchTokenStyle = {
  partialTokenContainer: {
    borderTopLeftRadius: `${CORNER_RADIUS}px`,
    borderBottomLeftRadius: `${CORNER_RADIUS}px`,
    display: 'flex',
    flexDirection: 'row',
    width: 'max-content',
    margin: `${KEYWORD_MARGIN*2}px`,
    border: `3px solid ${colours.SHADE_LVL1}`,
  },
  partialTokenName: {
    fontWeight: '600',
    color: 'white',
    alignSelf: 'center',
    padding: '8px',
  },
  fullTokenContainer: {
    borderadius: `${CORNER_RADIUS - 10}px`,
    display: 'flex',
    flexDirection: 'row',
    width: 'max-content',
    margin: `${KEYWORD_MARGIN*2}px`,
    overflow: 'hidden',
  },
  fullTokenName: {
    marginRight: `${KEYWORD_MARGIN}px`,
    borderTopLeftRadius: `${CORNER_RADIUS-5}px`,
    borderBottomLeftRadius: `${CORNER_RADIUS-5}px`,
    fontWeight: '600',
    backgroundColor: `${colours.SHADE_LVL2}`,
    color: 'white',
    alignSelf: 'center',
    padding: '11px',
  },
  tokenContent: {
    margin: '9px',
    marginLeft: '0',
    padding: '2px',
    borderTopLeftRadius: `${CORNER_RADIUS-5}px`,
    borderBottomLeftRadius: `${CORNER_RADIUS-5}px`,
    color: 'white',
  },
};

const getTokenColour = (token: SearchToken): string => {
  switch(token.keyword) {
    case 'not':
      return colours.NOT_KEYWORD_COLOUR;
    case 'key':
      return colours.KEY_KEYWORD_COLOUR;
    case 'diet':
      return colours.DIET_KEYWORD_COLOUR;
    default:
      return colours.INGREDIENT_COLOUR;
  }
};

const renderPartialToken = (token: PartialSearchToken) => {
  const tokenColour = getTokenColour(token);
  const keyword = token.keyword.toUpperCase();
  return (
    <div style={{
        ...searchTokenStyle.partialTokenContainer,
        backgroundColor: tokenColour,
      }}>
      <div style={searchTokenStyle.partialTokenName}>{keyword}</div>
    </div>
  );
};

const renderFullToken = (token : FullSearchToken) => {
  const tokenColour = getTokenColour(token);
  const keyword = token.keyword.toUpperCase();
  const content = (token.ingredient || token.diet).toUpperCase();
  return (
    <div style={{
      ...searchTokenStyle.fullTokenContainer,
      backgroundColor: tokenColour,
    }}>
      <div style={searchTokenStyle.fullTokenName}>{keyword}</div>
      <div style={searchTokenStyle.tokenContent}>{content}</div>
    </div>
  );
};


const isPartial = (token) => {
  // Check the type of the token from the flow props
  const keys = Object.keys(token);
  return keys.length === 1 && keys.includes('keyword');
};

const renderToken = (token: SearchToken) => {
  return isPartial(token) 
    ? renderPartialToken(token)
    : renderFullToken(token);
};

class SearchBar extends React.PureComponent<Props> {
  render() {
    // const { text } = this.props;
    return (
      <div className={styles.searchContainer}>
        <div style={style.outerSearchBox}>
          <TokenInput style={style.editBox} autoFocus
            tokenLabelRender={renderToken}/>
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

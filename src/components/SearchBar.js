// @flow
import React from 'react';
import { connect } from 'react-redux';
import TokenInput from 'react-customize-token-input';
// Be sure to include styles at some point, probably during your bootstraping
import 'react-customize-token-input/dist/react-customize-token-input.css';

import { executeSearch } from 'actions';

// const red = '#fd5e25';
const COLOR_ORANGE = '#fdbb1d';
// const green = '#84fd25';

type Props = {|
  text: string,
  executeSearch: () => void,
|};

const BORDER_WIDTH = 1;
const CORNER_RADIUS = 20;

const style = {
  outerSearchBox: {
    border: `${BORDER_WIDTH}px solid black`,
    borderTopLeftRadius: CORNER_RADIUS,
    borderBottomRightRadius: CORNER_RADIUS,
    paddingLeft: CORNER_RADIUS,
    paddingBottom: 0,
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
    height: 'auto',
    flex: `0 1 ${CORNER_RADIUS + 50}`,
    alignSelf: 'stretch',
    backgroundColor: COLOR_ORANGE,
    borderBottomRightRadius: CORNER_RADIUS - BORDER_WIDTH,
  },
};

class SearchBar extends React.PureComponent<Props> {
  render() {
    // const { text } = this.props;
    return (
      <div style={style.outerSearchBox}>
        <TokenInput style={style.editBox} autoFocus="true" />
        <button type="button" className="searchButton"
          style={style.searchButton} onClick={this.props.executeSearch}>
            Search
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  text: 'SomeText',
});

const mapDispatchToProps = (dispatch) => ({
  executeSearch: () => dispatch(executeSearch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

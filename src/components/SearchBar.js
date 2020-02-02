// @flow
import React from 'react';
import { connect } from 'react-redux';
import { executeSearch } from 'actions';

// const red = '#fd5e25';
const COLOR_ORANGE = '#fdbb1d';
// const green = '#84fd25';

type Props = {|
  text: string,
  executeSearch: () => void,
|};

const BORDER_WIDTH = 2;
const CORNER_RADIUS = 20;

const style = {
  outerSearchBox: {
    border: `${BORDER_WIDTH}px solid black`,
    borderTopLeftRadius: CORNER_RADIUS,
    borderBottomRightRadius: CORNER_RADIUS,
    paddingLeft: CORNER_RADIUS,
    paddingBottom: 0,
    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
    height: 21,
  },
  editBox: {},
  searchButton: {
    height: 'inherit',
    width: CORNER_RADIUS + 50,
    float: 'right',
    backgroundColor: COLOR_ORANGE,
    borderBottomRightRadius: CORNER_RADIUS - BORDER_WIDTH,
  },
};

class SearchBar extends React.Component<Props> {
  render() {
    const { text } = this.props;
    return (
      <div style={style.outerSearchBox}>
        <span style={style.editBox}>{text}</span>
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

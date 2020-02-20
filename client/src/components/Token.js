import React from "react";
import * as colours from "constants/colours";
import keywords from 'models/keywords';

import type {
  PartialSearchToken,
  FullSearchToken,
  SearchToken
} from "types/tokens";

const CORNER_RADIUS = 15;
const KEYWORD_MARGIN = 5;

// NOTE: For the full token container, need to add a margin-right of 5px
const style = {
  partialTokenContainer: {
    borderTopLeftRadius: `${CORNER_RADIUS}px`,
    borderBottomLeftRadius: `${CORNER_RADIUS}px`,
    display: "flex",
    flexDirection: "row",
    width: "max-content",
    margin: `${KEYWORD_MARGIN * 2}px`,
    border: `3px solid ${colours.SHADE_LVL1}`
  },
  partialTokenName: {
    fontWeight: "600",
    color: "white",
    alignSelf: "center",
    padding: "8px"
  },
  fullTokenContainer: {
    borderadius: `${CORNER_RADIUS - 10}px`,
    display: "flex",
    flexDirection: "row",
    width: "max-content",
    margin: `${KEYWORD_MARGIN * 2}px`,
    overflow: "hidden"
  },
  fullTokenName: {
    marginRight: `${KEYWORD_MARGIN}px`,
    borderTopLeftRadius: `${CORNER_RADIUS - 5}px`,
    borderBottomLeftRadius: `${CORNER_RADIUS - 5}px`,
    fontWeight: "600",
    backgroundColor: `${colours.SHADE_LVL2}`,
    color: "white",
    alignSelf: "center",
    padding: "11px"
  },
  tokenContent: {
    margin: "9px",
    marginLeft: "0",
    padding: "2px",
    borderTopLeftRadius: `${CORNER_RADIUS - 5}px`,
    borderBottomLeftRadius: `${CORNER_RADIUS - 5}px`,
    color: "white"
  }
};

// const DeleteButton = (props) => {
//   return (
//       <i
//           className={styles['delete-button']}
//           aria-hidden="true"
//       />
//   );
// };

const getTokenColour = (token: SearchToken): string => {
  switch (token.keyword) {
    case keywords.NOT:
      return colours.NOT_KEYWORD_COLOUR;
    case keywords.KEY:
      return colours.KEY_KEYWORD_COLOUR;
    case keywords.DIET:
      return colours.DIET_KEYWORD_COLOUR;
    default:
      return colours.INGREDIENT_COLOUR;
  }
};

const renderPartialToken = (token: PartialSearchToken) => {
  const tokenColour = getTokenColour(token);
  const keyword = token.keyword.toUpperCase();
  return (
    <div
      style={{
        ...style.partialTokenContainer,
        backgroundColor: tokenColour
      }}
    >
      <div style={style.partialTokenName}>{keyword}</div>
    </div>
  );
};

const renderFullToken = (token: FullSearchToken) => {
  const tokenColour = getTokenColour(token);
  const keyword = token.keyword.toUpperCase();
  const content = (token.value || '').toUpperCase();
  return (
    <div
      style={{
        ...style.fullTokenContainer,
        backgroundColor: tokenColour
      }}
    >
      {token.hasKeyword() && <div style={style.fullTokenName}>{keyword}</div>}
      <div style={style.tokenContent}>{content}</div>
    </div>
  );
};

type Props = {
  data: SearchToken
};

const Token = (props: Props) => {
  const token = props.data;
  return token.isPartial() ? renderPartialToken(token) : renderFullToken(token);
};

export default Token;

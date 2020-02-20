import React from "react";
import { bindActionCreators } from "redux";
// import classNames from 'classnames';
// import Autosized from 'react-input-autosize';
import * as colours from "constants/colours";
import { tryAddSearchToken } from "actions/searchbar";
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
    case "not":
      return colours.NOT_KEYWORD_COLOUR;
    case "key":
      return colours.KEY_KEYWORD_COLOUR;
    case "diet":
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
  const content = (token.ingredient || token.diet).toUpperCase();
  return (
    <div
      style={{
        ...style.fullTokenContainer,
        backgroundColor: tokenColour
      }}
    >
      <div style={style.fullTokenName}>{keyword}</div>
      <div style={style.tokenContent}>{content}</div>
    </div>
  );
};

const isPartial = (token: SearchToken): boolean => {
  // Check the type of the token from the flow props
  const keys = Object.keys(token);
  return keys.length === 1 && keys.includes("keyword");
};

// Token.propTypes = {
//     readOnly: PropTypes.bool.isRequired,
//     tokenClassName: PropTypes.func.isRequired,
//     tokenLabelRender: PropTypes.func.isRequired,
//     tokenErrorMessage: PropTypes.func.isRequired,
//     dataValue: PropTypes.func.isRequired,
//     buildDataFromValue: PropTypes.func.isRequired,
//     data: PropTypes.object.isRequired,
//     onStartEdit: PropTypes.func.isRequired,
//     onEndEdit: PropTypes.func.isRequired,
//     onDelete: PropTypes.func.isRequired
// };

type Props = {
  data: SearchToken
};

const Token = props => {
  const token = props.data;
  return isPartial(token) ? renderPartialToken(token) : renderFullToken(token);
};

export default Token;

// type Props = {
//   token: SearchToken,
//   // redux
//   addSearchToken: (SearchToken) => any,
// };
//
// class Token extends React.PureComponent<Props> {
//     constructor (props) {
//         super(props);
//
//         this.state = {
//             value: ''
//         };
//     }
//
//     actions = {
//         onStartEdit: () => {
//             const {
//                 data,
//                 onStartEdit,
//                 dataValue
//             } = this.props;
//
//             this.setState({
//                 value: dataValue(data.value, data.meta)
//             }, () => {
//                 onStartEdit();
//             });
//         },
//         onEndEdit: (rollback = false) => {
//             const { value } = this.state;
//
//             // handle input value length === 0 case: Rollback token
//             if (rollback === true || value.length === 0) {
//                 this.props.onEndEdit();
//                 return;
//             }
//
//             this.props.addSearchToken({
//               keyword: 'none',
//               ingredient: value,
//             });
//
//             // const { buildDataFromValue } = this.props;
//             // this.props.onEndEdit(buildDataFromValue(value));
//         },
//         // event handler
//         handleClick: (e) => {
//             e.stopPropagation();
//
//             const { className = '' } = e.target;
//             const isDeleteButton = className.indexOf(styles['delete-button']) !== -1;
//             const {
//                 readOnly,
//                 onDelete
//             } = this.props;
//
//             if (readOnly === true) {
//                 return;
//             }
//
//             if (isDeleteButton) {
//                 onDelete();
//                 return;
//             }
//
//             this.actions.onStartEdit();
//         },
//         handleChangeValue: (e) => {
//             const { value } = e.target;
//
//             this.setState({ value });
//         },
//         handleKeyDown: (e) => {
//             let eventKey;
//
//             // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
//             const eventKeys = [
//                 'Enter',
//                 'Escape'
//             ];
//             const keyIndex = eventKeys.indexOf(e.key);
//             eventKey = eventKeys[keyIndex];
//
//             // backward compatibility for browser not support event.key, such as safari
//             // https://www.w3schools.com/jsref/event_key_key.asp
//             if (eventKey === undefined) {
//                 eventKey = {
//                     13: 'Enter',
//                     27: 'Escape'
//                 }[e.keyCode];
//             }
//
//             if (eventKey === 'Escape') {
//                 // End editing with Rollback token
//                 this.actions.onEndEdit(true);
//                 return;
//             }
//
//             if (eventKey === 'Enter') {
//                 this.actions.onEndEdit();
//                 return;
//             }
//         },
//         handleBlur: (e) => {
//             this.actions.onEndEdit();
//         }
//     };
//
//     render() {
//
//         const {
//             data,
//             tokenClassName,
//             tokenLabelRender,
//             tokenErrorMessage
//         } = this.props;
//
//         const readOnly = true;
//
//         const {
//             value
//         } = this.state;
//
//         const {
//             meta: {
//                 error
//             }
//         } = data;
//
//         const activated = false;
//         const title = error === null ? null : tokenErrorMessage(error);
//
//         return (
//             <div
//                 className={classNames(
//                     tokenClassName(data.value, data.meta),
//                     styles.token,
//                     {
//                         [styles.active]: activated,
//                         [styles.error]: error && !activated,
//                         [styles['read-only']]: readOnly
//                     }
//                 )}
//                 onClick={this.actions.handleClick}
//                 role="presentation"
//                 title={title}
//             >
//                 { !activated &&
//                     <div className={styles['label-wrapper']}>
//                         {tokenLabelRender(data.value)}
//                     </div>
//                 }
//                 { !activated && <DeleteButton /> }
//             </div>
//         );
//     }
// }

// const mapDispatchToProps = (dispatch) => bindActionCreators({
//   addSearchToken: tryAddSearchToken,
// }, dispatch);
//
// export default connect(() => {}, mapDispatchToProps)(Token);

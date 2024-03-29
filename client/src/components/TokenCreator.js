// @flow
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Autosized from "react-input-autosize";
import Autocomplete from "components/Autocomplete";
import {
  tryAddSearchToken,
  deleteLastSearchToken,
  changeSearchText,
  completeSearchToken,
  incrementAutocompleteSelection,
  decrementAutocompleteSelection
} from "actions/searchbar";
import { executeSearch } from "actions/search";
import styles from "styles/searchbar.module.css";

import type { State } from "types/states";

type Props = {
  autoFocus: boolean,
  placeholder: string,
  inputRef: (el: any) => void,
  //redux
  value: string,
  errorMessage: string,
  showError: boolean,
  updateValue: string => any,
  tryAddToken: string => any,
  deleteLastToken: () => any,
  completeToken: () => any,
  incrementSelection: () => any,
  decrementSelection: () => any,
  executeSearch: () => any
};

const mapStateToProps = (state: State, ownProps) => ({
  value: state.searchbar.text,
  errorMessage: state.searchbar.error,
  showError: state.searchbar.showError
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deleteLastToken: deleteLastSearchToken,
      updateValue: changeSearchText,
      tryAddToken: tryAddSearchToken,
      completeToken: completeSearchToken,
      incrementSelection: incrementAutocompleteSelection,
      decrementSelection: decrementAutocompleteSelection,
      executeSearch
    },
    dispatch
  );

class TokenCreator extends PureComponent<Props> {
  static defaultProps = {
    autoFocus: false,
    placeholder: "",
    inputRef: el => {} // dummy function
  };

  actions = {
    // event handler
    handleChangeValue: e => {
      const { value } = e.target;
      this.props.updateValue(value);
    },
    createToken: (value = this.props.value) => {
      const trimmedValue = value.trim();

      // Skip empty
      if (trimmedValue === "") {
        return;
      }

      this.props.tryAddToken(trimmedValue);
    },
    handleKeyDown: e => {
      const { value } = this.props;
      const trimmedValue = value.trim();

      let eventKey;

      // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
      const eventKeys = [
        "Backspace",
        "Enter",
        "Escape",
        "ArrowUp",
        "ArrowDown"
      ];
      const keyIndex = eventKeys.indexOf(e.key);
      eventKey = eventKeys[keyIndex];

      // backward compatibility for browser not support event.key, such as safari
      // https://www.w3schools.com/jsref/event_key_key.asp
      if (eventKey === undefined) {
        eventKey = {
          "8": "Backspace",
          "9": "Tab",
          "13": "Enter",
          "24": "ArrowUp",
          "25": "ArrowDown",
          "27": "Escape"
        }[e.keyCode.toString()];
      }

      switch (eventKey) {
        // REQ 3-5: Search token BACKSPACE deletion
        case "Backspace":
          if (value.length === 0) {
            this.props.deleteLastToken();
          }
          break;
        case "Tab":
          e.preventDefault();
          this.props.completeToken();
          break;
        // REQ 1-4: Search on enter.
        case "Enter":
          if (trimmedValue.length === 0) {
            this.props.executeSearch();
          } else {
            this.actions.createToken();
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          this.props.decrementSelection();
          break;
        case "ArrowDown":
          e.preventDefault();
          this.props.incrementSelection();
          break;
        case "Escape":
          // if (eventKey === 'Escape') {
          //     this.actions.updateValue(''); // clear value
          //     return;
          // }
          break;
        default:
          return;
      }
    },
    handlePaste: e => {
      e.preventDefault();
      const pastedText = e.clipboardData.getData("text");
      this.props.updateValue(pastedText);
      this.actions.createToken(pastedText);
    }
  };

  render() {
    const {
      placeholder,
      autoFocus,
      value,
      errorMessage,
      showError,
      inputRef
    } = this.props;

    return (
      <div className={styles.autosizedWrapper}>
        <Autocomplete />
        <Autosized
          inputRef={inputRef}
          placeholder={placeholder}
          value={value}
          autoFocus={autoFocus}
          onChange={this.actions.handleChangeValue}
          onKeyDown={this.actions.handleKeyDown}
          onPaste={this.actions.handlePaste}
        />
        {showError && (
          <span className={styles.toolTipError}>{errorMessage}</span>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenCreator);

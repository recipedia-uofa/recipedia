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
  completeSearchToken
} from "actions/searchbar";
import { executeSearch } from "actions/search";
import styles from "styles/searchbar.module.css";

import type { State } from "types/states";

const style = {
  noError: {
    opacity: 0
    // width: 0,
    // padding: 0,
  },
  displayError: {
    opacity: 1
    // width: "200px",
    // padding: "10px",
  }
};

type Props = {
  autoFocus: boolean,
  placeholder: string,
  inputRef: (el: any) => void,
  //redux
  value: string,
  errorMessage: string,
  updateValue: string => any,
  tryAddToken: string => any,
  deleteLastToken: () => any,
  completeToken: () => any,
  executeSearch: () => any
};

const mapStateToProps = (state: State, ownProps) => ({
  value: state.searchbar.text,
  errorMessage: state.searchbar.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deleteLastToken: deleteLastSearchToken,
      updateValue: changeSearchText,
      tryAddToken: tryAddSearchToken,
      completeToken: completeSearchToken,
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
      const eventKeys = ["Backspace", "Enter", "Escape"];
      const keyIndex = eventKeys.indexOf(e.key);
      eventKey = eventKeys[keyIndex];

      // backward compatibility for browser not support event.key, such as safari
      // https://www.w3schools.com/jsref/event_key_key.asp
      if (eventKey === undefined) {
        eventKey = {
          "8": "Backspace",
          "9": "Tab",
          "13": "Enter",
          "27": "Escape"
        }[e.keyCode.toString()];
      }

      // TODO: Fix me. check functional
      if (value.length === 0 && eventKey === "Backspace") {
        this.props.deleteLastToken();
      }

      if (eventKey === "Tab") {
        e.preventDefault();
        this.props.completeToken();
      }

      // if (eventKey === 'Escape') {
      //     this.actions.updateValue(''); // clear value
      //     return;
      // }

      if (eventKey === "Enter") {
        if (trimmedValue.length === 0) {
          // this.props.executeSearch();
        } else {
          this.actions.createToken();
        }
        return;
      }
    },
    handleBlur: e => {
      this.actions.createToken();
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
      inputRef
    } = this.props;

    const showError = errorMessage !== "";

    return (
      <div className={styles.autosizedWrapper}>
        <Autocomplete />
        <Autosized
          inputRef={inputRef}
          placeholder={placeholder}
          value={value}
          autoFocus={autoFocus}
          onBlur={this.actions.handleBlur}
          onChange={this.actions.handleChangeValue}
          onKeyDown={this.actions.handleKeyDown}
          onPaste={this.actions.handlePaste}
        />
        <span
          className={styles.toolTipError}
          style={showError ? style.displayError : style.noError}
        >
          {errorMessage}
        </span>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenCreator);

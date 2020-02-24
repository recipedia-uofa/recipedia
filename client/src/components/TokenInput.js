// @flow
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import TokenCreator from "components/TokenCreator";
import Token from "components/Token";
import SearchToken from "models/SearchToken";

import styles from "styles/searchbar.module.css";

import type { State } from "types/states";

type Props = {
  autoFocus: boolean,
  placeholder: string,
  // redux
  hasError: boolean,
  tokens: Array<SearchToken>
};

type TokenInputState = {
  focused: boolean
};

const mapStateToProps = (state: State, ownProps) => ({
  hasError: state.searchbar.error !== "",
  tokens: state.searchbar.tokens
});

class TokenInput extends PureComponent<Props, TokenInputState> {
  tokenCreator: ?any;

  static defaultProps = {
    autoFocus: false,
    placeholder: ""
  };

  constructor(props) {
    super(props);
    this.state = { focused: false };
    this.tokenCreator = null;
  }

  actions = {
    keepFocus: () => {
      this.tokenCreator && this.tokenCreator.focus();
    },
    onFocus: e => {
      this.setState({ focused: true });
    },
    onBlur: e => {
      this.setState({ focused: false });
    }
  };

  render() {
    const { autoFocus, placeholder, hasError, tokens } = this.props;

    const { focused } = this.state;

    return (
      <div
        className={classNames(styles.inputContainer, {
          [styles.focused]: focused,
          [styles.errors]: hasError
        })}
        onClick={this.actions.keepFocus}
        role="presentation"
      >
        <div className={styles.tokenList}>
          {tokens.map((token, index) => {
            return (
              <Token
                key={token.hash()}
                index={index}
                data={token}
                // TODO: Bind onDelete to index
                // onDelete={this.actions.onDeleteToken(index)}
              />
            );
          })}
        </div>
        <TokenCreator
          inputRef={node => {
            this.tokenCreator = node;
          }}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onFocus={this.actions.onFocus}
          onBlur={this.actions.onBlur}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(TokenInput);

// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TokenCreator from 'components/TokenCreator';
import Token from 'components/Token';
import SearchToken from 'models/SearchToken';

import { State } from 'types/states';

type Props = {
  autoFocus: boolean,
  placeholder: string,
  // redux
  hasError: boolean,
  tokens: Array<SearchToken>,
};

type TokenInputState = {
  focused: boolean,
};

const mapStateToProps = (state: State, ownProps) => ({
  hasError: state.searchbar.error !== '',
  tokens: state.searchbar.tokens,
});

class TokenInput extends PureComponent<Props, TokenInputState> {
  tokenCreator: any;

  static defaultProps = {
    autoFocus: false,
    placeholder: '',
  };

  constructor(props) {
      super(props);
      this.state = { focused: false };
  }

    componentDidMount() {
        const tokens = this.props.defaultData.map(dataItemToTokenData);

        this.actions.updateTokens(tokens);
    }

    actions = {
        keepFocus: () => {
            this.tokenCreator && this.tokenCreator.focus();
        },
        onFocus: (e) => {
            this.setState({ focused: true });
        },
        onBlur: (e) => {
            this.setState({ focused: false });
        },
        updateTokens: (tokens, options = {}) => {
            const {
                keepFocus = false
            } = options;

            let hasInvalid = false;
            const values = tokens.map(token => token.value);
            const newTokens = tokens.map((token, index, tokens) => {
                const newToken = { ...token };
                newToken.meta.error = this.props.validator(token.value, index, values);

                if (newToken.meta.error && !newToken.meta.activated) {
                    hasInvalid = true;
                }

                return newToken;
            });

            this.setState({
                tokens: newTokens,
                error: hasInvalid
            }, () => {
                if (keepFocus === true) {
                    this.actions.keepFocus();
                }

                // TODO: Fix me.
                // onDataUpdate?
                this.props.onTokensUpdate(newTokens);
            });
        },
        onStartEditToken: (index) => () => {
            const tokens = [...this.state.tokens];
            tokens[index].meta.activated = true;

            this.actions.updateTokens(tokens);
        },
        onEndEditToken: (index) => (data) => {
            const tokens = [...this.state.tokens];
            tokens[index].meta.activated = false;

            if (typeof data !== 'undefined') {
                tokens[index].value = data;
            }

            this.actions.updateTokens(tokens);
        },
    };

    render() {
        const {
          autoFocus,
          placeholder,
          hasError,
          tokens,
        } = this.props;

        const { focused } = this.state;

        return (
            <div
                className={classNames(
                    styles.container,
                    {
                        [styles.focused]: focused,
                        [styles.errors]: hasError
                    }
                )}
                onClick={this.actions.keepFocus}
                role="presentation"
            >
                <div className={styles['token-list']}>
                    { customizeToken &&
                        tokens.map((token, index) => {
                            const key = token.meta.key;

                            return tokenRender({
                                key,
                                readOnly,
                                data: token.value,
                                meta: token.meta,
                                onStartEdit: this.actions.onStartEditToken(index),
                                onEndEdit: this.actions.onEndEditToken(index),
                                onDelete: this.actions.onDeleteToken(index)
                            });
                        })
                    }
                    { !customizeToken &&
                        tokens.map((token, index) => {
                            const key = token.meta.key;

                            return (
                                <Token
                                    key={key}
                                    readOnly={readOnly}
                                    buildDataFromValue={buildDataFromValue}
                                    dataValue={dataValue}
                                    tokenClassName={tokenClassName}
                                    tokenLabelRender={tokenLabelRender}
                                    tokenErrorMessage={tokenErrorMessage}
                                    data={token}
                                    onStartEdit={this.actions.onStartEditToken(index)}
                                    onEndEdit={this.actions.onEndEditToken(index)}
                                    onDelete={this.actions.onDeleteToken(index)}
                                />
                            );
                        })
                    }
                </div>
                <TokenCreator
                    ref={node => {
                        this.tokenCreator = node;
                    }}
                    placeholder={placeholder}
                    autoFocus={autoFocus}
                    onFocus={this.actions.onFocus}
                    onBlur={this.actions.onBlur}
                    onInputValueChange={onInputValueChange}
                    preprocessor={this.actions.tokenCreatePreprocessor}
                    separators={separators}
                    buildDataFromValue={buildDataFromValue}
                    addTokens={this.actions.onAddTokens}
                    onDeleteLastToken={this.actions.onDeleteLastToken}
                />
            </div>
        );
    }
}

TokenInput.defaultProps = {
    className: '',
    readOnly: false,
    placeholder: '',
    autoFocus: false,
    defaultData: [],
    separators: [
        ',',
        ';',
        '\n', // for copy past
        '\r', // for copy past
        '\r\n' // for copy past
    ],
    // reproduceValue: reproduceValue,
    buildDataFromValue: buildDataFromValue,
    dataValue: getDataValue,
    tokenClassName: () => '',
    tokenLabelRender: getDataValue,
    validator: () => null,
    tokenErrorMessage: errorMsg => errorMsg,
    onInputValueChange: value => value,
    onTokensUpdate: () => {} // dummy function
};

export default TokenInput;

// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Autosized from 'react-input-autosize';
import { tryAddSearchToken, changeSearchText } from 'actions/searchbar';

import styles from 'styles/searchbar.module.css';

import type { State } from 'types/states';

// import styles from '/styles.styl';

// TokenCreator.propTypes = {
//     separators: PropTypes.array.isRequired,
//     placeholder: PropTypes.string.isRequired,
//     autoFocus: PropTypes.bool.isRequired,
//     onFocus: PropTypes.func.isRequired,
//     onBlur: PropTypes.func.isRequired,
//     addTokens: PropTypes.func.isRequired,
//     onDeleteLastToken: PropTypes.func.isRequired,
//     buildDataFromValue: PropTypes.func.isRequired,
//     onInputValueChange: PropTypes.func.isRequired,
//     preprocessor: PropTypes.func.isRequired
// };

type Props = {
    autoFocus: boolean,
    placeholder: string,
    //redux
    value: string,
    updateValue: (string) => any,
    tryAddToken: (input: string) => any,
    deleteLastToken: () => any,
};


const mapStateToProps = (state: State, ownProps) => ({
    value: state.searchbar.text,
});

const mapDispatchToProps = (dispatch) => ({
    deleteLastToken: () => {},
    ...bindActionCreators({
        updateValue: changeSearchText,
        tryAddToken: tryAddSearchToken,
    }, dispatch),
});

class TokenCreator extends PureComponent<Props> {
    tokenCreator: any;

    static defaultProps = {
        autoFocus: false,
        placeholder: '',
    };

    actions = {
        // event handler
        handleChangeValue: (e) => {
            const { value } = e.target;
            this.props.updateValue(value);
        },
        createToken: (value = this.props.value) => {
            const trimmedValue = value.trim();

            // Skip empty
            if (trimmedValue === '') {
                return;
            }

            this.props.tryAddToken(trimmedValue);
        },
        handleKeyDown: (e) => {
            // const { value } = e.target;
            const { value } = this.props;

            let eventKey;

            // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
            const eventKeys = [
                'Backspace',
                'Enter',
                'Escape'
            ];
            const keyIndex = eventKeys.indexOf(e.key);
            eventKey = eventKeys[keyIndex];

            // backward compatibility for browser not support event.key, such as safari
            // https://www.w3schools.com/jsref/event_key_key.asp
            if (eventKey === undefined) {
                eventKey = {
                    '8': 'Backspace',
                    '13': 'Enter',
                    '27': 'Escape'
                }[e.keyCode.toString()];
            }

            // TODO: Fix me. check functional
            if (value.length === 0 && eventKey === 'Backspace') {
                this.props.deleteLastToken();
            }

            // if (eventKey === 'Escape') {
            //     this.actions.updateValue(''); // clear value
            //     return;
            // }

            if (eventKey === 'Enter') {
                this.actions.createToken();
                return;
            }
        },
        handleFocus: (e) => {
            // this.props.onFocus(e);
        },
        handleBlur: (e) => {
            this.actions.createToken();
            // this.props.onBlur(e);
        },
        handlePaste: (e) => {
            e.preventDefault();
            const pastedText = e.clipboardData.getData('text');
            this.props.updateValue(pastedText);
            this.actions.createToken(pastedText);
        }
    }

    focus = () => {
        this.tokenCreator.input && this.tokenCreator.input.focus();
    }

    render() {
        const {
            placeholder,
            autoFocus,
            value,
        } = this.props;

        return (
            <div className={styles.autosizedWrapper}>
                <Autosized
                    ref={node => {
                        this.tokenCreator = node;
                    }}
                    placeholder={placeholder}
                    value={value}
                    autoFocus={autoFocus}
                    onFocus={this.actions.handleFocus}
                    onBlur={this.actions.handleBlur}
                    onChange={this.actions.handleChangeValue}
                    onKeyDown={this.actions.handleKeyDown}
                    onPaste={this.actions.handlePaste}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenCreator);

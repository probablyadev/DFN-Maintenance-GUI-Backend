/* eslint camelcase: 0, no-underscore-dangle: 0 */

import React from 'react';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import * as actionCreators from '../actions/auth';

function mapStateToProps(state) {
    return {
        isAuthenticating: state.auth.isAuthenticating,
        statusText: state.auth.statusText,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const Paper = styled.paper`
    marginTop: 50;
    paddingBottom: 50;
    paddingTop: 25;
    width: '100%';
    textAlign: 'center';
    display: 'inline-block';
`;

const RaisedButton = styled.raisedbutton`
    marginTop: 50;
`;

@connect(mapStateToProps, mapDispatchToProps)
export default class LoginView extends React.Component {
    constructor(props) {
        super(props);
        const redirectRoute = '/login';
        this.state = {
            username: '',
            password: '',
            password_error_text: null,
            redirectTo: redirectRoute,
            disabled: true,
        };
    }

    isDisabled() {
        let username_is_valid = false;
        let password_is_valid = false;

        if (this.state.email === '') {
            this.setState({
                username_error_text: null,
            });
        }
        else {
            username_is_valid = true;
        }

        if (this.state.password === '' || !this.state.password) {
            this.setState({
                password_error_text: null,
            });
        } else if (this.state.password.length >= 6) {
            password_is_valid = true;
            this.setState({
                password_error_text: null,
            });
        } else {
            this.setState({
                password_error_text: 'Your password must be at least 6 characters',
            });
        }

        if (username_is_valid && password_is_valid) {
            this.setState({
                disabled: false,
            });
        }
    }

    changeValue(e, type) {
        const value = e.target.value;
        const next_state = {};
        next_state[type] = value;
        this.setState(next_state, () => {
            this.isDisabled();
        });
    }

    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            if (!this.state.disabled) {
                this.login(e);
            }
            else if (this.state.username === '') {
                this.setState({
                    username_error_text: 'Username cannot be empty'
                })
            }
        }
    }

    login(e) {
        e.preventDefault();
        this.props.loginUser(this.state.username, this.state.password, this.state.redirectTo);
    }

    render() {
        return (
            <div className="col-md-6 col-md-offset-3" onKeyPress={(e) => this._handleKeyPress(e)}>
                <Paper>
                    <form role="form">
                        <div className="text-center">
                            <h2>Login to view protected content!</h2>
                            {
                                this.props.statusText &&
                                    <div className="alert alert-info">
                                        {this.props.statusText}
                                    </div>
                            }

                            <div className="col-md-12">
                                <TextField
                                  hintText="Username"
                                  floatingLabelText="Username"
                                  type="Username"
                                  errorText={this.state.username_error_text}
                                  onChange={(e) => this.changeValue(e, 'Username')}
                                />
                            </div>
                            <div className="col-md-12">
                                <TextField
                                  hintText="Password"
                                  floatingLabelText="Password"
                                  type="password"
                                  errorText={this.state.password_error_text}
                                  onChange={(e) => this.changeValue(e, 'password')}
                                />
                            </div>

                            <RaisedButton
                              disabled={this.state.disabled}
                              label="Submit"
                              onClick={(e) => this.login(e)}
                            />
                        </div>
                    </form>
                </Paper>
            </div>
        );

    }
}

LoginView.propTypes = {
    loginUser: React.PropTypes.func,
    statusText: React.PropTypes.string,
};

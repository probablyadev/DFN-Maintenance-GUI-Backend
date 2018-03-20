import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import APPCONFIG from 'constants/Config';
import QueueAnim from 'rc-queue-anim';
import * as actionCreators from '../../../actions/auth';
import {validateEmail} from '../../../utils/misc';

// TODO: Review if this is actually needed here
function mapStateToProps(state) {
    return {
        isAuthenticating: state.auth.isAuthenticating,
        statusText: state.auth.statusText
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            emailErrorText: '',
            passwordErrorText: '',
            disabled: true,
        };
    }

    isDisabled() {
        let emailIsValid = false;
        let passwordIsValid = false;

        if (this.state.email === '') {
            this.setState({
                emailErrorText: '',
            });
        } else if (validateEmail(this.state.email)) {
            emailIsValid = true;

            this.setState({
                emailErrorText: '',
            })
        } else {
            this.setState({
                emailErrorText: 'Your email must be a valid email address'
            })
        }

        if (this.state.password === '' || !this.state.password) {
            this.setState({
                passwordErrorText: null,
            });
        } else if (this.state.password.length >= 6) {
            passwordIsValid = true;

            this.setState({
                passwordErrorText: null,
            });
        } else {
            this.setState({
                passwordErrorText: 'Your password must be at least 6 characters',
            });
        }

        if (emailIsValid && passwordIsValid) {
            this.setState({
                disabled: false
            });
        } else if (!this.state.disabled) {
            this.setState({
                disabled: true
            });
        }
    }

    changeValue(e, type) {
        const value = e.target.value;
        const nextState = {};
        nextState[type] = value;

        this.setState(nextState, () => {
            this.isDisabled();
        });
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            if (!this.state.disabled) {
                this.login(e);
            } else if (this.state.email === '') {
                this.setState({
                    emailErrorText: 'Email cannot be empty'
                });
            } else if (this.state.password === '') {
                this.setState({
                    passwordErrorText: 'Password cannot be empty'
                });
            }
        }
    }

    login(e) {
        e.preventDefault();

        this.props.loginUser(this.state.email, this.state.password);
    }

    render() {
        return (
            <div className="body-inner" onKeyPress={(e) => this.handleKeyPress(e)}>
                <div className="card bg-white">
                    <div className="card-content">

                        <section className="logo text-center">
                            <h1><a href="#/">{APPCONFIG.brandLong}</a></h1>
                            <h2><a href="#/">Hostname</a></h2>
                        </section>

                        <form className="form-horizontal">
                            <fieldset>
                                <div className="form-group">
                                    <TextField
                                        floatingLabelText="Email"
                                        type="email"
                                        errorText={this.state.emailErrorText}
                                        onChange={(e) => this.changeValue(e, 'email')}
                                        fullWidth
                                    />
                                </div>
                                <div className="form-group">
                                    <TextField
                                        floatingLabelText="Password"
                                        type="password"
                                        errorText={this.state.passwordErrorText}
                                        onChange={(e) => this.changeValue(e, 'password')}
                                        fullWidth
                                    />
                                </div>
                            </fieldset>
                        </form>
                    </div>
                    <div className="card-action no-border text-right">
                        <RaisedButton
                            disabled={this.state.disabled}
                            label="Login"
                            onClick={(e) => this.login(e)}
                        />
                    </div>
                </div>

                <div className="additional-info">
                    <a href="#/sign-up">Sign up</a>
                    <span className="divider-h"/>
                    <a href="#/forgot-password">Forgot your password?</a>
                </div>

            </div>
        );
    }
}

const Page = () => (
    <div className="page-login">
        <div className="main-body">
            <QueueAnim type="bottom" className="ui-animate">
                <div key="1">
                    <Login/>
                </div>
            </QueueAnim>
        </div>
    </div>
);

module.exports = Page;

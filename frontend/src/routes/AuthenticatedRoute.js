// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom'
import {isValidToken} from '../utils/misc';
import * as actionCreators from '../actions/auth';

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        userName: state.auth.userName,
        isAuthenticated: state.auth.isAuthenticated,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class AuthenticatedRoute extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loadedIfNeeded: false
        };
    }

    checkAuth() {
        if (!this.props.isAuthenticated) {
            const token = localStorage.getItem('token');

            if (token) {
                this.props.loginUserRequest();

                isValidToken(JSON.stringify({token}))
                    .then(response => {
                        if (response.status === 200) {
                            this.props.loginUserSuccess(token);

                            this.setState({
                                loadedIfNeeded: true,
                            });
                        } else {
                            this.props.loginUserFailure({
                                response: {
                                    status: 403,
                                    statusText: 'Invalid token'
                                }
                            });
                        }
                    })
                    .catch(error => {
                        this.props.loginUserFailure({
                            response: {
                                status: 403,
                                statusText: 'Failure while verifying user token',
                            }
                        });
                    });
            }
        } else {
            this.setState({
                loadedIfNeeded: true,
            });
        }
    }

    render() {
        this.checkAuth();

        return (
            <Route
                {...this.props}
                render={(props) =>
                    this.state.loadedIfNeeded ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
                    )
                }
            />
        );
    }
}

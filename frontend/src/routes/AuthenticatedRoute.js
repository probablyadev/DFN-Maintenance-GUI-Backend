import React from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom'

import * as actionCreators from '../actions/auth';
import UserAPIService from '../utils/api/UserAPIService';

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

    componentDidMount() {
        this.checkAuth();
    }

    checkAuth() {
        if (!this.props.isAuthenticated) {
            const token = localStorage.getItem('token');

            if (token) {
                this.props.loginUserRequest();

                UserAPIService.isTokenValid(token)
                    .then(response => {
                        if (response.valid) {
                            this.props.loginUserSuccess(token);

                            this.setState({
                                loadedIfNeeded: true
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
                                statusText: 'Failure while verifying user token'
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
        return (
            this.state.loadedIfNeeded
                ? <Route {...this.props}/>
                : <Redirect to={{pathname: '/login', state: {from: this.props.location}}}/>
        );
    }
}

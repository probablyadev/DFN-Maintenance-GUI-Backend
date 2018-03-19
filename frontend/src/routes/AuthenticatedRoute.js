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
            loadedIfNeeded: false,
            isLoading: true
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
                        if (response.data.valid) {
                            this.props.loginUserSuccess(this.props.userName, token);

                            this.setState({
                                loadedIfNeeded: true,
                                isLoading: false
                            });
                        } else {
                            this.props.loginUserFailure({
                                response: {
                                    status: 403,
                                    statusText: 'Invalid token'
                                }
                            });

                            this.setState({
                                isLoading: false
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

                        this.setState({
                            isLoading: false
                        });
                    });
            } else {
                this.setState({
                    isLoading: false
                });
            }
        } else {
            this.setState({
                loadedIfNeeded: true,
                isLoading: false
            });
        }
    }

    render() {
        if (this.state.isLoading)
            return null;

        return (
            this.state.loadedIfNeeded
                ? <Route {...this.props}/>
                : <Redirect to={{pathname: '/login', state: {from: this.props.location}}}/>
        );
    }
}

import React from 'react'
import {connect, bindActionCreators} from 'react-redux';
import {Redirect, Route} from 'react-router-dom'

import {checkAuth} from "../constants/ActionTypes";

function mapStateToProps(state) {
    return {
        isAuthenticated: checkAuthSelector(state).isAuthenticated,
        loading: checkAuthSelector(state).loading,
    };
}

function mapDispatchToProps(dispatch) {
        return bindActionCreators(checkAuth, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class AuthenticatedRoute extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.checkAuth();
    }

    render() {
        if (this.props.loading)
            return null;

        return (
            this.props.isAuthenticated
                ? <Route {...this.props}/>
                : <Redirect to={{pathname: '/login', state: {from: this.props.location}}}/>
        );
    }
}

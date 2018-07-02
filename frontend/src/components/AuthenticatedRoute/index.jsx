import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { checkAuth } from '../../constants/ActionTypes';
import { checkAuthSelector } from '../../selectors/auth';

function mapStateToProps(state) {
    return {
        isAuthenticated: checkAuthSelector(state).isAuthenticated,
        loading: checkAuthSelector(state).loading
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ checkAuth }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
class AuthenticatedRoute extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.checkAuth();
    }

    render() {
        if (this.props.loading || !this.props.isAuthenticated) {
            return null;
        }

        return (
            <Route {...this.props} />
        );
    }
}

export default AuthenticatedRoute;

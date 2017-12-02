import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import * as actionCreators from '../../actions/auth';

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
export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    dispatchNewRoute(route) {
        browserHistory.push(route);
    }

    logout(e) {
        e.preventDefault();
        this.props.logoutAndRedirect();
    }

    render() {
        return (
            <header>
                <AppBar
                    title="Desert Fireball Maintenance GUI"
                    iconElementRight={
                        !this.props.isAuthenticated ?
                            <FlatButton label="Login" onClick={() => this.dispatchNewRoute('/login')}/>
                            :
                            <FlatButton label="Logout" onClick={(e) => this.logout(e)}/>
                    }
                />
            </header>
        );
    }
}

Header.propTypes = {
    logoutAndRedirect: React.PropTypes.func,
    isAuthenticated: React.PropTypes.bool,
};

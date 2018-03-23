import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import AccountCircleIcon from 'material-ui/svg-icons/action/account-circle';
import ForwardIcon from 'material-ui/svg-icons/content/forward';

import {logout} from '../../actions/auth';

const ListItem = styled.li`
    margin-right: 10px;
`;

const iconButtonStyle = {
    width: '60px',
    height: '60px',
    paddingTop: '20px'
};

const StyledMenuItem = styled(MenuItem)`
    font-size: 14px;
    line-height: 48px;
`;

const listItemStyle = {
    paddingLeft: '50px'
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({logout}, dispatch);
}

@connect(null, mapDispatchToProps)
class NavRightList extends React.Component {
    constructor(props) {
        super(props);

        this.redirectToProfile = this.redirectToProfile.bind(this);
        this.logout = this.logout.bind(this);
    }

    redirectToProfile() {
        this.props.history.push('/app/profile');
    }

    logout() {
        this.props.logout();
    }

    render() {
        return (
            <ul className="list-unstyled float-right">
                <ListItem>
                    <IconMenu
                        iconButtonElement={<IconButton style={iconButtonStyle}><MoreVertIcon/></IconButton>}
                        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                        menuStyle={{minWidth: '150px'}}
                    >
                        <StyledMenuItem
                            primaryText="Log Out"
                            innerDivStyle={listItemStyle}
                            leftIcon={<ForwardIcon/>}
                            onClick={this.logout}
                        />
                    </IconMenu>
                </ListItem>
            </ul>
        );
    }
}

module.exports = withRouter(NavRightList);

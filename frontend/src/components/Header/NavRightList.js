import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';
import {Menu, MenuItem} from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';
import ForwardIcon from 'material-ui-icons/Forward';

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
                    <Menu
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
                    </Menu>
                </ListItem>
            </ul>
        );
    }
}

module.exports = withRouter(NavRightList);

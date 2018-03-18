import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import AccountCircleIcon from 'material-ui/svg-icons/action/account-circle';
import ForwardIcon from 'material-ui/svg-icons/content/forward';
import {withRouter} from 'react-router-dom';

const iconButtonStyle = {
    width: '60px',
    height: '60px',
    paddingTop: '20px'
};

const menuItemStyle = {
    fontSize: '14px',
    lineHeight: '48px'
};

const listItemStyle = {
    paddingLeft: '50px' // Align with sub list.
};

class NavRightList extends React.Component {
    handleChange = (event, value) => {
        this.props.history.push(value);
    };

    render() {
        return (
            <ul className="list-unstyled float-right">
                <li style={{marginRight: '10px'}}>
                    <IconMenu
                        iconButtonElement={<IconButton style={iconButtonStyle}><MoreVertIcon/></IconButton>}
                        onChange={this.handleChange}
                        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                        menuStyle={{minWidth: '150px'}}
                    >
                        <MenuItem
                            value="/app/profile"
                            primaryText="Profile"
                            style={menuItemStyle}
                            innerDivStyle={listItemStyle}
                            leftIcon={<AccountCircleIcon/>}
                        />
                        <MenuItem
                            value="/login"
                            primaryText="Log Out"
                            style={menuItemStyle}
                            innerDivStyle={listItemStyle}
                            leftIcon={<ForwardIcon/>}
                        />
                    </IconMenu>
                </li>
            </ul>
        );
    }
}

module.exports = withRouter(NavRightList);

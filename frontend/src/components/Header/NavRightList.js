import React from 'react';
import styled from 'styled-components';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import AccountCircleIcon from 'material-ui/svg-icons/action/account-circle';
import ForwardIcon from 'material-ui/svg-icons/content/forward';
import { withRouter } from 'react-router-dom';

const StyledListItem = styled.li`
	marginRight: 10px;
`;

const StyledMenuItem = styled(MenuItem)`
	fontSize: 14px;
	lineHeight: 48px;
`;

const StyledIconButton = styled(IconButton)`
	width: 60px;
	height: 60px;
`;

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
                <StyledListItem>
                    <IconMenu
                        iconButtonElement={
                            <StyledIconButton style={{paddingTop: '18px'}}>
                                <MoreVertIcon />
                            </StyledIconButton>
                        }
                        onChange={this.handleChange}
                        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                        menuStyle={{minWidth: '150px'}}
                    >
                        <StyledMenuItem
                            value="/app/profile"
                            primaryText="Profile"
                            innerDivStyle={listItemStyle}
                            leftIcon={<AccountCircleIcon />}
                        />
                        <StyledMenuItem
                            value="/login"
                            primaryText="Log Out"
                            innerDivStyle={listItemStyle}
                            leftIcon={<ForwardIcon />}
                        />
                    </IconMenu>
                </StyledListItem>
            </ul>
        );
    }
}

module.exports = withRouter(NavRightList);

import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import { withRouter } from 'react-router-dom';
import Divider from 'material-ui/Divider';

const HeaderIconButtonStyle = {
  width: '60px',
  height: '60px'
};

const listItemStyle = {
  paddingLeft: '40px' // 36 + 16, algin with sub list
};

class NavLeftList extends React.Component {

  handleChange = (event, value) => {
    this.props.history.push(value);
  }

  render() {
    return (
      <ul className="list-unstyled list-inline">
        <li className="list-inline-item">
          <IconMenu
            iconButtonElement={<IconButton
              style={HeaderIconButtonStyle}
              className="md-button header-btn">
              <i className="material-icons">notifications_none</i>
              <span className="badge">3</span>
            </IconButton>}
            onChange={this.handleChange}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            menuStyle={{minWidth: '250px'}}
                    >
            <MenuItem
              className="header-icon-dropdown-item"
              leftIcon={<i className="material-icons">mail_outline</i>}
              primaryText="New mail from Susan"
              secondaryText={<span className="text-muted">5min ago</span>}
                        />
            <MenuItem
              className="header-icon-dropdown-item"
              leftIcon={<i className="material-icons">mail_outline</i>}
              primaryText="New mail from John"
              secondaryText={<span className="text-muted">1h ago</span>}
                        />
            <Divider />
            <MenuItem
              className="header-icon-dropdown-item"
              leftIcon={<i className="material-icons">chat_bubble_outline</i>}
              primaryText="Message from Anna"
              secondaryText={<span className="text-muted">5min ago</span>}
                        />
            <MenuItem
              className="header-icon-dropdown-item"
              leftIcon={<i className="material-icons">chat_bubble_outline</i>}
              primaryText="Message from Jane"
              secondaryText={<span className="text-muted">1h ago</span>}
                        />
            <Divider />
            <MenuItem
              className="header-icon-dropdown-item"
              leftIcon={<i className="material-icons">notifications_none</i>}
              primaryText="Copy task completed"
                        />
          </IconMenu>
        </li>
      </ul>
    );
  }
}

module.exports = withRouter(NavLeftList);

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import classNames from 'classnames';
import { Manager, Popper, Target } from 'react-popper';
import { withStyles } from 'material-ui/styles';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';
import Grow from 'material-ui/transitions/Grow';
import Paper from 'material-ui/Paper';
import { MenuItem, MenuList } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui-icons/MoreVert';

import { logout } from '../../actions/auth';

const styles = () => ({
    popperClose: {
        pointerEvents: 'none'
    }
});

const StyledIconButton = styled(IconButton)`
    height: inherit !important;
    padding-top: 18px !important;
    padding-bottom: 18px !important;
`;

const StyledMenuList = styled(MenuList)`
    height: inherit;
`;

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ logout }, dispatch);
}

@connect(null, mapDispatchToProps)
class NavRightList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        this.handleToggle = this.handleToggle.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleToggle() {
        this.setState({ open: !this.state.open });
    }

    handleClose() {
        this.setState({ open: false });
    }

    handleLogout() {
        this.props.logout();
    }

    render() {
        const { classes } = this.props;
        const { open } = this.state;

        return (
            <Manager>
                <Target>
                    <div ref={(node) => {
                        this.target = node;
                    }}
                    >
                        <StyledIconButton
                            aria-owns={open ? 'menu-list-grow' : null}
                            aria-haspopup='true'
                            onClick={this.handleToggle}
                        >
                            <MoreVertIcon />
                        </StyledIconButton>
                    </div>
                </Target>
                <Popper
                    placement='bottom-start'
                    eventsEnabled={open}
                    className={classNames({ [classes.popperClose]: !open })}
                >
                    <ClickAwayListener onClickAway={this.handleClose}>
                        <Grow in={open} id='menu-list-grow' style={{ transformOrigin: '0 0 0' }}>
                            <Paper>
                                <StyledMenuList role='menu'>
                                    <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                                </StyledMenuList>
                            </Paper>
                        </Grow>
                    </ClickAwayListener>
                </Popper>
            </Manager>
        );
    }
}

export default withStyles(styles)(NavRightList);

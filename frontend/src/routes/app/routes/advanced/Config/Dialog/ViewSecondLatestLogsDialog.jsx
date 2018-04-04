import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';

import { secondLatestLog } from '../../../../../../actions/api';
import {
    secondLatestLogFileSelector,
    secondLatestLogTimestampSelector
} from '../../../../../../selectors/api';

const StyledAppBar = styled(AppBar)`
    position: relative;
`;

const StyledTypography = styled(Typography)`
    flex: 1;
`;

function Transition(props) {
    return <Slide direction='up' {...props} />;
}

function mapStateToProps(state) {
    return {
        logfile: secondLatestLogFileSelector(state),
        timestamp: secondLatestLogTimestampSelector(state)
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ secondLatestLog }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
class ViewSecondLatestLogsDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        this.props.secondLatestLog();
    }

    handleOpen() {
        this.setState({ open: true });
    }

    handleClose() {
        this.setState({ open: false });
    }

    render() {
        return (
            <div>
                <Button
                    variant='raised'
                    style={this.props.minWidthStyle}
                    onClick={this.handleOpen}
                >
                    View Second /latest Logs
                </Button>
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    transition={Transition}
                >
                    <StyledAppBar>
                        <Toolbar>
                            <IconButton
                                color='inherit'
                                onClick={this.handleClose}
                                aria-label='Close'
                            >
                                <CloseIcon />
                            </IconButton>
                            <StyledTypography variant='title' color='inherit'>
                              Second Latest Logs
                            </StyledTypography>
                            <Typography variant='title' color='inherit'>
                                {this.props.timestamp}
                            </Typography>
                        </Toolbar>
                    </StyledAppBar>
                    <div>
                        {this.props.logfile.split('\n')
                            .map((item, key) => <span key={key}>{item}<br /></span>)
                        }
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default ViewSecondLatestLogsDialog;

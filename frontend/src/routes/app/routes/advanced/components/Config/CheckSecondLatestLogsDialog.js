import React from 'react';
import Dialog from 'material-ui/Dialog';
import Button from 'material-ui/Button';

class EditConfigDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
    }

    /* TODO: Send off an event to the backend to turn all off or on */

    /* TODO: Add message to the content of the dialog. Maybe display the command that will be executed. Live updates in dialog? */
    render() {
        const actions = [
            <Button
                label="Close"
                primary={true}
                onClick={this.handleClose}
            />,
        ];

        return (
            <div>
                <Button
                    variant="raised"
                    style={this.props.minWidthStyle}
                    label="Check Second /latest Logs"
                    onClick={this.handleOpen}
                    primary/>
                <Dialog
                    title="Check the second latest log files in /latest"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                </Dialog>
            </div>
        );
    }
}

export default EditConfigDialog;

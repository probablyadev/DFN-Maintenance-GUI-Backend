import React from 'react';
import Dialog from 'material-ui/Dialog';
import Button from 'material-ui/Button';

import ConfigTable from './ConfigTable';

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
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <Button
                label="Save"
                primary={true}
                onClick={this.handleClose}
            />,
        ];

        return (
            <div>
                <Button
                    variant="raised"
                    style={this.props.minWidthStyle}
                    label="Edit Config File"
                    onClick={this.handleOpen}
                    primary/>
                <Dialog
                    title="Edit Configuration File"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <ConfigTable/>
                </Dialog>
            </div>
        );
    }
}

export default EditConfigDialog;

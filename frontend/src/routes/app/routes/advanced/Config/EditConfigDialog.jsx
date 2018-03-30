import React from 'react';
import Button from 'material-ui/Button';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';

import ConfigTable from './ConfigTable';

class EditConfigDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleOpen() {
        this.setState({ open: true });
    }

    handleClose() {
        this.setState({ open: false });
    }

    /* TODO: Send off an event to the backend to turn all off or on */

    /* TODO: Add message to the content of the dialog.
     * Maybe display the command that will be executed.
     * Live updates in dialog?
     */
    render() {
        return (
            <div>
                <Button
                    variant='raised'
                    style={this.props.minWidthStyle}
                    onClick={this.handleOpen}
                >
                    Edit Config File
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby='form-dialog-title'
                >
                    <DialogTitle id='form-dialog-title'>Edit Configuration File</DialogTitle>
                    <DialogContent>
                        <ConfigTable />
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default EditConfigDialog;

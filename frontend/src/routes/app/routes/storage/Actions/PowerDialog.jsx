import React from 'react';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';

class PowerDialog extends React.Component {
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
            <div className={this.props.className}>
                <Button
                    variant='raised'
                    onClick={this.handleOpen}
                >
                    Power
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle id='form-dialog-title'>
                        Power On / Off All Hard Drives
                    </DialogTitle>
                    <DialogContent>
                        <div>PLACEHOLDER</div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={this.handleClose}>
                            Power On
                        </Button>
                        <Button onClick={this.handleClose}>
                            Power Off
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default PowerDialog;

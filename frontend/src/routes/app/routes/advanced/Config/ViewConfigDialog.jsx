import React from 'react';
import Button from 'material-ui/Button';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';

import ViewConfigTable from './ViewConfigTable';

class ViewConfigDialog extends React.Component {
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

    render() {
        return (
            <div>
                <Button
                    variant='raised'
                    style={this.props.minWidthStyle}
                    onClick={this.handleOpen}
                >
                    View Config File
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby='form-dialog-title'
                >
                    <DialogTitle id='form-dialog-title'>View Configuration File</DialogTitle>
                    <DialogContent>
                        <ViewConfigTable />
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default ViewConfigDialog;

import React from 'react';
import Dialog from 'material-ui/Dialog';
import Button from 'material-ui/Button';

class MountDialog extends React.Component {
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
                label="Mount Drives"
                primary={true}
                onClick={this.handleClose}
            />,
            <Button
                label="Unmount Drives"
                primary={true}
                onClick={this.handleClose}
            />,
        ];

        return (
            <div className={this.props.className}>
                <Button
                    variant="raised"
                    label="Mount"
                    onClick={this.handleOpen}/>
                <Dialog
                    title="Mount / Unmount All Hard Drives"
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

export default MountDialog;

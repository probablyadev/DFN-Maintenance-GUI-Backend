import React from 'react';
import Dialog from 'material-ui/Dialog';
import Button from 'material-ui/Button';

class PowerDialog extends React.Component {
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
                label="Power On"
                primary={true}
                onClick={this.handleClose}
            />,
            <Button
                label="Power Off"
                primary={true}
                onClick={this.handleClose}
            />,
        ];

        return (
            <div className={this.props.className}>
                <Button
                    variant="raised"
                    label="Power"
                    onClick={this.handleOpen}/>
                <Dialog
                    title="Power On / Off All Hard Drives"
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

export default PowerDialog;

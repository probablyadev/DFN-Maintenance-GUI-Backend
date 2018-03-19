import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class MountDialog extends React.Component {
    handleOpen = () => {
        this.setState({open: true});
    };
    handleClose = () => {
        this.setState({open: false});
    };

    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
    }

    /* TODO: Send off an event to the backend to turn all off or on */

    /* TODO: Add message to the content of the dialog. Maybe display the command that will be executed. Live updates in dialog? */
    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Mount Drives"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Unmount Drives"
                primary={true}
                onClick={this.handleClose}
            />,
        ];

        return (
            <div className={this.props.className}>
                <RaisedButton label="Mount" onClick={this.handleOpen}/>
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

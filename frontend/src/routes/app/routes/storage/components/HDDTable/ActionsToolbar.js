import React from 'react';
import PowerDialog from './PowerDialog';
import MountDialog from './MountDialog';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

class ActionsToolbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Toolbar>
                <ToolbarGroup>
                    <ToolbarTitle text="Actions"/>

                    <ToolbarSeparator/>
                    <FontIcon className="muidocs-icon-custom-sort"/>

                    <ToolbarSeparator/>
                    <PowerDialog/>

                    <ToolbarSeparator/>
                    <MountDialog/>
                </ToolbarGroup>

                <ToolbarGroup>
                    <RaisedButton label="Format Drives"/>
                    <RaisedButton label="Transfer /data0"/>
                    <RaisedButton label="Run Smart Test"/>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}

export default ActionsToolbar;

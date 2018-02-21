import React from 'react';
import PowerDialog from './PowerDialog';
import MountDialog from './MountDialog';
import FontIcon from 'material-ui/FontIcon';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

class ActionsToolbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Toolbar>
                <ToolbarGroup>
                    <ToolbarTitle text="Options"/>

                    <ToolbarSeparator/>
                    <FontIcon className="muidocs-icon-custom-sort" />

                    <ToolbarSeparator/>
                    <PowerDialog/>

                    <ToolbarSeparator/>
                    <MountDialog/>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}

export default ActionsToolbar;

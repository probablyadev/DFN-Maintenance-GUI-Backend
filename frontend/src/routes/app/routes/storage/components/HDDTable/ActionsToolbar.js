import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

class ActionsToolbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Toolbar>
                <ToolbarGroup firstChild>
                    <DropDownMenu>
                        <MenuItem primaryText="Power On"/>
                        <MenuItem primaryText="Power Off"/>
                    </DropDownMenu>
                </ToolbarGroup>
                <ToolbarGroup>
                    <DropDownMenu>
                        <MenuItem primaryText="Mount"/>
                        <MenuItem primaryText="Unmount"/>
                    </DropDownMenu>
                </ToolbarGroup>

                <ToolbarSeparator/>

                <ToolbarGroup>
                    <RaisedButton label="Format Drives"/>
                    <RaisedButton label="Transfer /data0"/>
                    <RaisedButton label="Smart Test"/>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}

export default ActionsToolbar;

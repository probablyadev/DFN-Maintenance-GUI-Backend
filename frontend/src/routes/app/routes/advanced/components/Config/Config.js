import React from 'react';
import EditConfigDialog from './EditConfigDialog';
import CheckLatestLogsDialog from './CheckLatestLogsDialog';
import CheckSecondLatestLogsDialog from './CheckSecondLatestLogsDialog';

const minWidthStyle = {
  minWidth: '135px'
};

class Config extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-xl-12">

                    <div className="box box-default">
                        <div className="box-header">Config</div>
                        <div className="box-body text-center">
                            <EditConfigDialog minWidthStyle={minWidthStyle}/>
                            <div className="divider"/>

                            <CheckLatestLogsDialog minWidthStyle={minWidthStyle}/>
                            <div className="divider"/>

                            <CheckSecondLatestLogsDialog minWidthStyle={minWidthStyle}/>
                            <div className="divider"/>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

module.exports = Config;

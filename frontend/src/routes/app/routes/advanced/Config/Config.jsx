import React from 'react';

import ViewConfigDialog from './Dialog/ViewConfigDialog';
import EditConfigDialog from './Dialog/EditConfigDialog';
import ViewLatestLogsDialog from './Dialog/ViewLatestLogsDialog';
import ViewSecondLatestLogsDialog from './Dialog/ViewSecondLatestLogsDialog';

const minWidthStyle = {
    minWidth: '135px'
};

const Config = () => (
    <div className='row'>
        <div className='col-xl-12'>

            <div className='box box-default'>
                <div className='box-header'>Config</div>
                <div className='box-body text-center'>
                    <ViewConfigDialog minWidthStyle={minWidthStyle} />
                    <div className='divider' />

                    <EditConfigDialog minWidthStyle={minWidthStyle} />
                    <div className='divider' />

                    <ViewLatestLogsDialog minWidthStyle={minWidthStyle} />
                    <div className='divider' />

                    <ViewSecondLatestLogsDialog minWidthStyle={minWidthStyle} />
                    <div className='divider' />
                </div>
            </div>

        </div>
    </div>
);

export default Config;

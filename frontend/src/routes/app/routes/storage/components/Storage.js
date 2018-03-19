import React from 'react';
import QueueAnim from 'rc-queue-anim';
import StatusPanel from './StatusPanel';
import HDDChart from './HDDChart';
import HDDTable from './HDDTable';

class Storage extends React.Component {
    render() {
        return (
            <div className="container-fluid with-maxwidth no-breadcrumbs page-dashboard">
                <QueueAnim type="bottom" className="ui-animate">
                    <div key="1"><StatusPanel/></div>
                    <div key="2"><HDDChart/></div>
                    <div key="3"><HDDTable/></div>
                </QueueAnim>
            </div>
        );
    }
}

module.exports = Storage;

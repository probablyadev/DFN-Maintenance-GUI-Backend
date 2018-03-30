import React from 'react';

const StatusPanel = () => (
    <div className='box box-default'>
        <div className='box-body'>
            <div className='row'>
                <div className='col-xl-12'>

                    <div className='box box-transparent'>
                        <div className='box-header'>Status Panel</div>
                        <div className='box-body'>
                            <div className='row text-center metrics'>
                                <div className='col-xs-4 col-md-4 metric-box'>
                                    <span className='metric'>4</span>
                                    <span className='metric-info'>Hard Drives</span>
                                </div>
                                <div className='col-xs-4 col-md-4 metric-box'>
                                    <span className='metric'>5GB</span>
                                    <span className='metric-info'>Total Space</span>
                                </div>
                                <div className='col-xs-4 col-md-4 metric-box'>
                                    <span className='metric'>3GB</span>
                                    <span className='metric-info'>Used Space</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
);

export default StatusPanel;

import React from 'react';

import TimezonePicker from './TimezonePicker';

const Map = () => (
    <article className='article'>
        <h2 className='article-title'>Maps</h2>

        <div className='row'>
            <div className='col-xl-12'>
                <div className='box box-default'>
                    <div className='box-header'>Timezone Picker</div>
                    <div className='box-body'>
                        <TimezonePicker
                            defaultValue='Australia/Perth'
                            inputProps={{
                                placeholder: 'Select Timezone...',
                                name: 'timezone'
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>

    </article>
);

export default Map;

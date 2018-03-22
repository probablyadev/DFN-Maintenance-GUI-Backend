import React from 'react';
import LocationMap from './LocationMap';
import TimezonePicker from './TimezonePicker';

class Map extends React.Component {
    render() {
        return (
            <article className="article">
                <h2 className="article-title">Maps</h2>
                <div className="row">
                    <div className="col-xl-12">
                        <div className="box box-default">
                            <div className="box-header">Timezone Picker</div>
                            <div className="box-body">
                                <TimezonePicker
                                    defaultValue="Australia/Perth"
                                    inputProps={{
                                        placeholder: 'Select Timezone...',
                                        name: 'timezone',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xl-12">
                        <div className="box box-default">
                            <div className="box-header">Location Map</div>
                            <div className="box-body">
                                <LocationMap/>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        );
    }
}

module.exports = Map;

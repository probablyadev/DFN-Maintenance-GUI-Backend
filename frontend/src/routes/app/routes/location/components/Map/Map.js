import React from 'react';
import LocationMap from './LocationMap';
import TimeZoneMap from './TimeZoneMap';

class Map extends React.Component {
    render() {
        return (
            <article className="article">
                <h2 className="article-title">Maps</h2>
                <div className="row">
                    <div className="col-xl-6">
                        <div className="box box-default">
                            <div className="box-body">
                                <LocationMap/>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="box box-default">
                            <div className="box-body">
                                <TimeZoneMap/>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        );
    }
}

module.exports = Map;

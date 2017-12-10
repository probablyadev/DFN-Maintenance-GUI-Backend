import React from 'react';
import { Route } from 'react-router-dom';

import Bar from './routes/bar/'
import Funnel from './routes/funnel/'
import Line from './routes/line/'
import More from './routes/more/'
import Pie from './routes/pie/'
import Radar from './routes/radar/'
import Scatter from './routes/scatter/'


const Chart = ({ match }) => (
  <div>
    <Route path={`${match.url}/bar`} component={Bar}/>
    <Route path={`${match.url}/funnel`} component={Funnel}/>
    <Route path={`${match.url}/line`} component={Line}/>
    <Route path={`${match.url}/more`} component={More}/>
    <Route path={`${match.url}/pie`} component={Pie}/>
    <Route path={`${match.url}/radar`} component={Radar}/>
    <Route path={`${match.url}/scatter`} component={Scatter}/>
  </div>
)

export default Chart;

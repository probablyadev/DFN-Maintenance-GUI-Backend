import React from 'react';
import { Route } from 'react-router-dom';

import Centered from './routes/centered/'
import FullWidth from './routes/full-width/'


const PageLayout = ({ match }) => (
  <div>
    <Route path={`${match.url}/centered`} component={Centered}/>
    <Route path={`${match.url}/full-width`} component={FullWidth}/>
  </div>
)

export default PageLayout;

import React from 'react';
import { Route } from 'react-router-dom';

import Components from './routes/components/'
import Layouts from './routes/layouts/'
import Steppers from './routes/steppers/'


const Form = ({ match }) => (
  <div>
    <Route path={`${match.url}/components`} component={Components}/>
    <Route path={`${match.url}/layouts`} component={Layouts}/>
    <Route path={`${match.url}/steppers`} component={Steppers}/>
  </div>
)

export default Form;

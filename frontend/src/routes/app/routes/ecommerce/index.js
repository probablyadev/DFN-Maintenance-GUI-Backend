import React from 'react';
import { Route } from 'react-router-dom';

import HorizontalProducts from './routes/horizontal-products/'
import Invoice from './routes/invoice/'
import Products from './routes/products/'


const ECommerce = ({ match }) => (
  <div>
    <Route path={`${match.url}/horizontal-products`} component={HorizontalProducts}/>
    <Route path={`${match.url}/invoice`} component={Invoice}/>
    <Route path={`${match.url}/products`} component={Products}/>
  </div>
)

export default ECommerce;

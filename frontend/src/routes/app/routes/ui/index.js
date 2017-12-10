import React from 'react';
import { Route } from 'react-router-dom';

import Boxes from './routes/boxes/'
import Buttons from './routes/buttons/'
import CallToActions from './routes/call-to-actions/'
import Cards from './routes/cards/'
import Colors from './routes/colors/'
import Components from './routes/components/'
import FeatureCallouts from './routes/feature-callouts/'
import Grids from './routes/grids/'
import Hover from './routes/hover/'
import IconBoxes from './routes/icon-boxes/'
import Icons from './routes/icons/'
import Lists from './routes/lists/'
import Menus from './routes/menus/'
import PricingTables from './routes/pricing-tables/'
import Sashes from './routes/sashes/'
import Testimonials from './routes/testimonials/'
import Timeline from './routes/timeline/'
import Typography from './routes/typography/'


const UI = ({ match }) => (
  <div>
    <Route path={`${match.url}/boxes`} component={Boxes}/>
    <Route path={`${match.url}/buttons`} component={Buttons}/>
    <Route path={`${match.url}/call-to-actions`} component={CallToActions}/>
    <Route path={`${match.url}/cards`} component={Cards}/>
    <Route path={`${match.url}/colors`} component={Colors}/>
    <Route path={`${match.url}/components`} component={Components}/>
    <Route path={`${match.url}/feature-callouts`} component={FeatureCallouts}/>
    <Route path={`${match.url}/grids`} component={Grids}/>
    <Route path={`${match.url}/hover`} component={Hover}/>
    <Route path={`${match.url}/icon-boxes`} component={IconBoxes}/>
    <Route path={`${match.url}/icons`} component={Icons}/>
    <Route path={`${match.url}/lists`} component={Lists}/>
    <Route path={`${match.url}/menus`} component={Menus}/>
    <Route path={`${match.url}/pricing-tables`} component={PricingTables}/>
    <Route path={`${match.url}/sashes`} component={Sashes}/>
    <Route path={`${match.url}/testimonials`} component={Testimonials}/>
    <Route path={`${match.url}/timeline`} component={Timeline}/>
    <Route path={`${match.url}/typography`} component={Typography}/>
  </div>
)

export default UI;


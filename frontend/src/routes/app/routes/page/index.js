import React from 'react';
import { Route } from 'react-router-dom';

import About from './routes/about/'
import Blog from './routes/blog/'
import Careers from './routes/careers/'
import Contact from './routes/contact/'
import Faqs from './routes/faqs/'
import Services from './routes/services/'
import Terms from './routes/terms/'


const Page = ({ match }) => (
  <div>
    <Route path={`${match.url}/about`} component={About}/>
    <Route path={`${match.url}/blog`} component={Blog}/>
    <Route path={`${match.url}/careers`} component={Careers}/>
    <Route path={`${match.url}/contact`} component={Contact}/>
    <Route path={`${match.url}/faqs`} component={Faqs}/>
    <Route path={`${match.url}/services`} component={Services}/>
    <Route path={`${match.url}/terms`} component={Terms}/>
  </div>
)

export default Page;

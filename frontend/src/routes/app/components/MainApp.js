import React from 'react';
import { Route } from 'react-router-dom';
import loadable from 'react-loadable';
import Header from 'components/Header';
import Sidenav from 'components/Sidenav';
import Footer from 'components/Footer';
import Customizer from 'components/Customizer';

function LoadingComponent() {
  return <div></div>;
}

let AsyncDashboard = loadable({
  loader: () => import('../routes/dashboard/'),
  loading: LoadingComponent
});

let AsyncCamera = loadable({
  loader: () => import('../routes/camera/'),
  loading: LoadingComponent
});

let AsyncStorage = loadable({
  loader: () => import('../routes/storage/'),
  loading: LoadingComponent
});

let AsyncNetwork = loadable({
  loader: () => import('../routes/network/'),
  loading: LoadingComponent
});

let AsyncLocation = loadable({
  loader: () => import('../routes/location/'),
  loading: LoadingComponent
});

class MainApp extends React.Component {
  componentDidMount(){
    const ele = document.getElementById('ipl-progress-indicator');

    if(ele) {
      setTimeout(() => {
        ele.classList.add('available');
        setTimeout(() => {
          ele.outerHTML = '';
        }, 2000)
      }, 1000)
    }
  }

  render() {
    const { match, location } = this.props;

    return (
      <div className="main-app-container">
        <Sidenav />

        <section id="page-container" className="app-page-container">
          <Header />

          <div className="app-content-wrapper">
            <div className="app-content">
              <div className="full-height">
                  <Route path={`${match.url}/dashboard`} component={AsyncDashboard} />
                  <Route path={`${match.url}/camera`} component={AsyncCamera} />
                  <Route path={`${match.url}/storage`} component={AsyncStorage} />
                  <Route path={`${match.url}/network`} component={AsyncNetwork} />
                  <Route path={`${match.url}/location`} component={AsyncLocation} />
              </div>
            </div>

            <Footer />
          </div>
        </section>

        <Customizer />
      </div>
    );
  }
}

module.exports = MainApp;

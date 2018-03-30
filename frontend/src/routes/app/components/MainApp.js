import React from 'react';
import {Switch} from 'react-router-dom'
import AuthenticatedRoute from '../../AuthenticatedRoute';
import loadable from 'react-loadable';
import Header from 'components/Header';
import Sidenav from 'components/Sidenav';
import Footer from 'components/Footer';
import Customizer from 'components/Customizer';

function LoadingComponent() {
    return <div />;
}

const AsyncDashboard = loadable({
    loader: () => import('../routes/dashboard/'),
    loading: LoadingComponent
});

const AsyncCamera = loadable({
    loader: () => import('../routes/camera/'),
    loading: LoadingComponent
});

const AsyncStorage = loadable({
    loader: () => import('../routes/storage/'),
    loading: LoadingComponent
});

const AsyncNetwork = loadable({
    loader: () => import('../routes/network/'),
    loading: LoadingComponent
});

const AsyncLocation = loadable({
    loader: () => import('../routes/location/'),
    loading: LoadingComponent
});

const AsyncAdvanced = loadable({
    loader: () => import('../routes/advanced/'),
    loading: LoadingComponent
});

class MainApp extends React.Component {
    componentDidMount() {
        const ele = document.getElementById('ipl-progress-indicator');

        if (ele) {
            setTimeout(() => {
                ele.classList.add('available');
                setTimeout(() => {
                    ele.outerHTML = '';
                }, 2000)
            }, 1000)
        }
    }

    render() {
        const {match} = this.props;

        return (
            <div className='main-app-container'>
                <Sidenav />
                <section id='page-container' className='app-page-container'>
                    <Header />

                    <div className='app-content-wrapper'>
                        <div className='app-content'>
                            <div className='full-height'>
                                <Switch>
                                    <AuthenticatedRoute path={`${match.url}/dashboard`} component={AsyncDashboard} />
                                    <AuthenticatedRoute path={`${match.url}/camera`} component={AsyncCamera} />
                                    <AuthenticatedRoute path={`${match.url}/storage`} component={AsyncStorage} />
                                    <AuthenticatedRoute path={`${match.url}/network`} component={AsyncNetwork} />
                                    <AuthenticatedRoute path={`${match.url}/location`} component={AsyncLocation} />
                                    <AuthenticatedRoute path={`${match.url}/advanced`} component={AsyncAdvanced} />
                                </Switch>
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

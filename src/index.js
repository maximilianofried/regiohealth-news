import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {
    MatomoProvider,
    createInstance,
    useMatomo,
} from '@datapunt/matomo-tracker-react';
import App from './containers/App/App';
import store from './store';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './doc/scss/master.scss';
import 'font-awesome/css/font-awesome.min.css';
import 'swiper/swiper.scss';
import 'react-modal-video/scss/modal-video.scss';

const instance = createInstance({
    urlBase: 'https://analytics.gesundheitsticket.de',
    siteId: 2,
    trackerUrl: 'https://analytics.gesundheitsticket.de/matomo.php',
    userId: `user-${Math.floor(Math.random() * 10000) + 1}`,
});

ReactDOM.render(
    <MatomoProvider value={instance}>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </MatomoProvider>,

    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

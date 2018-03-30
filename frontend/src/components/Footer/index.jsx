import React from 'react';

import APPCONFIG from '../../constants/Config';

const Footer = () => (
    <section className='app-footer'>
        <div className='container-fluid'>
            <span className='float-left'>
                <span>
                    Copyright ©
                    <a
                        className='brand'
                        target='_blank'
                        href={APPCONFIG.productLink}
                    >
                        {APPCONFIG.brandLong}
                    </a>
                    {APPCONFIG.year}
                </span>
            </span>
            <span className='float-right'>
                <span>
                    Built with Love <i className='material-icons'>favorite_border</i>
                </span>
            </span>
        </div>
    </section>
);

export default Footer;

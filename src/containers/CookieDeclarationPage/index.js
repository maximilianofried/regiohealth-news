import React, { useEffect } from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import BannerSection from '../../components/BannerSection';
import Metadata from '../../components/Metadata';

const CookieDeclarationPage = ({ name }) => {
    const { trackPageView } = useMatomo();
    // Track page view
    useEffect(() => {
        trackPageView();
    }, []);

    return (
        <>
            <Metadata
                title={name}
                description={name}
                url={`${process.env.REACT_APP_BASE_PAGE_URL}/${name}`}
            />
            <div className="info_page">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="info_content">
                                <div id="cookiefirst-policy-page" />
                                <div>
                                    This cookie policy has been created and
                                    updated by{' '}
                                    <a href="https://cookiefirst.com">
                                        CookieFirst.com
                                    </a>
                                </div>

                                <div className="space-70" />

                                <div id="cookiefirst-cookies-table" />
                                <div>
                                    This cookie table has been created and
                                    updated by the{' '}
                                    <a href="https://cookiefirst.com">
                                        CookieFirst consent management platform
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BannerSection />
        </>
    );
};

export default CookieDeclarationPage;

import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import BreadCrumb from '../../components/BreadCrumb';
import BannerSection from '../../components/BannerSection';
import { fetchPage } from '../../store/actions';
import Metadata from '../../components/Metadata';

const CookieDeclarationPage = ({ fetchPage, page, name }) => {
    // useEffect(() => {
    //     const script = document.createElement('script');
    //     script.id = 'CookieDeclaration';
    //     script.src =
    //         'https://consent.cookiebot.com/8fa59645-db52-4940-913b-5e5a06a99e9f/cd.js';
    //     script.type = 'text/javascript';
    //     script.async = true;
    //     const div = document.getElementsByClassName('author_about')[0];
    //     div.appendChild(script);
    //     return () => {
    //         div.removeChild(script);
    //     };
    // }, []);
    return (
        <>
            <Metadata
                title={name}
                description={name}
                url={`${process.env.REACT_APP_BASE_PAGE_URL}/${name}`}
            />
            <div id="cookiefirst-policy-page" />
            <div>
                This cookie policy has been created and updated by{' '}
                <a href="https://cookiefirst.com">CookieFirst.com</a>.
            </div>

            <div className="space-70" />

            <div id="cookiefirst-cookies-table" />
            <div>
                This cookie table has been created and updated by the{' '}
                <a href="https://cookiefirst.com">
                    CookieFirst consent management platform
                </a>
                .
            </div>

            <BannerSection />
        </>
    );
};

export default CookieDeclarationPage;

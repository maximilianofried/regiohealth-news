import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import BreadCrumb from '../../components/BreadCrumb';
import BannerSection from '../../components/BannerSection';
import { fetchPage } from '../../store/actions';
import Metadata from '../../components/Metadata';

const CookieDeclarationPage = ({ fetchPage, page, name }) => {
    return (
        <>
            <Metadata
                title={name}
                description={name}
                url={`${process.env.REACT_APP_BASE_PAGE_URL}/${name}`}
            />
            <BreadCrumb className="shadow5" title={name}>
                <>
                    <div className="space-50" />
                    <div className="row">
                        <div className="col-12">
                            <div className="author_about">
                                <script
                                    id="CookieDeclaration"
                                    src="https://consent.cookiebot.com/8fa59645-db52-4940-913b-5e5a06a99e9f/cd.js"
                                    type="text/javascript"
                                    async
                                />
                            </div>
                        </div>
                    </div>
                </>
            </BreadCrumb>
            <div className="space-70" />
            <BannerSection />
        </>
    );
};

export default CookieDeclarationPage;

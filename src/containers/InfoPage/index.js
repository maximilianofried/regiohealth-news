import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import BreadCrumb from '../../components/BreadCrumb';
import BannerSection from '../../components/BannerSection';
import { fetchPage } from '../../store/actions';
import Metadata from '../../components/Metadata';

const InfoPage = ({ fetchPage, page, name }) => {
    useEffect(() => {
        fetchPage(name);
    }, []);

    const LinkRenderer = ({ href, children }) => {
        return (
            <a href={href} target="_blank">
                {children}
            </a>
        );
    };

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
                                {page && page.content && (
                                    <ReactMarkdown
                                        className="markdownContainer"
                                        renderers={{ link: LinkRenderer }}
                                        source={page.content}
                                    />
                                )}
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

const mapStateToProps = (state) => {
    return {
        page: (state.page && state.page.page && state.page.page[0]) || [],
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPage: (name) => dispatch(fetchPage({ name })),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoPage);

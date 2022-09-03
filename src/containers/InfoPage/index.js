import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import BreadCrumb from '../../components/BreadCrumb';
import BannerSection from '../../components/BannerSection';
import { fetchPage } from '../../store/actions';
import Metadata from '../../components/Metadata';

const InfoPage = ({ fetchPage, page, name }) => {
    useEffect(() => {
        fetchPage(name);
    }, [fetchPage, name]);
    return (
        <>
            <Metadata
                title={name}
                description={name}
                url={`${process.env.REACT_APP_BASE_PAGE_URL}/${name}`}
            />
            <BreadCrumb className="shadow5 info_page" title={name}>
                <>
                    <div className="space-10" />
                    <div className="row">
                        <div className="col-12">
                            <div className="info_content">
                                {page && page.content && (
                                    <div
                                        // eslint-disable-next-line react/no-danger
                                        dangerouslySetInnerHTML={{
                                            __html: page.content.replace(
                                                /href/g,
                                                "target='_blank' href"
                                            ),
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </>
            </BreadCrumb>
            {/* <BannerSection /> */}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        page: (state.page && state.page.page && state.page.page.data[0]) || [],
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPage: (name) => dispatch(fetchPage({ name })),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoPage);

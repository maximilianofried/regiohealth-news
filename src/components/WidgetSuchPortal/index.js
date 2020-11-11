import React, { Fragment, useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, Fade } from 'reactstrap';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Heading from '../uiStyle/Heading';

const WidgetTabPane = ({ nationalData, aId, id, type }) => {
    return (
        <Fade in={id === aId}>
            <div className="widget tab_widgets">
                {nationalData.slice(0, 6).map((item) => (
                    <Fragment key={item.id}>
                        <div
                            className={`single_post widgets_small ${
                                item.main_image ? '' : 'widgets_small_no_image'
                            }`}
                        >
                            {item.main_image && item.main_image.formats && (
                                <div className="post_img">
                                    <div className="img_wrap">
                                        <Link to={`/${type}/${item.id}`}>
                                            <img
                                                src={
                                                    process.env
                                                        .REACT_APP_CMS_URL +
                                                    item.main_image.formats
                                                        .thumbnail.url
                                                }
                                                alt="thumb"
                                            />
                                        </Link>
                                    </div>
                                </div>
                            )}
                            <div className="single_post_text">
                                <div className="meta2 meta_separator1">
                                    <Link to="/">
                                        {item &&
                                            item.categories.length > 0 &&
                                            item.categories[0].name}
                                    </Link>
                                    <Link to="/">
                                        {moment(item.createdAt).format('LL')}
                                    </Link>
                                </div>
                                <h4>
                                    <Link to={`/${type}/${item.id}`}>
                                        {item.title}
                                    </Link>
                                </h4>
                            </div>
                        </div>
                        <div className="space-15" />
                        <div className="border_white" />
                        <div className="space-15" />
                    </Fragment>
                ))}
            </div>
        </Fade>
    );
};

const WidgetSuchPortal = ({
    className,
    dark,
    nationalData,
    adsHome,
    fetchNationalData,
    fetchNationalDataCleanUp,
}) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };
    return (
        <div className={`widget_tab md-mt-30 ${className}`}>
            <Heading title="National News" />
            <Nav tabs>
                <NavItem>
                    <button
                        type="button"
                        className={classnames({
                            active: activeTab === '1',
                            btn: 'btn-sm',
                        })}
                        onClick={() => {
                            fetchNationalDataCleanUp();
                            toggle('1');
                            fetchNationalData({
                                limit: 6,
                                start: 0,
                                type: 'article',
                                responseType: 'mixed',
                                includeCountry: 'Germany',
                            });
                        }}
                    >
                        ARTICLES
                    </button>
                </NavItem>
                <NavItem>
                    <button
                        type="button"
                        className={classnames({
                            active: activeTab === '2',
                            btn: 'btn-sm',
                        })}
                        onClick={() => {
                            fetchNationalDataCleanUp();
                            toggle('2');
                            fetchNationalData({
                                limit: 6,
                                start: 0,
                                type: 'offer',
                                responseType: 'mixed',
                                includeCountry: 'Germany',
                            });
                        }}
                    >
                        OFFERS
                    </button>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <WidgetTabPane
                        nationalData={nationalData}
                        dark={dark}
                        aId={activeTab}
                        id="1"
                        type="article"
                    />
                </TabPane>
                <TabPane tabId="2">
                    <WidgetTabPane
                        nationalData={nationalData}
                        dark={dark}
                        aId={activeTab}
                        id="2"
                        type="offer"
                    />
                </TabPane>
            </TabContent>
            <div className="row">
                <div className="col-lg-12">
                    {adsHome && adsHome.length > 0 && (
                        <div className="banner2 mb30">
                            <a href={adsHome[0].link}>
                                <img
                                    src={
                                        process.env.REACT_APP_CMS_URL +
                                        adsHome[0].image[0].url
                                    }
                                    alt="thumb"
                                />
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WidgetSuchPortal;

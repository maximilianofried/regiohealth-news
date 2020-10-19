import React, { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FontAwesome from '../uiStyle/FontAwesome';
import SidebarMenu from '../SidebarMenu';
import Dropdown from '../Dropdown';
import { fetchMenu } from '../../store/actions';

const MainMenu = ({ className, dark, fetchMenu, menuData }) => {
    useEffect(() => {
        fetchMenu();
    }, []);
    const [sideShow, setSideShow] = useState(false);
    const currentDate = moment().format('dddd, MMMM D, YYYY');
    const arr = menuData.menu;
    return (
        <>
            <div className={`main-menu ${className || ''}`} id="header">
                <Link to="#top" className="up_btn up_btn1">
                    <FontAwesome name="chevron-double-up" />
                </Link>
                <div className="main-nav clearfix is-ts-sticky">
                    <div className="container">
                        <div className="row justify-content-between">
                            <nav className="navbar navbar-expand-lg col-lg-12 align-self-center">
                                <div className="site-nav-inner">
                                    <button
                                        type="button"
                                        className="navbar-toggler"
                                        onClick={() => setSideShow(true)}
                                    >
                                        <FontAwesome name="bars" />
                                    </button>
                                    <div
                                        id="navbarSupportedContent"
                                        className="collapse navbar-collapse navbar-responsive-collapse"
                                    >
                                        <ul
                                            className="nav navbar-nav"
                                            id="scroll"
                                        >
                                            {arr.length > 0 ? (
                                                <Dropdown menus={arr} />
                                            ) : null}
                                        </ul>
                                    </div>
                                    <SidebarMenu
                                        sideShow={sideShow}
                                        setSideShow={setSideShow}
                                        menus={arr}
                                    />
                                </div>
                            </nav>
                            {isMobile && (
                                <div className="col-lg-4 align-self-center topbar">
                                    <div className="top_date_social text-right">
                                        <div
                                            className={`paper_date ${
                                                dark ? 'white' : ''
                                            }`}
                                        >
                                            <p>{currentDate}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        menuData: state.menu,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMenu: () => dispatch(fetchMenu()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);

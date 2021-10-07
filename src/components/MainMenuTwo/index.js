import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FontAwesome from '../uiStyle/FontAwesome';
import SidebarMenu from '../SidebarMenu';
import Dropdown from '../Dropdown';
import { fetchMenu } from '../../store/actions';
import mockMenu from '../../mockdata/menu.json';

const MainMenu = ({ className, fetchMenu }) => {
    // useEffect(() => {
    //     fetchMenu();
    // }, [fetchMenu]);
    const [sideShow, setSideShow] = useState(false);
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
                                            {mockMenu.length > 0 ? (
                                                <Dropdown menus={mockMenu} />
                                            ) : null}
                                        </ul>
                                    </div>
                                    <SidebarMenu
                                        sideShow={sideShow}
                                        setSideShow={setSideShow}
                                        menus={mockMenu}
                                    />
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

// const mapStateToProps = (state) => {
//     return {
//         menuData: state.menu,
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         fetchMenu: () => dispatch(fetchMenu()),
//     };
// };

export default MainMenu;

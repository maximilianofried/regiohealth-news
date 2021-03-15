import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import FontAwesome from '../uiStyle/FontAwesome';
import { fetchMenu } from '../../store/actions';
import SidebarMenu from '../SidebarMenu';
import mockMenu from '../../mockdata/menu.json';

const MainMenuTwo = ({ fetchMenu, menuData }) => {
    useEffect(() => {
        fetchMenu();
    }, []);
    const [sideShow, setSideShow] = useState(false);
    const currentDate = moment().format('dddd, MMMM D, YYYY');
    const menus = menuData.menu || mockMenu;
    return (
        <div className="white_bg">
            <div className="container">
                <div className="main-menu">
                    <div className="main-nav clearfix is-ts-sticky">
                        <div className="row justify-content-between">
                            <nav className="navbar  navbar-expand-lg  col-lg-12 align-self-center">
                                <div className="site-nav-inner">
                                    {/* <button
                                        type="button"
                                        className="navbar-toggler"
                                        onClick={() => setSideShow(true)}
                                    >
                                        <FontAwesome name="bars" />
                                    </button> */}
                                    <div
                                        id="navbarSupportedContent"
                                        // className="collapse navbar-collapse navbar-responsive-collapse"
                                    >
                                        <ul
                                            className="nav navbar-nav flex-row"
                                            id="scroll"
                                        >
                                            {mockMenu.length > 0
                                                ? mockMenu.map((item) => (
                                                      <li
                                                          key={item.id}
                                                          className={`
                                                ${item.child ? 'dropdown' : ''}
                                                nav-item`}
                                                      >
                                                          <NavLink
                                                              to={item.link}
                                                              className="menu-dropdown"
                                                              data-toggle="dropdown"
                                                          >
                                                              {item.linkText}{' '}
                                                          </NavLink>
                                                      </li>
                                                  ))
                                                : null}
                                        </ul>
                                    </div>
                                    {/* <SidebarMenu
                                        // className="themeBlue"
                                        sideShow={sideShow}
                                        setSideShow={setSideShow}
                                        menus={menus}
                                    /> */}
                                </div>
                            </nav>
                            {/* <div className="col-lg-3 text-right align-self-center">
                            <div className="date3">{currentDate}</div>
                        </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MainMenuTwo);

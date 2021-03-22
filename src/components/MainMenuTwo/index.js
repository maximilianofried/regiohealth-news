import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { isMobile } from 'react-device-detect';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import FontAwesome from '../uiStyle/FontAwesome';
import { fetchMenu, toggleSearchBox } from '../../store/actions';
import SidebarMenu from '../SidebarMenu';
import mockMenu from '../../mockdata/menu.json';
import 'react-lazy-load-image-component/src/effects/blur.css';

const MainMenuTwo = ({
    fetchMenu,
    menuData,
    toggleSearchBox,
    displaySearchBox,
}) => {
    useEffect(() => {
        fetchMenu();
    }, []);
    // const [sideShow, setSideShow] = useState(false);
    // const currentDate = moment().format('dddd, MMMM D, YYYY');
    // const menus = menuData.menu || mockMenu;

    const handleClick = (event, displaySearchBox) => {
        event.preventDefault();
        toggleSearchBox();
        const logoArea = document.getElementsByClassName('logo_area');
        logoArea[0].style.height = !displaySearchBox ? '185px' : '0';
    };

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
                                                ${
                                                    item.linkText === 'angebote'
                                                        ? 'no-padding-menu'
                                                        : ''
                                                }
                                                nav-item`}
                                                      >
                                                          {item.linkText ===
                                                          'angebote' ? (
                                                              <LazyLoadImage
                                                                  className="angebote-icon"
                                                                  src="https://strapi-sandbox.gesundheitsticket.de/uploads/icon_app_7bc6820dc7.png"
                                                                  alt="author2"
                                                                  effect="blur"
                                                              />
                                                          ) : null}
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

                                            <li className="nav-item search_icon">
                                                <FontAwesome
                                                    name="search"
                                                    onClick={(event) =>
                                                        handleClick(
                                                            event,
                                                            displaySearchBox
                                                        )
                                                    }
                                                />
                                            </li>
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
        displaySearchBox: state.searchData.displaySearchBox,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMenu: () => dispatch(fetchMenu()),
        toggleSearchBox: () => dispatch(toggleSearchBox()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMenuTwo);

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Collapse } from 'reactstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import FontAwesome from '../uiStyle/FontAwesome';
import { fetchGeoData } from '../../store/actions';
import SearchBox from '../SearchBox';
import './style.scss';

const SidebarMenu = ({
    menus,
    sideShow,
    setSideShow,
    className,
    fetchGeoData,
}) => {
    const [sMenu, setSMenu] = useState(null);
    const [stMenu, setSTMenu] = useState(null);
    return (
        <div
            className={`sidebarMenu ${sideShow ? '' : 'hideSideMenu'} ${
                className || ''
            }`}
        >
            <span className="clox" onClick={() => setSideShow(false)}>
                Close
            </span>
            <ul className="navBar">
                {menus.length > 0
                    ? menus.map((item) => (
                          <li
                              key={item.id}
                              className={`${item.child ? 'has_sub' : ''}`}
                          >
                              {item.child ? (
                                  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                                  <div
                                      onClick={() =>
                                          setSMenu(
                                              item.id === sMenu ? null : item.id
                                          )
                                      }
                                      className={
                                          sMenu === item.id ? 'active' : ''
                                      }
                                  >
                                      {item.linkText}
                                      <FontAwesome
                                          name={
                                              sMenu === item.id
                                                  ? 'angle-down active'
                                                  : 'angle-down'
                                          }
                                      />
                                  </div>
                              ) : (
                                  <NavLink
                                      exact
                                      className={
                                          sMenu === item.id ? 'active' : ''
                                      }
                                      to={item.link}
                                  >
                                      {item.linkText === 'angebote' ? (
                                          <LazyLoadImage
                                              className="angebote-icon"
                                              src="https://strapi-sandbox.gesundheitsticket.de/uploads/icon_app_7bc6820dc7.png"
                                              alt="author2"
                                              //   effect="blur"
                                          />
                                      ) : null}
                                      {item.linkText}
                                  </NavLink>
                              )}
                              {item.child ? (
                                  <Collapse isOpen={sMenu === item.id}>
                                      <ul className="subMenu">
                                          {item.submenu.map((subItem) => (
                                              <li
                                                  key={subItem.id}
                                                  className={`${
                                                      subItem.child
                                                          ? 'has_sub'
                                                          : ''
                                                  }`}
                                              >
                                                  {subItem.child ? (
                                                      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                                                      <div
                                                          onClick={() =>
                                                              setSTMenu(
                                                                  subItem.id ===
                                                                      stMenu
                                                                      ? null
                                                                      : subItem.id
                                                              )
                                                          }
                                                          className={
                                                              stMenu ===
                                                              subItem.id
                                                                  ? 'active'
                                                                  : ''
                                                          }
                                                      >
                                                          {subItem.linkText}
                                                          <FontAwesome
                                                              name={
                                                                  stMenu ===
                                                                  subItem.id
                                                                      ? 'angle-down active'
                                                                      : 'angle-down'
                                                              }
                                                          />
                                                      </div>
                                                  ) : (
                                                      <NavLink
                                                          exact
                                                          to={subItem.link}
                                                      >
                                                          {subItem.linkText}
                                                      </NavLink>
                                                  )}
                                                  {subItem.third_menu ? (
                                                      <Collapse
                                                          isOpen={
                                                              stMenu ===
                                                              subItem.id
                                                          }
                                                      >
                                                          <ul className="thirdMenu">
                                                              {subItem.third_menu.map(
                                                                  (
                                                                      thirdItem
                                                                  ) => (
                                                                      <li
                                                                          key={
                                                                              thirdItem.id
                                                                          }
                                                                      >
                                                                          <NavLink
                                                                              to={
                                                                                  thirdItem.link
                                                                              }
                                                                          >
                                                                              {
                                                                                  thirdItem.linkText
                                                                              }
                                                                          </NavLink>
                                                                      </li>
                                                                  )
                                                              )}
                                                          </ul>
                                                      </Collapse>
                                                  ) : null}
                                              </li>
                                          ))}
                                      </ul>
                                  </Collapse>
                              ) : null}
                          </li>
                      ))
                    : null}
            </ul>

            <div className="col-sm-12 col-md-8 col-lg-9 col-xl-9 align-self-center search_logo  fadeIn">
                <div className="logo_area_searchbox">
                    <SearchBox fetchGeoData={fetchGeoData} sidebar />
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGeoData: (filters) => dispatch(fetchGeoData(filters)),
    };
};

export default connect(null, mapDispatchToProps)(SidebarMenu);

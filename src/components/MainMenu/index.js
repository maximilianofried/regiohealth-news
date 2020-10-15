import React, {Fragment, useState, useEffect} from 'react';
import {isMobile} from 'react-device-detect';
import moment from 'moment';
import { connect } from 'react-redux';
import {Link, NavLink} from "react-router-dom";
import FontAwesome from "../uiStyle/FontAwesome";
import SearchModal from "../SearchModal";
import SidebarMenu from "../SidebarMenu";
import { fetchMenu } from '../../store/actions/menuActions';

const MainMenu = ({className, dark, fetchMenu, menuData}) => {
    useEffect(() => {
        fetchMenu()
    }, [])
    const [searchShow, setSearchShow] = useState(false);
    const [sideShow, setSideShow] = useState(false);
    const currentDate = moment().format("LLL");
    const arr = menuData.menu;
    return (
        <>
            <div className={`main-menu ${className || ''}`} id="header">
                <Link to="#top" className="up_btn up_btn1">
                    <FontAwesome name="chevron-double-up"/>
                </Link>
                <div className="main-nav clearfix is-ts-sticky">
                    <div className="container">
                        <div className="row justify-content-between">
                            <nav className="navbar navbar-expand-lg col-lg-12 align-self-center">
                                <div className="site-nav-inner">
                                    <button
                                    type="button"
                                    className="navbar-toggler"
                                    onClick={() => setSideShow(true)}>
                                        <FontAwesome name="bars"/>
                                    </button>
                                    <div id="navbarSupportedContent"
                                         className="collapse navbar-collapse navbar-responsive-collapse">
                                        <ul className="nav navbar-nav" id="scroll">
                                            {arr.length > 0 ? arr.map((item, i) => (
                                                <li key={i}
                                                    className={`
                                                ${item.child ? 'dropdown' : ''}
                                                nav-item`}>
                                                    {item.child ? <NavLink onClick={e => e.preventDefault()} to="/"
                                                                           className="menu-dropdown"
                                                                           data-toggle="dropdown">{item.linkText}
                                                            <FontAwesome
                                                                name={item.icon}/></NavLink>
                                                        : <NavLink to={item.link} className="menu-dropdown"
                                                                   data-toggle="dropdown">{item.linkText} <FontAwesome
                                                            name={item.icon}/></NavLink>}

                                                    {item.child ?
                                                        <ul className="dropdown-menu" role="menu">
                                                            {item.submenu.map((sub_item, i) => (
                                                                <li key={i}
                                                                    className={`${sub_item.child ? 'dropdown-submenu' : null}
                                                        `}>
                                                                    {sub_item.child ?
                                                                        <NavLink onClick={e => e.preventDefault()}
                                                                                 to="/">{sub_item.linkText}</NavLink>
                                                                        : <NavLink
                                                                            to={sub_item.link}>{sub_item.linkText}</NavLink>}
                                                                    {sub_item.third_menu ?
                                                                        <ul className="dropdown-menu">
                                                                            {sub_item.third_menu.map((third_item, i) => (
                                                                                <li key={i}><NavLink
                                                                                    to={third_item.link}>{third_item.linkText}</NavLink>
                                                                                </li>
                                                                            ))}
                                                                        </ul> : null}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                        : null
                                                    }
                                                </li>
                                            )) : null}
                                        </ul>
                                    </div>
                                    <SidebarMenu sideShow={sideShow} setSideShow={setSideShow} menus={arr}/>
                                </div>
                            </nav>
                           {isMobile && <div className="col-lg-4 align-self-center topbar">
                            <div className="top_date_social text-right">
                            <div className={`paper_date ${dark ? 'white' : ''}`}>
                                <p>{currentDate}</p>
                            </div>
                            {/* <div className={`social1 ${dark ? 'white' : ''}`}>
                                <ul className="inline">
                                    <li><a href="https://twitter.com/gesundticket" target="_blank"><FontAwesome name="twitter"/></a></li>
                                    <li><a href="https://www.facebook.com/GesundheitsTicket" target="_blank"><FontAwesome name="facebook-f"/></a></li>
                                    <li><a href="https://www.instagram.com/gesundheitsticket/" target="_blank"><FontAwesome name="instagram"/></a></li>
                                </ul>
                            </div> */}
                        </div>
                            </div>}
                            {/* <div className="col-lg-4 align-self-center">
                                <div className="menu_right">
                                    <div className="users_area">
                                        <ul className="inline">
                                            <li className="search_btn" onClick={() => setSearchShow(!searchShow)}>
                                                <FontAwesome name="search"/></li>
                                            <li><FontAwesome name="user-circle"/></li>
                                        </ul>
                                    </div>
                                    <div className="lang d-none d-xl-block">
                                        <ul>
                                            <li><Link to="/">English <FontAwesome name="angle-down"/></Link>
                                                <ul>
                                                    <li><Link to="/">Spanish</Link>
                                                    </li>
                                                    <li><Link to="/">China</Link>
                                                    </li>
                                                    <li><Link to="/">Hindi</Link>
                                                    </li>
                                                    <li><Link to="/">Corian</Link>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="temp d-none d-lg-block">
                                        <div className="temp_wap">
                                            <div className="temp_icon">
                                                <img src={tempIcon} alt="temp icon"/>
                                            </div>
                                            <h3 className="temp_count">13</h3>
                                            <p>San Francisco</p>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            {searchShow ?
                <SearchModal setSearchShow={setSearchShow} searchShow={searchShow}/>
                : null
            }
        </>
    );
};

const mapStateToProps = state => {
    return {
        menuData: state.menu,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchMenu: () => dispatch(fetchMenu()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainMenu);
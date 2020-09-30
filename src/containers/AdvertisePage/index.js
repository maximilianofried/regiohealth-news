import React, {Fragment, useState} from 'react';
import BreadCrumb from "../../components/BreadCrumb";
import FontAwesome from "../../components/uiStyle/FontAwesome";
import {Link} from "react-router-dom";
import WidgetTab from "../../components/WidgetTab";
import WidgetTrendingNews from "../../components/WidgetTrendingNews";
import NewsLetter from "../../components/NewsLetter";
import EntertainmentNews from "../../components/EntertainmentNews";
import {Fade, Nav, NavItem, TabContent, TabPane} from "reactstrap";
import MostShareWidget from "../../components/MostShareWidget";
import BannerSection from "../../components/BannerSection";
import classnames from 'classnames';

const AdvertisePage = () => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };
    return (
        <Fragment>
            <BreadCrumb className="shadow5" title="Archive">
                <Fragment>
                    <div className="space-50"/>
                    <div className="row">
                        <div className="col-12">
                            <div className="author_about">
                                {/* <div className="author_img">
                                    <div className="author_wrap">
                                        <img src={author1} alt="author1"/>
                                    </div>
                                </div> */}
                                <div className="author_content"><Link to="/">Advertise</Link>
                                </div>
                                <p>Herzlich Willkommen auf der News-Seite der GesundheitsTicket GmbH.</p>
                                <br/>
                                <p>Die GesundheitsTicket GmbH ist ein Unternehmen im wachsenden Gesundheitsmarkt, das sich auf die gesundheitliche
                                    Betreuung und Beratung von Unternehmen und Unternehmensmitarbeitern spezialisiert hat.</p>
                                <p>
                                <br/>
                                Wir freuen uns über Ihr Interesse an unserer Arbeit.
                                </p>
                                <br/>
                                <p>Wenn Sie auf dieser Plattform mit Werbung zu Ihren Angeboten und Produkten vertreten sein wollen, freuen wir uns über Ihre <a href="https://www.gesundheitsticket.de/info/kontakt" target="_blank">Kontaktaufnahme</a>.</p>
                                <br/>
                               <p>Advertise</p>
                               <br/>
                                <p>
                                Welcome to the news page of GesundheitsTicket GmbH.
                                The GesundheitsTicket GmbH is a company in the growing health market that specializes in health care and advice for companies and company employees.
                                Thank you for your interest in our work.
                                If you want to be represented on this platform with advertising for your offers and products, we look forward to hearing from you.
                                </p>
                                <br/>
                                <p>Anunciar</p>
                                <br/>
                                <p>
                                Bienvenido a la página de noticias de GesundheitsTicket GmbH.
                                GesundheitsTicket GmbH es una empresa en el creciente mercado de la salud que se especializa en atención médica y asesoramiento para empresas y empleados de la empresa.
                                Gracias por su interés en nuestro trabajo.
                                Si desea estar representado en esta plataforma con publicidad para sus ofertas y productos, esperamos tener noticias suyas.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="space-50"/>
                </Fragment>
            </BreadCrumb>
            {/* <div className="archives padding-top-30">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-8">
                            <div className="row">
                                <div className="col-10 align-self-center">
                                    <div className="about_post_list">
                                        <Nav tabs>
                                            <NavItem>
                                                <div
                                                    className={classnames({active: activeTab === '1'})}
                                                    onClick={() => {
                                                        toggle('1');
                                                    }}
                                                >
                                                    Latest news
                                                </div>
                                            </NavItem>
                                            <NavItem>
                                                <div
                                                    className={classnames({active: activeTab === '2'})}
                                                    onClick={() => {
                                                        toggle('2');
                                                    }}
                                                >
                                                    Popular news
                                                </div>
                                            </NavItem>
                                        </Nav>
                                    </div>
                                </div>
                                <div className="col-2 text-right align-self-center">
                                    <div className="calender mb20">
                                        <img src={calendar} alt="calendar"/>
                                    </div>
                                </div>
                            </div>
                            <div className="about_posts_tab">
                                <TabContent activeTab={activeTab}>
                                    <TabPane tabId="1">
                                        <Fade in={activeTab === '1'}>
                                            <div className="row justify-content-center">
                                                <EntertainmentNews headerHide={true} entertainments={entertainments}/>
                                            </div>
                                        </Fade>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <Fade in={activeTab === '2'}>
                                            <div className="row justify-content-center">
                                                <EntertainmentNews headerHide={true} entertainments={entertainments}/>
                                            </div>
                                        </Fade>
                                    </TabPane>
                                </TabContent>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="cpagination">
                                        <nav aria-label="Page navigation example">
                                            <ul className="pagination">
                                                <li className="page-item">
                                                    <Link className="page-link" to="/" aria-label="Previous">
                                                                <span aria-hidden="true"><FontAwesome
                                                                    name="caret-left"/></span>
                                                    </Link>
                                                </li>
                                                <li className="page-item">
                                                    <Link className="page-link" to="/">1</Link>
                                                </li>
                                                <li className="page-item">
                                                    <Link className="page-link" to="/">..</Link>
                                                </li>
                                                <li className="page-item">
                                                    <Link className="page-link" to="/">5</Link>
                                                </li>
                                                <li className="page-item">
                                                    <Link className="page-link" to="/" aria-label="Next">
                                                                <span aria-hidden="true"><FontAwesome
                                                                    name="caret-right"/></span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <WidgetTab/>
                            <WidgetTrendingNews/>
                            <div className="banner2 mb30">
                                <Link to="/">
                                    <img src={banner2} alt="thumb"/>
                                </Link>
                            </div>
                            <MostShareWidget title="Most Share"/>
                            <NewsLetter/>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="space-70"/>
            <BannerSection/>
        </Fragment>
    )
};

export default AdvertisePage;
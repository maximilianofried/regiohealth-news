import React, {Fragment, Component, useEffect} from 'react';
import {connect} from 'react-redux';
import ReactMarkdown from 'react-markdown';
import BannerSection from "../../components/BannerSection";
import FontAwesome from "../../components/uiStyle/FontAwesome";
import SimpleReactValidator from 'simple-react-validator';
import {toast} from "react-toastify";
import { fetchPages } from '../../store/actions';

const ContactUsPage = ({fetchPages, pages, name}) => {
    useEffect(() => {
        fetchPages(name)

    },[])

    const LinkRenderer = (props) => {
        return <a href={props.href} target="_blank">{props.children}</a>
    }

        return (
            <Fragment>
                <div className="inner">
                    <div className="container">
                        <div className="inner_wrap">
                            <div className="row">
                                {/* <div className="col-lg-6">
                                    <div className="title_inner">
                                        <h6>CONTACT US</h6>
                                        <h1>let's Contact</h1>
                                    </div>
                                </div> */}
                            </div>
                            {/* <div className="inner_scroll">
                                <div className="scrollIcon">
                                    <img src={scrollIcon} alt="scrollIcon"/>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>

                <div className="contacts section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-5 mx-auto">
                                <div className="box single_contact_box">
                                    <div className="contact_title">
                                        <h3>Headquarters</h3>
                                    </div>
                                    <div className="contact_details">
                                        <div className="contact_details_icon">
                                        <FontAwesome name="map-marker-alt"/>
                                        </div>
                                        <p>LOCATION:</p>
                                        <h6> Kollwitzstraße 77, 10435, Berlin</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5 mx-auto">
                                <div className="box single_contact_box">
                                    <div className="contact_title">
                                        <h3>Headquarters</h3>
                                    </div>
                                    <div className="contact_details">
                                        <div className="contact_details_icon">
                                        <FontAwesome name="map-marker-alt"/>
                                        </div>
                                        <p>LOCATION:</p>
                                        <h6>Logenstraße 8, 15230, Frankfurt (Oder)</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*contact form area*/}
                <div className="contact_form padding-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="map">
                                    <iframe
                                        title="map"
                                        frameBorder={0}
                                        height="450px"
                                        width="100%"
                                        src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Kollwitzstra%C3%9Fe%2077+(GesundheitsTicket)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                                        allowFullScreen/>
                                </div>
                            </div>
                        </div>
                        <div className="space-50"/>
                    </div>
                </div>
                <BannerSection/>
            </Fragment>
        )
    }

    const mapStateToProps = state => {
        return {
            pages: state.pages && state.pages.pages  && state.pages.pages[0] || []
        }
    }

    const mapDispatchToProps = dispatch => {
        return {
            fetchPages: (name) => dispatch(fetchPages({name}))
        }
    }

    export default connect(
        mapStateToProps,
        mapDispatchToProps
    )(ContactUsPage);
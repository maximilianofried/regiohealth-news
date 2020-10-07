import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import ReactMarkdown from 'react-markdown';
import BreadCrumb from "../../components/BreadCrumb";
import BannerSection from "../../components/BannerSection";
import { fetchPages } from '../../store/actions';
import FontAwesome from "../../components/uiStyle/FontAwesome";


const AboutUsPage = ({fetchPages, pages, name}) => {
    useEffect(() => {
        fetchPages(name)

    },[])

    const LinkRenderer = (props) => {
        return <a href={props.href} target="_blank">{props.children}</a>
    }

    return (
        <Fragment>
            <BreadCrumb className="shadow5" title={name === "Privacy and Policy" ? name.replace("and", "&") : name}>
            <Fragment>
                <div className="space-50"/>
                <div className="row">
                    <div className="col-12">
                        <div className="author_about">
                        {pages && pages.content &&   <ReactMarkdown
                            className={"markdownContainer" + (name !== "Privacy and Policy" ? " markdown_margin" : "")}
                            renderers={{link: LinkRenderer}}
                            source={pages.content}/>}
                        </div>
                    </div>
                </div>
            </Fragment>
            {name === "Contact" && <Fragment>
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
                    </div>
                </div>
            </Fragment>}
            </BreadCrumb>
            <div className="space-70"/>
            <BannerSection/>
        </Fragment>
    )
};

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
)(AboutUsPage);
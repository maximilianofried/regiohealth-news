import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import ReactMarkdown from 'react-markdown';
import BreadCrumb from "../../components/BreadCrumb";
import BannerSection from "../../components/BannerSection";
import { fetchPages } from '../../store/actions';


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
                                className="markdownContainer"
                                renderers={{link: LinkRenderer}}
                                source={pages.content}/>}
                            </div>
                        </div>
                    </div>
                    <div className="space-50"/>
                </Fragment>
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
import React, {Component} from 'react';
import {Link} from "react-router-dom";
import moment from 'moment';
import WidgetTab from "../WidgetTab";
import Slider from "react-slick";
import "../../../node_modules/slick-carousel/slick/slick.css";
import FontAwesome from "../uiStyle/FontAwesome";
import ModalVideo from 'react-modal-video'
import PostCarousel from "../../components/PostCarousel";
import TrendingNews from "../../components/TrendingNews";
// images
import sliderImg1 from '../../doc/img/header/sider-top.jpg';

import './style.scss';
const CMS_LINK = "https://cms.gesundheitsticket.de";


function SampleNextArrow(props) {
    const {className, onClick} = props;
    return (
        <div onClick={onClick} className={`${className} slider_arrow arrow_right slick-arrow`}>
            <FontAwesome name="angle-right"/>
        </div>
    );
}

function SamplePrevArrow(props) {
    const {className, onClick} = props;
    return (
        <div onClick={onClick} className={`${className} slider_arrow arrow_left slick-arrow`}>
            <FontAwesome name="angle-left"/>
        </div>
    );
}

class PostGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nav1: null,
            nav2: null,
            vModal: false,
            videoId: '0r6C3z3TEKw'
        };
    }

    componentDidMount() {
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
        });
    }

    modalHandler = (value) => {
        this.setState({
            vModal: value
        })
    };

    render() {
        const {className, latestArticles, topArticles, adsHome} = this.props;
        const {nav1, nav2, vModal, videoId} = this.state;
        const navSettings = {
            nextArrow: <SampleNextArrow/>,
            prevArrow: <SamplePrevArrow/>,
            slidesToShow: 8,
            swipeToSlide: true,
            focusOnSelect: true,
            centerMode: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 8,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 5,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 3,
                    }
                },
            ]
        };
        return (
            <div className={`post_gallary_area mb40 ${className}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                        <PostCarousel latestArticles={latestArticles.slice(0, 9)}  className="fifth_bg"/>
                            <div className="row">
                                <div className="col-xl-8">
                                    <div className="slider_demo2">
                                        {/* <Slider
                                            asNavFor={nav2}
                                            arrows={false}
                                            fade={true}
                                            ref={slider => (this.slider1 = slider)}
                                        > */}
                                            {topArticles.slice(0, 1).map((item, i) => (
                                                <div key={i} className="single_post post_type6 xs-mb30">
                                                    <div className="post_img gradient1">
                                                        <img src={item.main_image ? `${CMS_LINK + item.main_image.url}` : sliderImg1} alt="thumb"/>
                                                        {/* <span onClick={() => this.modalHandler(true)}
                                                              className="tranding"><FontAwesome
                                                            name="play"/></span> */}
                                                    </div>
                                                    <div className="single_post_text">
                                                        <div className="meta meta_separator1">
                                                            <Link to="#">{item.categories.length > 0 ? item.categories[0].name : ''}</Link>
                                                            <Link to="#">{moment(item.createdAt).format("LL")}</Link>
                                                        </div>
                                                        <h4><Link className="play_btn"
                                                                  to={`/article/${item._id}`}>{item.title}</Link></h4>
                                                        <div className="space-10"/>
                                                        <p className="post-p">{item.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        {/* </Slider> */}
                                    </div>
                                    <div className="slider_demo1">
                                        {/* <Slider
                                            ref={slider => (this.slider2 = slider)}
                                            asNavFor={nav1}
                                            {...navSettings}
                                        >
                                            {thumbs.slice(0, 9).map((item, i) => (
                                                <div key={i} className="single_gallary_item">
                                                    <img src={item} alt="thumb"/>
                                                </div>
                                            ))}
                                        </Slider> */}
                                    </div>
                                     <TrendingNews adsHome={adsHome.filter((ad)=> ad.size === "s729x90")} latestArticles={latestArticles.slice(9, 18)}/>
                                </div>
                                <div className="col-xl-4">
                                    <WidgetTab adsHome={adsHome.filter((ad)=> ad.size === "s350x292")} latestArticles={latestArticles.slice(18, 23)} dark={true}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <ModalVideo channel='youtube' isOpen={vModal} videoId={videoId}
                            onClose={() => this.modalHandler(false)}/> */}
            </div>
        );
    }
}

export default PostGallery;
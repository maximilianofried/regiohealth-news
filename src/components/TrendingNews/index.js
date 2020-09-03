import React, {Fragment} from 'react';
import Heading from "../uiStyle/Heading";
import TrendingNewsSlider from "../TrendingNewsSlider";
import {Link} from "react-router-dom";
import FontAwesome from "../uiStyle/FontAwesome";
import moment from 'moment';
import transm1 from '../../doc/img/trending/transm1.jpg';
import transm2 from '../../doc/img/trending/transm2.jpg';
import transm4 from '../../doc/img/trending/transm4.jpg';
import transm5 from '../../doc/img/trending/transm5.jpg';
import transm6 from '../../doc/img/trending/transm6.jpg';
import {CMS_LINK} from '../../utils/constants';
const trendingNews = [
    {
        image: transm1,
        category: 'TECHNOLOGY',
        date: 'March 26, 2020',
        title: 'Nancy Zhang a Chinese busy woman and Dhaka'
    },
    {
        image: transm2,
        category: 'TECHNOLOGY',
        date: 'March 26, 2020',
        title: 'U.S. Response subash says he will label regions by risk of…'
    },
    {
        image: transm4,
        category: 'TECHNOLOGY',
        date: 'March 26, 2020',
        title: 'Venezuela elan govt and opposit the property collect'
    },
    {
        image: transm5,
        category: 'TECHNOLOGY',
        date: 'March 26, 2020',
        title: 'Nancy Zhang a Chinese busy woman and Dhaka'
    },
    {
        image: transm6,
        category: 'TECHNOLOGY',
        date: 'March 26, 2020',
        title: 'U.S. Response subash says he will label regions by risk of…'
    },
    {
        image: transm4,
        category: 'TECHNOLOGY',
        date: 'March 26, 2020',
        title: 'Venezuela elan govt and opposit the property collect'
    },
];

const TrendingNews = ({dark, latestArticles}) => {
    console.log("LATEST",latestArticles)
    return (
        <Fragment>
            <Heading title="Trending News"/>

            {dark ? <div className="border_white"/> : <div className="border_black"/>}
            <div className="space-30"/>
            <div className="row">
                <div className="col-lg-6">
                    {latestArticles.slice(0, 3).map((item, i) => (
                        <Fragment key={i}>
                            <div className={"single_post widgets_small " + (item.main_image ? '' : 'widgets_small_no_image')}>
                            {item.main_image && item.main_image.formats &&
                                 <div className="post_img">
                                    <div className="img_wrap">
                                        <Link to={`/post2/${item._id}`}>
                                            <img src={CMS_LINK + item.main_image.formats.thumbnail.url} alt="thumb"/>
                                        </Link>
                                    </div>
                                    <span className="tranding">
									<FontAwesome name="bolt"/>
								</span>
                                </div>}
                                <div className="single_post_text">
                                    <div className="meta2">
                                        <Link to="/">{item.categories[0].name}</Link>
                                        <Link to="/">{moment(item.createdAt).format("LL")}</Link>
                                    </div>
                                    <h4><Link to={`/post2/${item._id}`}>{item.title}</Link></h4>
                                </div>
                            </div>
                            <div className="space-15"/>
                            {dark ? <div className="border_white"/> : <div className="border_black"/>}
                            <div className="space-15"/>
                        </Fragment>
                    ))}
                </div>
                <div className="col-lg-6">
                    {latestArticles.slice(3, 6).map((item, i) => (
                        <Fragment key={i}>
                            <div className={"single_post widgets_small " + (item.main_image ? '' : 'widgets_small_no_image')}>
                            {item.main_image && item.main_image.formats &&
                                <div className="post_img">
                                    <div className="img_wrap">
                                        <Link to={`/post2/${item._id}`}>
                                            <img src={CMS_LINK + item.main_image.formats.thumbnail.url} alt="thumb"/>
                                        </Link>
                                    </div>
                                    <span className="tranding">
									<FontAwesome name="bolt"/>
								</span>
                                </div>
                            }
                                <div className="single_post_text">
                                    <div className="meta2">
                                        <Link to="/">{item.categories[0].name}</Link>
                                        <Link to="/">{moment(item.createdAt).format("LL")}</Link>
                                    </div>
                                    <h4><Link to={`/post2/${item._id}`}>{item.title}</Link></h4>
                                </div>
                            </div>
                            <div className="space-15"/>
                            {dark ? <div className="border_white"/> : <div className="border_black"/>}
                            <div className="space-15"/>
                        </Fragment>
                    ))}
                </div>
            </div>
            <Heading title="Local News"/>
                        <TrendingNewsSlider latestArticles={latestArticles.slice(6, 14)}/>
        </Fragment>
    );
};

export default TrendingNews;
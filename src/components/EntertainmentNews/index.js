import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import moment from 'moment';
import { buyCake, fetchArticles } from '../../store/actions';
//Image size 700x500
const EntertainmentNews = ({entertainments}) => {
    return ( entertainments && 
        <Fragment>
            {entertainments.map((item, i) => (
                <div key={i} className="col-lg-6">
                    <div className="single_post post_type3 mb30">
                        <div className="post_img">
                            <div className="img_wrap">
                                <Link to={`/post2/${item._id}`}>
                                   { item.main_image ? <img src={"http://cms.gesundheitsticket.de" + item.main_image.url} alt="thumb"/> : ''}
                                </Link>
                            </div>
                        </div>
                        <div className="single_post_text">
                            {/* <div className="meta3"><Link to="/">{item.categories.length > 0 ? item.categories[0].name.toUpperCase() : ""}</Link>
                                <Link to="/">{moment(item.createdAt).format("LL")}</Link>
                            </div> */}
                            <h4><Link to={`/post2/${item._id}`}>{item.title}</Link></h4>
                            <div className="space-10"/>
                            <p className="post-p">{item.description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </Fragment>
    );
};

export default EntertainmentNews;

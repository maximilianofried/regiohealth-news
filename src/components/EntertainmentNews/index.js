import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import moment from 'moment';
import { buyCake, fetchArticles } from '../../store/actions';

const EntertainmentNews = ({entertainments}) => {
    return (
        <Fragment>
            {entertainments.map((item, i) => (
                <div key={i} className="col-lg-6">
                    <div className="single_post post_type3 mb30">
                        <div className="post_img">
                            <div className="img_wrap">
                                <Link to="/">
                                   { item.main_image ? <img src={"http://cms.gesundheitsticket.de/" + item.main_image.formats.thumbnail.url} alt="thumb"/> : ''}
                                </Link>
                            </div>
                        </div>
                        <div className="single_post_text">
                            <div className="meta3"><Link to="/">TECHNOLOGY</Link>
                                <Link to="/">{moment(item.createdAt).format("LL")}</Link>
                            </div>
                            <h4><Link to="/post1">{item.title}</Link></h4>
                            <div className="space-10"/>
                            <p className="post-p">{item.description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </Fragment>
    );
};

// const mapStateToProps = (state, ownProps) => {
//     const itemState = ownProps.articles 
//     ? state.cake.numOfCakes 
//     : state.article.articles;

//     return {
//         propItem: itemState
//     }
// }

// const mapDispatchToProps = (dispatch, ownProps) => {
//     const dispatchFunction = ownProps.articles
//     ? () => dispatch(buyCake())
//     : () => dispatch(fetchArticles())

//     return {
//         propBuyItem: dispatchFunction
//     }
    
// }

export default EntertainmentNews;
// export default connect(null, mapDispatchToProps)(EntertainmentNews);
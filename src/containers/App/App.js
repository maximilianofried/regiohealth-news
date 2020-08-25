import React, {Fragment} from "react";
import {toast, ToastContainer} from "react-toastify";
import {connect} from "react-redux";
import Routes from "../__Routes";
import ScrollTopButton from "../../components/ScrollTopButton";
import ScrollToTop from "../../components/ScrollToTop";

const App = (props) => {
    const {error, success} = props;
    if (error) toast.error(error);
    if (success) toast.success(success);
    return (
        <Fragment>
            {props.loading && <h1>loading...</h1>}
            <ScrollToTop/>
            <Routes/>
            <ToastContainer position="top-center"/>
            <ScrollTopButton/>
        </Fragment>
    );
};

const MapStateToProps = state => {
    return {
        error: state.meta.error,
        success: state.meta.success,
    }
};

export default connect(MapStateToProps)(App);

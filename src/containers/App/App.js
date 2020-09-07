import React, {Fragment, useEffect} from "react";
import {toast, ToastContainer} from "react-toastify";
import {connect} from "react-redux";
import Routes from "../__Routes";
import ScrollTopButton from "../../components/ScrollTopButton";
import ScrollToTop from "../../components/ScrollToTop";
import {fetchOnInit} from "../../store/actions";

const App = (props) => {
    useEffect(() => {
        console.log("USEFFECT")
        props.fetchOnInit()
    }, [])
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

const mapStateToProps = state => {
    return {
        error: state.meta.error,
        success: state.meta.success
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchOnInit: () => dispatch(fetchOnInit()),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
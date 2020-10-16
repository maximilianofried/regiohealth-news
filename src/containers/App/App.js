import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';
import Routes from '../__Routes';
import ScrollTopButton from '../../components/ScrollTopButton';
import ScrollToTop from '../../components/ScrollToTop';
import { fetchOnInit } from '../../store/actions';

const App = ({ fetchOnInit, error, success, loading }) => {
    useEffect(() => {
        fetchOnInit();
    }, []);
    if (error) toast.error(error);
    if (success) toast.success(success);
    return (
        <>
            {loading && <h1>loading...</h1>}
            <ScrollToTop />
            <Routes />
            <ToastContainer position="top-center" />
            <ScrollTopButton />
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        error: state.meta.error,
        success: state.meta.success,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOnInit: () => dispatch(fetchOnInit()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

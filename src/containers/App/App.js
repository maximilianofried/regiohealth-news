import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';
import Routes from '../__Routes';
import ScrollTopButton from '../../components/ScrollTopButton';
import ScrollToTop from '../../components/ScrollToTop';
import { fetchOnInit, fetchMenu, fetchPages } from '../../store/actions';

const App = ({
    fetchOnInit,
    fetchMenu,
    fetchPages,
    pages,
    menuData,
    error,
    success,
    loading,
}) => {
    useEffect(() => {
        fetchOnInit();
        fetchMenu();
        fetchPages();
    }, []);

    if (error) toast.error(error);
    if (success) toast.success(success);
    return (
        <>
            {loading && <h1>loading...</h1>}
            <ScrollToTop />
            {menuData && pages && <Routes menuData={menuData} pages={pages} />}
            <ToastContainer position="top-center" />
            <ScrollTopButton />
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        error: state.meta.error,
        success: state.meta.success,
        menuData: state.menu,
        pages: state.pages,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOnInit: () => dispatch(fetchOnInit()),
        fetchMenu: () => dispatch(fetchMenu()),
        fetchPages: () => dispatch(fetchPages()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

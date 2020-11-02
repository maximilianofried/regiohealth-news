import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';
import Routes from '../__Routes';
import ScrollTopButton from '../../components/ScrollTopButton';
import ScrollToTop from '../../components/ScrollToTop';
import { fetchMenu, fetchPages } from '../../store/actions';

const App = ({ fetchMenu, fetchPages, pages, menuData, error, success }) => {
    const [isLoading, setLoading] = useState(true);

    function fakeRequest() {
        return new Promise((resolve) => setTimeout(() => resolve(), 700));
    }
    useEffect(() => {
        fetchMenu();
        fetchPages();
        fakeRequest().then(() => {
            const el = document.querySelector('.loader-container');
            if (el) {
                el.remove();
                setLoading(!isLoading);
            }
        });
    }, []);

    if (error) toast.error(error);
    if (success) toast.success(success);

    if (isLoading) {
        return null;
    }
    return (
        <>
            <ScrollToTop />
            <Routes menuData={menuData} pages={pages} />
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
        fetchMenu: () => dispatch(fetchMenu()),
        fetchPages: () => dispatch(fetchPages()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';
import Routes from '../__Routes';
import ScrollTopButton from '../../components/ScrollTopButton';
import ScrollToTop from '../../components/ScrollToTop';
import { fetchMenu, fetchPages } from '../../store/actions';
import 'moment/locale/de';

const App = ({ fetchMenu, fetchPages, pages, menuData, error, success }) => {
    // useEffect(() => {
    //     fetchMenu();
    //     fetchPages();
    // }, [fetchMenu, fetchPages]);

    if (error) toast.error(error);
    if (success) toast.success(success);

    return (
        <>
            <ScrollToTop />
            <Routes />
            <ToastContainer position="top-center" />
            <ScrollTopButton />
        </>
    );
};

// const mapStateToProps = (state) => {
//     return {
//         error: state.meta.error,
//         success: state.meta.success,
//         menuData: state.menu,
//         pages: state.pages,
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         fetchMenu: () => dispatch(fetchMenu()),
//         fetchPages: () => dispatch(fetchPages()),
//     };
// };

export default App;

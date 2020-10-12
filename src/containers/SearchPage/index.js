import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from 'use-places-autocomplete';
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxOption,
} from '@reach/combobox';
import { fetchArticles, fetchArticlesGeo, fetchAds } from '../../store/actions';
import BreadCrumb from '../../components/BreadCrumb';
// import BusinessNews from '../../components/BusinessNews';
import '@reach/combobox/styles.css';
import BannerSection from '../../components/BannerSection';

const CMS_LINK = 'https://cms.gesundheitsticket.de';

const SearchPage = ({ fetchArticlesGeo, category, fetchAds, adsCategory }) => {
    useEffect(() => {
        fetchAds();
    }, []);

    const banner350x292 =
        adsCategory.filter((ad) => ad.size === 's350x292')[0] || {};

    return (
        <>
            <BreadCrumb title={category} />
            <div className="archives padding-top-30">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-8">
                            <div className="businerss_news">
                                <div className="row">
                                    <div className="col-12 align-self-center">
                                        <div className="categories_title">
                                            <h5>Search by Location:</h5>
                                            <Search
                                                fetchArticlesGeo={
                                                    fetchArticlesGeo
                                                }
                                            />
                                            <div className="space-70" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        {/* <BusinessNews headerHide /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            {/* <WidgetTab/> */}
                            {/* <WidgetTrendingNews/> */}
                            {/* <NewsLetter/>
                            <FollowUs title="Follow Us"/> */}
                            <div className="banner2 mb30">
                                <a href={banner350x292.link} target="_blank">
                                    {banner350x292.image &&
                                        banner350x292.image.length > 0 && (
                                            <img
                                                src={
                                                    CMS_LINK +
                                                    banner350x292.image[0].url
                                                }
                                                alt="banner"
                                            />
                                        )}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-70" />
            <BannerSection />
        </>
    );
};

const Search = ({ fetchArticlesGeo }) => {
    const options = {
        types: ['(cities)'],
        componentRestrictions: { country: ['de', 'pl'] },
    };

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({ requestOptions: options });

    const onComboSelect = (address) => {
        setValue(address, false);
        clearSuggestions();
        getGeocode({ address })
            .then((results) => getLatLng(results[0]))
            .then(({ lat, lng }) => {
                fetchArticlesGeo({ lat, lng });
                // eslint-disable-next-line no-console
                console.log('📍 Coordinates: ', { lat, lng });
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.log('😱 Error: ', error);
            });
    };
    return (
        <Combobox onSelect={(address) => onComboSelect(address)}>
            <ComboboxInput
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                disabled={!ready}
                placeholder="City"
            />
            <ComboboxPopover className="pop_over">
                {status === 'OK' &&
                    data.map((result) => {
                        return (
                            <ComboboxOption
                                key={result.place_id}
                                value={result.description}
                            />
                        );
                    })}
            </ComboboxPopover>
        </Combobox>
    );
};

const mapStateToProps = (state) => {
    return {
        adsCategory: state.ads.ads.filter((ad) => ad.position === 'category'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchArticles: ({ city }) => dispatch(fetchArticles({ city })),
        fetchArticlesGeo: ({ lat, lng }) =>
            dispatch(fetchArticlesGeo({ lat, lng })),
        fetchAds: () => dispatch(fetchAds()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);

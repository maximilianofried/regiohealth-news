import React, { Fragment, useEffect, useState } from 'react';
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
import {
    Listbox,
    ListboxInput,
    ListboxButton,
    ListboxPopover,
    ListboxList,
    ListboxOption,
} from '@reach/listbox';
import {
    fetchArticles,
    fetchArticlesCity,
    fetchAds,
} from '../../store/actions';
import BusinessNews from '../../components/BusinessNews';
import BreadCrumb from '../../components/BreadCrumb';
// import BusinessNews from '../../components/BusinessNews';
import '@reach/combobox/styles.css';
import '@reach/listbox/styles.css';
import BannerSection from '../../components/BannerSection';

const CMS_LINK = 'https://cms.gesundheitsticket.de';

const SearchPage = ({
    fetchArticlesCity,
    filteredArticles,
    category,
    fetchAds,
    adsCategory,
    limit,
}) => {
    useEffect(() => {
        fetchAds();
    }, []);
    const [place, setPlace] = useState({ lat: 52.56, lng: 13.14 });
    const [radius, setRadius] = useState(20000);
    const showMore = () => {
        fetchArticlesCity({ limit: limit + 2, start: 0, place, radius });
    };
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
                                                fetchArticlesCity={
                                                    fetchArticlesCity
                                                }
                                                limit={limit}
                                                place={place}
                                                radius={radius}
                                                setPlace={setPlace}
                                                setRadius={setRadius}
                                            />
                                            <div className="space-70" />
                                        </div>
                                    </div>
                                </div>
                                {filteredArticles && (
                                    <div className="row">
                                        <div className="col-12">
                                            <BusinessNews
                                                businessArticles={
                                                    filteredArticles
                                                }
                                                headerHide
                                            />
                                        </div>
                                    </div>
                                )}
                                <div className="row">
                                    <div className="col-12">
                                        <div className="cpagination">
                                            <button
                                                type="button"
                                                onClick={showMore}
                                                className="readmore cursor_pointer"
                                            >
                                                SHOW MORE
                                            </button>
                                        </div>
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

const Search = ({
    fetchArticlesCity,
    limit,
    place,
    radius,
    setPlace,
    setRadius,
}) => {
    // const [place, setPlace] = useState({ lat: 52.56, lng: 13.14 });
    // const [radius, setRadius] = useState(20000);
    const options = {
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
                setPlace({ lat, lng });
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.log('😱 Error: ', error);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchArticlesCity({ limit: 2, start: 0, place, radius });
    };
    return (
        <form onSubmit={handleSubmit}>
            <Combobox
                onSelect={(address) => onComboSelect(address)}
                className="d-flex align-items-center my-flex-container"
            >
                <ComboboxInput
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                    disabled={!ready}
                    placeholder="PLZ oder Ort"
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
                <Listbox radius={radius} onChange={setRadius}>
                    <ListboxOption value="5000">+5 km</ListboxOption>
                    <ListboxOption value="10000">+10 km</ListboxOption>
                    <ListboxOption value="20000">+20 km</ListboxOption>
                    <ListboxOption value="30000">+30 km</ListboxOption>
                    <ListboxOption value="50000">+50 km</ListboxOption>
                    <ListboxOption value="100000">+100 km</ListboxOption>
                    <ListboxOption value="150000">+150 km</ListboxOption>
                    <ListboxOption value="200000">+200 km</ListboxOption>
                </Listbox>
                <button type="submit" className="btn-sm btn-primary">
                    <i className="fa fa-search" /> Finden
                </button>
            </Combobox>
        </form>
    );
};

const mapStateToProps = (state) => {
    return {
        adsCategory: state.ads.ads.filter((ad) => ad.position === 'category'),
        filteredArticles: state.articles.articlesByCity,
        limit: state.articles.limit,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // fetchArticles: ({ city }) => dispatch(fetchArticles({ city })),
        fetchArticlesCity: (filters) => dispatch(fetchArticlesCity(filters)),
        fetchAds: () => dispatch(fetchAds()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);

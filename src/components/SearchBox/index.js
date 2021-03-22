import React from 'react';
import usePlacesAutocomplete, {
    getGeocode,
    // getLatLng,
} from 'use-places-autocomplete';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxOption,
} from '@reach/combobox';
import { Listbox, ListboxOption } from '@reach/listbox';
import {
    saveSearchType,
    saveSearchPlace,
    saveSearchKeyword,
} from '../../store/actions';

const SearchBox = ({
    fetchGeoData,
    place,
    type,
    keyword,
    saveSearchType,
    saveSearchPlace,
    saveSearchKeyword,
    history,
    sidebar,
}) => {
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
            .then((results) => {
                const addressComponents = results[0].address_components;
                const postalCode = addressComponents.filter((res) => {
                    return res.types.includes('postal_code');
                });
                const locality = addressComponents.filter((res) => {
                    return res.types.includes('locality');
                });
                const administrativeAreaLevel1 = addressComponents.filter(
                    (res) => {
                        return res.types.includes(
                            'administrative_area_level_1'
                        );
                    }
                );
                const country = addressComponents.filter((res) => {
                    return res.types.includes('country');
                });
                if (postalCode.length) {
                    return postalCode[0].long_name;
                }
                if (locality.length) {
                    return locality[0].long_name;
                }
                if (administrativeAreaLevel1.length) {
                    return administrativeAreaLevel1[0].long_name;
                }
                if (country.length) {
                    return country[0].long_name;
                }
                return '';
            })
            .then((place) => {
                saveSearchPlace(place);
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.log('😱 Error: ', error);
            });
    };

    const handleSubmit = (event, history) => {
        event.preventDefault();
        event.stopPropagation();
        // eslint-disable-next-line no-restricted-globals
        history.push({
            pathname: '/such-portal',
            place,
            type,
            keyword,
        });
        fetchGeoData({
            limit: 6,
            start: 0,
            place,
            type,
            responseType: 'mixed',
            keyword,
        });
    };
    return (
        <form
            onSubmit={(event) => handleSubmit(event, history)}
            className="search_box"
        >
            <Combobox
                onSelect={(address) => onComboSelect(address)}
                className="form-row flex-nowrap flex-lg-wrap align-items-center"
            >
                <div className="col-auto">
                    <input
                        className="textfield_text"
                        value={keyword}
                        onChange={(e) => {
                            saveSearchKeyword(e.target.value);
                        }}
                        placeholder="Was suchen Sie?"
                    />
                </div>
                {!sidebar && (
                    <div className="col-auto">
                        <Listbox type={type} onChange={saveSearchType}>
                            <ListboxOption value="alle">ALLE</ListboxOption>
                            <ListboxOption value="article">NEWS</ListboxOption>
                            <ListboxOption value="offer">
                                ANGEBOTE
                            </ListboxOption>
                        </Listbox>
                    </div>
                )}
                {!sidebar && (
                    <div className="col-auto">
                        <ComboboxInput
                            className="textfield_text"
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value);
                                if (e.target.value === '') {
                                    saveSearchPlace('');
                                }
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
                    </div>
                )}
                {/* <div className="col-auto">
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
                </div> */}
                <div className="col-auto">
                    <button type="submit" className="btn-sm search-button">
                        SUCHEN
                    </button>
                </div>
            </Combobox>
        </form>
    );
};

const mapStateToProps = (state) => {
    return {
        place: state.searchData.place,
        type: state.searchData.type,
        keyword: state.searchData.keyword,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveSearchType: (type) => dispatch(saveSearchType(type)),
        saveSearchPlace: (place) => dispatch(saveSearchPlace(place)),
        saveSearchKeyword: (keyword) => dispatch(saveSearchKeyword(keyword)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(SearchBox));

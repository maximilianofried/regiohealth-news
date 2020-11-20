import React from 'react';
import usePlacesAutocomplete, {
    getGeocode,
    // getLatLng,
} from 'use-places-autocomplete';
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxOption,
} from '@reach/combobox';
import { Listbox, ListboxOption } from '@reach/listbox';

const SearchBox = ({
    fetchGeoData,
    place,
    type,
    keyWord,
    setPlace,
    setType,
    setKeyWord,
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
                setPlace(place);
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.log('😱 Error: ', error);
            });
    };

    const handleSubmit = (event) => {
        event.stopPropagation();
        event.preventDefault();
        fetchGeoData({
            limit: 4,
            start: 0,
            place,
            type,
            responseType: 'mixed',
            keyWord,
        });
    };
    return (
        <form onSubmit={(event) => handleSubmit(event)} className="search_box">
            <Combobox
                onSelect={(address) => onComboSelect(address)}
                className="form-row align-items-center"
            >
                <div className="col-auto">
                    <input
                        value={keyWord}
                        onChange={(e) => {
                            setKeyWord(e.target.value);
                        }}
                        placeholder="Was suchst du?"
                    />
                </div>
                <div className="col-auto">
                    <Listbox type={type} onChange={setType}>
                        <ListboxOption value="alle">Alle</ListboxOption>
                        <ListboxOption value="article">Articles</ListboxOption>
                        <ListboxOption value="offer">Offers</ListboxOption>
                    </Listbox>
                </div>
                <div className="col-auto">
                    <ComboboxInput
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                            if (e.target.value === '') {
                                setPlace('');
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
                        <i className="fa fa-search" /> Finden
                    </button>
                </div>
            </Combobox>
        </form>
    );
};

export default SearchBox;

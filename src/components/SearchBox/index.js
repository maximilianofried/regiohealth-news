import React from 'react';
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
import { Listbox, ListboxOption } from '@reach/listbox';

const SearchBox = ({
    fetchGeoData,
    place,
    radius,
    type,
    setPlace,
    setRadius,
    setType,
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
        fetchGeoData({
            limit: 4,
            start: 0,
            place,
            radius,
            type,
            responseType: 'mixed',
        });
    };
    return (
        <form onSubmit={handleSubmit}>
            <Combobox
                onSelect={(address) => onComboSelect(address)}
                className="form-row align-items-center"
            >
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
                <div className="col-auto">
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
                </div>
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

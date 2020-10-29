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
    fetchArticlesCity,
    place,
    radius,
    setPlace,
    setRadius,
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

export default SearchBox;

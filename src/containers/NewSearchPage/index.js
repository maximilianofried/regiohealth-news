import React from 'react';

import AppSearchAPIConnector from '@elastic/search-ui-app-search-connector';

import {
    ErrorBoundary,
    Facet,
    SearchProvider,
    SearchBox,
    Results,
    PagingInfo,
    ResultsPerPage,
    Paging,
    Sorting,
    WithSearch,
} from '@elastic/react-search-ui';
import { Layout } from '@elastic/react-search-ui-views';
import '@elastic/react-search-ui-views/lib/styles/styles.css';
import './elastic-custom-ui.css';
import {
    buildAutocompleteQueryConfig,
    buildFacetConfigFromConfig,
    buildSearchOptionsFromConfig,
    buildSortOptionsFromConfig,
    getConfig,
    getFacetFields,
} from '../../config/config-helper';
import rgOfferPlaceholderSmall from '../../doc/img/dummy_small.png';

const { hostIdentifier, searchKey, endpointBase, engineName } = getConfig();
const connector = new AppSearchAPIConnector({
    searchKey,
    engineName,
    hostIdentifier,
    endpointBase,
});
const config = {
    searchQuery: {
        facets: buildFacetConfigFromConfig(),
        ...buildSearchOptionsFromConfig(),
    },
    autocompleteQuery: buildAutocompleteQueryConfig(),
    apiConnector: connector,
    alwaysSearchOnInitialLoad: true,
    initialState: {
        sortField: 'publish_at',
        sortDirection: 'desc',
    },
};

const CustomResultView = ({ result, onClickLink }) => {
    return (
        <li className="sui-result">
            <div className="sui-result__header">
                <h3>
                    {/* Maintain onClickLink to correct track click throughs for analytics */}
                    <a onClick={onClickLink} href={result.url.raw}>
                        {result.title.raw}
                    </a>
                </h3>
            </div>
            <div className="sui-result__body">
                {/* use 'raw' values of fields to access values without snippets */}
                {result && result.image && result.image.raw ? (
                    <div className="sui-result__image">
                        <img src={result.image.raw} alt="" />
                    </div>
                ) : (
                    <div>
                        <div className="sui-result__image">
                            <img
                                className="result_thumbnail"
                                src={rgOfferPlaceholderSmall}
                                alt=""
                            />
                        </div>
                    </div>
                )}
                {/* Use the 'snippet' property of fields with dangerouslySetInnerHtml to render snippets */}
                {result && result.description && result.description.snippet && (
                    <div
                        className="sui-result__details"
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{
                            __html: result.description.snippet,
                        }}
                    />
                )}
            </div>
        </li>
    );
};

export default function NewSearchPage() {
    return (
        <div className="container">
            <SearchProvider config={config}>
                <WithSearch
                    mapContextToProps={({ wasSearched }) => ({ wasSearched })}
                >
                    {({ wasSearched }) => {
                        return (
                            <div className="App">
                                <ErrorBoundary>
                                    <Layout
                                        header={
                                            <SearchBox
                                                // eslint-disable-next-line react/jsx-boolean-value
                                                autocompleteSuggestions={true}
                                            />
                                        }
                                        sideContent={
                                            <div>
                                                {wasSearched && (
                                                    <Sorting
                                                        label="Sort by"
                                                        sortOptions={buildSortOptionsFromConfig()}
                                                    />
                                                )}
                                                {getFacetFields().map(
                                                    (field) => (
                                                        <Facet
                                                            key={field}
                                                            field={field}
                                                            label={field.replaceAll(
                                                                '_',
                                                                ' '
                                                            )}
                                                        />
                                                    )
                                                )}
                                            </div>
                                        }
                                        bodyContent={
                                            // <Results
                                            //     titleField={getConfig().titleField}
                                            //     urlField={getConfig().urlField}
                                            //     thumbnailField={
                                            //         getConfig().thumbnailField
                                            //     }
                                            //     // eslint-disable-next-line react/jsx-boolean-value
                                            //     shouldTrackClickThrough={true}
                                            // />
                                            <Results
                                                resultView={CustomResultView}
                                            />
                                        }
                                        bodyHeader={
                                            <>
                                                {wasSearched && <PagingInfo />}
                                                {wasSearched && (
                                                    <ResultsPerPage />
                                                )}
                                            </>
                                        }
                                        bodyFooter={<Paging />}
                                    />
                                </ErrorBoundary>
                            </div>
                        );
                    }}
                </WithSearch>
            </SearchProvider>
        </div>
    );
}

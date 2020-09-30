import {
    FETCH_ARTICLES_REQUEST,
    FETCH_ARTICLES_SUCCESS,
    FETCH_ARTICLES_FAILURE,
    CLEAN_FILTERED_ARTICLES,
    LOAD_NEW_PAGE,
    LOAD_EXACT_PAGE,
    SHOW_MORE_ARTICLES}
from "../constants/articlesTypes";

const initialState = {
    loading: false,
    articles: [],
    error: '',
    filteredArticles: [],
    filteredPages: [],
    limit: 2
}

const articlesReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_ARTICLES_REQUEST:
        return {
            ...state,
            loading: true
        }
        case FETCH_ARTICLES_SUCCESS:
        return {
            ...state,
            filteredArticles: action.payload.filteredArticles,
            currentCount: action.payload.currentCount,
            counterPerPage: action.payload.counterPerPage,
            totalCount: action.payload.totalCount,
            currentPage: action.payload.currentPage,
            totalPages: action.payload.totalPages,
            filteredPages: action.payload.filteredPages,
            articles: action.payload.articles,
            limit: action.payload.limit,
            error: '',
        }
        case FETCH_ARTICLES_FAILURE:
        return {
            loading: false,
            articles: [],
            error: action.payload
        }
        case CLEAN_FILTERED_ARTICLES:
        return {
            ...state,
            loading: false,
            filteredArticles: [],
            error: '',
            filteredPages: []
        }
        case LOAD_NEW_PAGE:
            //Clone the previous state
            let loadNewPageState = Object.assign({}, state);
            //How many pages should be added. Will always be 1 or -1
            let addPages = action.payload.page.page;
            //add it to the current
            loadNewPageState.currentPage += addPages;

            let perPage = loadNewPageState.counterPerPage; //20 by default

            let nextArticles;
            if (addPages === 1){
                //Moving from page 1 to 2 will cause ‘upperCount’ to be 40
                let upperCount = loadNewPageState.currentCount + perPage;
                let lowerCount = loadNewPageState.currentCount; //This hasn’t been changed. It will remain 20.
                //Now, we change the currentCount to match ‘upperCount.’ It’ll be used as such
                //at any point after this line
                loadNewPageState.currentCount += loadNewPageState.counterPerPage;
                //Only retrieve products within the (20,40) range (for page 2)
                //Also, notice that we use ‘products’ rather than ‘filteredProducts.’ This is by design.
                //Using the latter would result in an empty array because we only have 20 documents there when
                //the page first loads.
                nextArticles = loadNewPageState.articles && loadNewPageState.articles.slice(lowerCount, upperCount) || [];
            }

            if (addPages ===-1){
                //’currentCount’ has changed roles. Now it serves as the upperCount.
                let upperCount = loadNewPageState.currentCount; //40
                let lowerCount = loadNewPageState.currentCount - perPage; //20
                //Then it’s reset. This way, the first if statement will always treat it as the ‘upperCount’
                loadNewPageState.currentCount = lowerCount;
                nextArticles = loadNewPageState.articles && loadNewPageState.articles.slice(lowerCount - perPage, upperCount - perPage) || [];
            }

            loadNewPageState.filteredArticles = nextArticles;
            window.history.pushState({page: 1}, "title 1", `?page=${loadNewPageState.currentPage}`);
        return loadNewPageState;

        case LOAD_EXACT_PAGE:
            const exactPageState = Object.assign({}, state);
            const exactPage = action.payload.page;
            let upperCountExact = exactPageState.counterPerPage * exactPage;
            let lowerCountExact = upperCountExact - exactPageState.counterPerPage;
            let exactArticles = exactPageState.articles && exactPageState.articles.slice(lowerCountExact, upperCountExact) || [];
            exactPageState.filteredArticles = exactArticles;
            exactPageState.currentCount = upperCountExact;
            exactPageState.currentPage = exactPage;
            window.history.pushState({page: 1}, "title 1", `?page=${exactPageState.currentPage}`);
        return exactPageState;
        default: return state
    }
}

export default articlesReducer;
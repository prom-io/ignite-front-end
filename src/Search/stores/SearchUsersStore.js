import { action, observable, reaction } from "mobx";
import debounce from "@material-ui/core/utils/debounce";
import { axiosInstance } from "../../api/axios-instance";

export class SearchUsersStore {
    @observable
    searchValueHeader = undefined;
    
    @observable
    isSearchActive = false;

    @observable
    searchValuePage = undefined;

    @observable
    searchResultHeader = [];

    @observable
    searchResultPage = [];

    @observable
    shouldResetResultsHeader = false;

    @observable
    shouldResetResultsPage = false;

    @observable
    pendingHeader = false;

    @observable
    pendingPage = false;

    @observable
    searchValuePageIsTouched = false;

    @observable
    searchValueHeaderIsTouched = false;

    @observable
    page = 0;

    @observable
    hasMore = true;

    authorizationStore = undefined;

    constructor(authorizationStore) {
        this.authorizationStore = authorizationStore;

        reaction(
            () => this.searchValueHeader,
            debounce(inputValue => {
                this.shouldResetResultsHeader = true;
                inputValue ? this.doSearch(inputValue) : this.resetSearchHeader();
                this.searchValueHeaderIsTouched = false;
            }, 300)
        );

        reaction(
            () => this.searchValueHeader,
            () => (this.searchValueHeaderIsTouched = true)
        );

        reaction(
            () => this.searchValuePage,
            debounce(inputValue => {
                this.shouldResetResultsPage = true;
                inputValue ? this.fetchSearchPeople() : this.resetSearchPage();
                this.searchValuePageIsTouched = false;
            }, 300)
        );

        reaction(
            () => this.searchValuePage,
            () => (this.searchValuePageIsTouched = true)
        );
    }

    @action
    setSearchValueHeader = searchValueHeader => {
        this.searchValueHeader = searchValueHeader;
    };
    
    @action
    setIsSearchActive = isActive => {
        this.isSearchActive = isActive;
    };

    @action
    setSearchValuePage = searchValuePage => {
        this.searchValuePage = searchValuePage;
    };

    @action
    doSearch = inputValue => {
        if (this.shouldResetResultsHeader) {
            this.searchResultHeader = [];
            this.shouldResetResultsHeader = false;
        }

        this.pendingHeader = true;

        axiosInstance
            .get(`/api/v1/accounts?q=${inputValue}&take=7`)
            .then(({ data }) => {
                this.searchResultHeader = data;
            })
            .catch(() => {})
            .finally(() => (this.pendingHeader = false));
    };

    @action
    fetchSearchPeople = () => {
        if (this.shouldResetResultsPage) {
            this.searchResultPage = [];
            this.page = 0;
            this.hasMore = true;
            this.shouldResetResultsPage = false;
        }

        this.pendingPage = true;

        let searchUrl;
        if (this.page === 0) {
            searchUrl = `/api/v1/accounts?q=${this.searchValuePage}&take=15`;
        } else {
            const skip = this.page * 15;
            searchUrl = `/api/v1/accounts?q=${this.searchValuePage}&skip=${skip}&take=15`;
        }

        axiosInstance
            .get(searchUrl)
            .then(({ data }) => {
                if (data.length > 0) {
                    this.searchResultPage.push(...data);
                    this.page++;
                } else {
                    this.hasMore = false;
                }
            })
            .catch(() => {})
            .finally(() => (this.pendingPage = false));
    };

    @action
    resetSearchHeader = () => {
        this.searchValueHeader = undefined;
        this.searchResultHeader = [];
    };

    @action
    resetSearchPage = () => {
        this.searchValuePage = undefined;
        this.searchResultPage = [];
        this.page = 1;
    };
}

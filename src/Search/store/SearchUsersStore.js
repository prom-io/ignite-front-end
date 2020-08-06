import { action, observable, reaction } from 'mobx';
import { axiosInstance } from "../../api/axios-instance";
import debounce from '@material-ui/core/utils/debounce';

export class SearchUsersStore {
  @observable
  searchValue = undefined;
  
  @observable
  searchResult = [];
  
  @observable
  searchResultStatus = "";
  
  @observable
  shouldResetResults = false;
  
  @observable
  pending = false;
  
  
  authorizationStore = undefined;
  
  constructor(authorizationStore) {
    this.authorizationStore = authorizationStore;
    reaction(
      () => this.searchValue,
      debounce((inputValue) => {
        this.shouldResetResults = true;
        this.doSearch(inputValue);
      }, 350)
    );
  }
  
  @action
  setSearchValue = value => {
    this.searchValue = value;
  };
  @action
  setSearchResult = result => {
    this.searchResult = result;
  };
  
  @action
  doSearch = (inputValue) => {
    if (this.shouldResetResults) {
      this.searchResult = [];
      this.page = 1;
      this.shouldResetResults = false;
    }
    
    this.pending = true;
    
    axiosInstance
      .get(`/api/v1/accounts`,{
        params: {
          q:inputValue,
          take: 5
        }})
      .then( ({data}) => {
        this.setSearchResult(data);
        this.pending = false;
      })
      .catch(err => {
        if (err.response.status === 409) {
          this.searchResultStatus = "already";
        } else {
          this.searchResultStatus = "error";
        }
      });
  };
}

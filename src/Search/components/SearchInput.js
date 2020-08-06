import React  from 'react';
import {makeStyles, FormControl, Input, InputAdornment} from '@material-ui/core';
import { localized } from '../../localization/components';
import { inject, observer } from 'mobx-react';
import SearchResultDropdown from '../../Search/components/SearchResultDropdown';

const useStyles = makeStyles(theme => ({

}));

const _SearchInput = ({searchResult, setSearchValue, searchValue}) => {
  const classes = useStyles();
  console.log(searchResult);
  
  return (
    <>
      <FormControl className={ classes.margin }>
        <Input
          id="input-with-icon-adornment"
          placeholder={"Search"}
          value={searchValue}
          onChange={(e)=>setSearchValue(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <img src="/search.png"/>
            </InputAdornment>
          }
        />
      </FormControl>
      
      {searchResult && <SearchResultDropdown result={searchResult}/>}
    </>
  );
  
};

const mapMobxToProps = ({ searchUsers }) => ({
  setSearchValue: searchUsers.setSearchValue,
  searchResult: searchUsers.searchResult,
  searchValue: searchUsers.searchValue,
});

export const SearchInput = localized(
  inject(mapMobxToProps)(observer(_SearchInput)),
);

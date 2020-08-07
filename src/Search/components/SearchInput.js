import React, { useState } from 'react';
import {makeStyles, FormControl, Input, InputAdornment, ClickAwayListener} from '@material-ui/core';
import { localized } from '../../localization/components';
import { inject, observer } from 'mobx-react';
import {SearchResultDropdown} from '../../Search/components/SearchResultDropdown';

const useStyles = makeStyles(theme => ({
  searchIconButton: {
    width: 34,
    height: 34,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${theme.palette.border.main}`,
    borderRadius: 40,
    marginRight: 16,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#ffdecc',
    }
  },
  searchInput: {
    marginRight: 16,
  }
}));

const _SearchInput = ({searchResult, setSearchValue, searchValue, cleanSearchValue}) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const classes = useStyles();
  
  const handleClickAway = () => {
    cleanSearchValue();
    setIsSearchActive(false);
  };
  
  const closeSearchInput = () => {
    return (
      <div onClick={() => setIsSearchActive(true)} className={classes.searchIconButton}>
        <img src="/search.png"/>
      </div>
    )
  };
  
  const openSearchInput = () => {
    return (
      <>
        <ClickAwayListener onClickAway={handleClickAway}>
          <FormControl className={ classes.searchInput }>
            <Input
              id="input-with-icon-adornment"
              placeholder={"Search"}
              value={searchValue}
              autoComplete={'off'}
              onChange={(e)=>setSearchValue(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <img src="/search.png"/>
                </InputAdornment>
              }
            />
          </FormControl>
        </ClickAwayListener>
    
        {searchResult.length > 0 && <SearchResultDropdown cleanSearchValue={cleanSearchValue} result={searchResult}/>}
      </>
    )
  };
  if (isSearchActive)
    return openSearchInput();
  else return closeSearchInput();
};

const mapMobxToProps = ({ searchUsers }) => ({
  setSearchValue: searchUsers.setSearchValue,
  cleanSearchValue: searchUsers.cleanSearchValue,
  searchResult: searchUsers.searchResult,
  searchValue: searchUsers.searchValue,
});

export const SearchInput = localized(
  inject(mapMobxToProps)(observer(_SearchInput)),
);

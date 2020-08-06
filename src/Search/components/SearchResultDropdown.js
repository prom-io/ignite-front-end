import React  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SearchResultItem } from '../../Search/components/SearchResultItem';

const useStyles = makeStyles(theme => ({
  searchResultDropdown: {
    position: 'absolute',
    top: '50px',
    padding: 15,
    minWidth: 200,
    borderRadius: '4px',
    background: theme.palette.background.paper,
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  }
}));

const SearchResultDropdown = ({result}) => {
  const classes = useStyles();
  console.log(result);
  return (
    <div className={classes.searchResultDropdown}>
      {result.map(item => {
        return <SearchResultItem user={item}/>
      })}
    </div>
  )
};

export default SearchResultDropdown;

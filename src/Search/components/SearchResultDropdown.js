import React  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SearchResultItem } from '../../Search/components/SearchResultItem';
import { Link } from 'mobx-router';
import { Routes } from '../../routes';
import { useLocalization } from '../../store/hooks';
import { inject } from 'mobx-react';

const useStyles = makeStyles(theme => ({
  searchResultDropdown: {
    position: 'absolute',
    top: '50px',
    padding: 15,
    minWidth: 200,
    borderRadius: '4px',
    background: theme.palette.background.paper,
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  },
  searchResultFooter: {
    padding: '16px',
    margin: '0',
    
    '& a': {
      fontFamily: 'Museo Sans Cyrl Regular',
      fontStyle: 'normal',
      fontWeight: 300,
      fontSize: '15px',
      color: theme.palette.primary.main,
      
      '&:hover': {
        textDecoration: 'none',
      },
    },
  },
}));

const _SearchResultDropdown = ({result, cleanSearchValue, routerStore}) => {
  const classes = useStyles();
  const { l } = useLocalization();

  return (
    <div className={classes.searchResultDropdown}>
      {result.map((item, index) => {
        if (index < 6 )
          return <SearchResultItem user={item} cleanSearchValue={cleanSearchValue}/>
        else return null;
      })}
      {result.length > 5 &&
      <div className={classes.searchResultFooter}>
        <Link view={Routes.searchPeople} store={routerStore}>
          {l('user.card.show-more')}
        </Link>
      </div>
      }
    </div>
  )
};

const mapMobxToProps = ({ store }) => ({
  routerStore: store,
});

export const SearchResultDropdown = inject(mapMobxToProps)(_SearchResultDropdown);

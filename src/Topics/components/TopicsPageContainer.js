import React from "react";
import { TopicStatusList } from "./TopicStatusList";
import { BackButton } from "../../components/BackButton";
import { useStore } from "../../store/hooks";
import { Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TopicsIcon } from '../../icons/TopicsIcon';

const useStyles = makeStyles(theme => ({
  topicsError: {
    border: `1px solid ${theme.palette.border.main}`,
    height: '100%',
    padding: '30px',
  },
  topicsErrorInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: '65px',
    fontFamily: 'Museo Sans Cyrl Regular',
    fontSize: '15px',
    lineHeight: '26px',
    color: theme.palette.text.secondary,
    '& p': {
      fontFamily: 'Museo Sans Cyrl Bold',
      fontSize: '20px',
      margin: '24px 0 4px 0',
      color: theme.palette.text.main,
    },
  },
}));


export const TopicsPageContainer = ({currentUser}) => {
    const { fetchAllStatuses } = useStore().topicStatuses;
    const classes = useStyles();
    
    if (!currentUser) {
      return (
        <TopicStatusList fetchAction={fetchAllStatuses} />
      )
    } else  return (
        <>
          <Hidden smDown>
            <BackButton title="appbar.topics" toHome />
          </Hidden>
            <TopicStatusList fetchAction={fetchAllStatuses} />
        </>
    );
};

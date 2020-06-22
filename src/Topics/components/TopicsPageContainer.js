import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

import { TopicStatusList } from "./TopicStatusList";
import { useLocalization } from "../../store/hooks";
import { BackButton } from '../../components/BackButton';

const useStyles = makeStyles((theme) => ({
    topicsTitle: {
        fontWeight: 600,
        fontSize: "20px",
        lineHeight: "24px",
        marginBottom: "24px",
      [theme.breakpoints.down('sm')]: {
       opacity: 0,
      },
    }
}));

export const TopicsPageContainer = () => {
    const classes = useStyles();
    const { l } = useLocalization();

    return (
        <>
          <BackButton title="appbar.topics"/>
          <TopicStatusList />
        </>
    );
};

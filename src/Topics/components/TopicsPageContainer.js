import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

import { TopicStatusList } from "./TopicStatusList";
import { useLocalization } from "../../store/hooks";

const useStyles = makeStyles((theme) => ({
    topicsTitle: {
        fontWeight: 600,
        fontSize: "20px",
        lineHeight: "24px",
        marginBottom: "24px",
      [theme.breakpoints.down('sm')]: {
       display: 'none',
      },
    }
}));

export const TopicsPageContainer = ({setIsTopicsMenuOpen}) => {
    const classes = useStyles();
    const { l } = useLocalization();
  console.log(setIsTopicsMenuOpen);

    return (
        <>
            <Typography className={classes.topicsTitle} variant="h6">
                {l("appbar.topics")}
            </Typography>
            <TopicStatusList setIsTopicsMenuOpen={setIsTopicsMenuOpen}/>
        </>
    );
};

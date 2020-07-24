import React from 'react';
import { Link } from 'mobx-router';
import { makeStyles } from '@material-ui/core/styles';

import { Routes } from '../../routes';

const useStyles = makeStyles(theme => ({
    topicsHashButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '8px 16px',
        marginRight: '4px',
        borderRadius: '30px',
        fontFamily: 'Museo Sans Cyrl Regular',
        backgroundColor: theme.palette.text.main,
        color: theme.palette.background.paper,
        textDecoration: 'none',
    },
}));

export const TopicsHashButton = ({ topic, routerStore }) => {
    const classes = useStyles();

    return (
        <Link
            className={classes.topicsHashButton}
            view={Routes.topic}
            params={{ title: encodeURIComponent(topic.title) }}
            store={routerStore}
        >
            #
            {topic.title}
        </Link>
    );
};

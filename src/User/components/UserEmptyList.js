import React from 'react';
import { observer } from 'mobx-react';
import { Typography, makeStyles } from '@material-ui/core';

import { SadIconLarge } from '../../icons/SadIconLarge';
import { useLocalization } from '../../store';

const useStyles = makeStyles(theme => ({
    link: {
        color: theme.palette.primary.main,
    },
    emptyListContainer: {
        border: `1px solid ${theme.palette.border.main}`,
    },
    emptyListContent: {
        display: 'flex',
        padding: theme.spacing(2),
    },
    emptyListLabel: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: theme.spacing(2),
    },
}));

export const UserEmptyList = observer(({ emptyTag }) => {
    const classes = useStyles();
    const { l } = useLocalization();

    return (
        <div className={classes.emptyListContainer}>
            <div className={classes.emptyListContent}>
                <SadIconLarge />
                <div className={classes.emptyListLabel}>
                    <Typography>
                        <strong>{l(`user.profile.${emptyTag}.empty`)}</strong>
                    </Typography>
                    <Typography>
                        {l('user.alert.empty.part-1')}
                        {' '}
                        <a href="#" className={classes.link}>
                            {l('user.alert.empty.part-2')}
                        </a>
                        {' '}
                        {l('user.alert.empty.part-3')}
                    </Typography>
                </div>
            </div>
        </div>
    );
});

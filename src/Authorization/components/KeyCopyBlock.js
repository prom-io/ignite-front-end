import React from 'react';
import { makeStyles } from '@material-ui/core';
import { CopyToClipboardButton } from '../../CopyToClipboardButton/components';

const useStyles = makeStyles(theme => ({
    key: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '16px',
        fontSize: '15px',
        fontFamily: 'Museo Sans Cyrl Regular',
        '& svg': {
            fill: '#FF5C01',
        },
    },
    keyTitle: {
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
    },
    keyValue: {
        wordWrap: 'break-word',
        marginTop: '6px',
    },
    titleBold: {
        width: '80%',
        fontFamily: 'Museo Sans Cyrl Bold',
        fontSize: '20px',
        lineHeight: '24px',
    },
    keyDisable: {
        color: theme.palette.text.secondary,
    },
}));

export const KeyCopyBlock = ({ children, title, textToCopy, disabled }) => {
    const classes = useStyles();

    return (
        <div className={`${classes.key} ${!children && classes.keyDisable}`}>
            <div className={classes.keyTitle}>
                <div className={classes.titleBold}>{title}</div>
                <span className={classes.keyValue}>{children || 'Hashcode not generated'}</span>
            </div>
            <CopyToClipboardButton textToCopy={textToCopy} disabled={disabled || !children} />
        </div>
    );
};

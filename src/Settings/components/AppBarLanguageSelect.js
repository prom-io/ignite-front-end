import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { Select, MenuItem, ListItemText, InputLabel, makeStyles } from '@material-ui/core';
import { localized } from '../../localization/components';

const useStyles = makeStyles({
    root: {
    },
    styledSelectBox: {
        border: 'none',
        height: 34,
        width: 34,
        borderRadius: 100,
        '& :hover': {
            borderRadius: '100%',
            background:'#FFDECC',
        },
        '& :hover p': {
            color: '#FF5C01'
        },
        '& span:hover p': {
            background: 'none',
            color: '#FF5C01'
        },
        '& div': {
            height: 34,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

        },
        '& svg': {
            left: 35,
        },
        '& .MuiSelect-root': {
            padding: 0,
        },
        '& span': {
            display: 'flex',
            justifyContent: 'center',
            color: '#A2A2A2',
        },
        '& ul': {
            zIndex: 900001,
            position: 'fixed',
        },
        '& .MuiSelect-select:focus': {
            background: 'none',
        }
    },
    styletMenuItem: {
        width: '118px',
        padding: 12,
        '& p': {
            margin: 0,
        },
    },
});

const _AppBarLanguageSelect = ({ setSelectedLanguage, locale, l }) => {
    const classes = useStyles();

    return (
        <>
            <Select
                value={locale}
                className={classes.styledSelectBox}
                onChange={event => setSelectedLanguage(event.target.value)}
                style={{
                    width: '100%',
                }}
                disableUnderline
            >
                <MenuItem value="en" className={classes.styletMenuItem}>
                    <ListItemText>
                        <p>En</p>
                    </ListItemText>
                </MenuItem>
                <MenuItem value="ko" className={classes.styletMenuItem}>
                    <ListItemText>
                        <p>Ko</p>
                    </ListItemText>
                </MenuItem>
            </Select>
        </>
    );
};

const mapMobxToProps = ({ localization }) => ({
    setSelectedLanguage: localization.setSelectedLanguage,
});

export const AppBarLanguageSelect = localized(
    inject(mapMobxToProps)(observer(_AppBarLanguageSelect)),
);

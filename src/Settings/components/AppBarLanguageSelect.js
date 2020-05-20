import React, {Fragment} from "react";
import {inject, observer} from "mobx-react";
import {Select, MenuItem, ListItemText, InputLabel, makeStyles} from "@material-ui/core";
import {localized} from "../../localization/components";

const useStyles = makeStyles({
    root: {
        '& .MuiInput-underline:after': {
            border: '1px solid red'
        },
    },
    styledSelectBox: {
        border: 'none',
        height: 34,
        width: 34,
        borderRadius: 100,
        '& div': {
            height: 34,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'

        },
        '& svg': {
            left: 35
        },
        '& .MuiSelect-root': {
            padding: 0
        },
        '& span': {
            display: 'flex',
            justifyContent: 'center',
            color: '#A2A2A2'
        },
        '& ul': {
            border: '1px solid red',
            zIndex: 900001,
            position: 'fixed'
        }
    },
})

const _AppBarLanguageSelect = ({setSelectedLanguage, locale, l}) => {

  const classes = useStyles();

    return (
        <Fragment>
            <Select value={locale}
                    className={classes.styledSelectBox}
                    onChange={event => setSelectedLanguage(event.target.value)}
                    style={{
                        width: "100%"
                    }}
                    disableUnderline
            >
                <MenuItem value="en" className={classes.styletMenuItem}>
                    <ListItemText>
                        <p>En</p>
                    </ListItemText>
                </MenuItem>
                <MenuItem value="ko">
                    <ListItemText>
                        <p>Ko</p>
                    </ListItemText>
                </MenuItem>
            </Select>
        </Fragment>
    )
};

const mapMobxToProps = ({localization}) => ({
    setSelectedLanguage: localization.setSelectedLanguage
});

export const AppBarLanguageSelect = localized(
    inject(mapMobxToProps)(observer(_AppBarLanguageSelect))
);

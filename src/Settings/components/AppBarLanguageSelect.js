import React, { Fragment } from "react";
import { inject, observer } from "mobx-react";
import {
    Select,
    MenuItem,
    ListItemText,
    InputLabel,
    makeStyles
} from "@material-ui/core";
import { localized } from "../../localization/components";
import Menu from "@material-ui/core/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
    styledSelectBox: {
        border: "none",
        height: 34,
        width: 34,
        borderRadius: 100,
        "&:hover": {
            borderRadius: "100%",
            background: "#FFDECC"
        },
        "& svg": {
            left: 35
        }
    },
    styleMenuItem: {
        width: "auto",
        margin: "0 16px",
        padding: "16px 0",
        minHeight: "50px",
        borderBottom: "1px solid rgba(0,43,47,.15)",
        textAlign: "center",
        "&:last-child": {
            borderBottom: "none"
        },
        "&:hover": {
            background: "rgba(255,255,255,0)"
        }
    },
    buttonMenuRoot: {
        height: 34,
        width: 34,
        borderRadius: 100,
        "&:hover": {
            background: "rgba(255,255,255,0)"
        },
        "&:active": {
            background: "rgba(255,255,255,0)"
        }
    },
    testClass: {
        padding: 0,
        borderTop: "2px solid #131315"
    }
});

const _AppBarLanguageSelect = ({ setSelectedLanguage, locale, l }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [lang, setLang] = React.useState(locale);
    const anchorRef = React.useRef(null);

    const handleListKeyDown = event => {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        }
    };

    const handleSelectLang = currentLang => {
        setLang(currentLang);
        setSelectedLanguage(currentLang);
        setOpen(false);
    };

    return (
        <>
            <Button
                ref={anchorRef}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={() => setOpen(prevOpen => !prevOpen)}
                classes={{
                    label: classes.styledSelectBox,
                    root: classes.buttonMenuRoot
                }}
            >
                {lang}
            </Button>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === "bottom"
                                    ? "center top"
                                    : "center bottom"
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={() => setOpen(false)}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="menu-list-grow"
                                    onKeyDown={handleListKeyDown}
                                    classes={{ root: classes.testClass }}
                                >
                                    <MenuItem
                                        classes={{ root: classes.styleMenuItem }}
                                        value="en"
                                        onClick={() => handleSelectLang("en")}
                                    >
                                        English
                                    </MenuItem>
                                    <MenuItem
                                        classes={{ root: classes.styleMenuItem }}
                                        value="ko"
                                        onClick={() => handleSelectLang("ko")}
                                    >
                                        Korean
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
};

const mapMobxToProps = ({ localization }) => ({
    setSelectedLanguage: localization.setSelectedLanguage
});

export const AppBarLanguageSelect = localized(
    inject(mapMobxToProps)(observer(_AppBarLanguageSelect))
);

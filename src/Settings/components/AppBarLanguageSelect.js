import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import {
    MenuItem,
    makeStyles,
} from '@material-ui/core';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { localized } from '../../localization/components';

const useStyles = makeStyles(theme => ({
    styledSelectBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: `1px solid ${theme.palette.border.main}`,
        height: 34,
        width: 34,
        borderRadius: 100,
        color: '#A2A2A2',
        fontFamily: 'Museo Sans Cyrl Regular',
        '& svg': {
            left: 35,
            marginLeft: '10px',
        },
    },
    styledSelectOpen: {
        [theme.breakpoints.down('sm')]: {
            '&:hover': {
                background: 'rgba(255,255,255,0)',
                color: '#A2A2A2',
            },
        },
    },
    styleMenuItem: {
        width: 'auto',
        margin: '0 16px',
        padding: '16px 0',
        minHeight: '50px',
        borderBottom: '1px solid rgba(0,43,47,.15)',
        textAlign: 'center',
        '&:last-child': {
            borderBottom: 'none',
        },
        '&:hover': {
            background: 'rgba(255,255,255,0)',
        },
        '& span': {
            color: 'rgba(255,255,255,0)',
        },
    },
    buttonMenuRoot: {
        transition: 'none',
        color: 'rgba(255,255,255,0)',
        '&:hover': {
            background: 'rgba(255,255,255,0)',
        },
    },
    buttonMenuLabel: {
        width: 'auto',
        '&:hover': {
            '& span': {
                borderRadius: '100%',
                background: '#FFDECC',
            }
        },
    },
    menuList: {
        padding: 0,
        width: '118px',
    },
    arrowAnimate: {
        transform: 'rotate(180deg)',
    },
}));

const _AppBarLanguageSelect = ({ setSelectedLanguage, locale }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleListKeyDown = event => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    };

    const handleSelectLang = currentLang => {
        setSelectedLanguage(currentLang);
        setOpen(false);
    };

    return (
        <>
            <ClickAwayListener
              onClickAway={() => setOpen(false)}
              touchEvent="onTouchStart"
              mouseEvent="onMouseDown"
            >
            <Button
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={() => setOpen(prevOpen => !prevOpen)}
                classes={{
                    label: classes.buttonMenuLabel,
                    root: classes.buttonMenuRoot,
                }}
            >
                <span className={open ? classes.styledSelectBox : `${classes.styledSelectBox} ${classes.styledSelectOpen}`}>{locale.charAt(0).toUpperCase() + locale.slice(1)}</span>
                <ArrowDropDownIcon
                    style={{ color: '#A2A2A2' }}
                    classes={{
                        root: open && classes.arrowAnimate,
                    }}
                />
            </Button>
            </ClickAwayListener>
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
                                placement === 'bottom'
                                    ? 'center top'
                                    : 'center bottom',
                        }}
                    >
                        <Paper>
                                <MenuList
                                    autoFocusItem={open}
                                    id="menu-list-grow"
                                    onKeyDown={handleListKeyDown}
                                    classes={{ root: classes.menuList }}
                                >
                                    <MenuItem
                                        classes={{ root: classes.styleMenuItem }}
                                        value="en"
                                        onClick={() => handleSelectLang('en')}
                                    >
                                        English
                                    </MenuItem>
                                    <MenuItem
                                        classes={{ root: classes.styleMenuItem }}
                                        value="kr"
                                        onClick={() => handleSelectLang('kr')}
                                    >
                                        한국어
                                    </MenuItem>
                                </MenuList>
                        </Paper>
                    </Grow>
                )}
            </Popper>
            
        </>
    );
};

const mapMobxToProps = ({ localization }) => ({
    setSelectedLanguage: localization.setSelectedLanguage,
});

export const AppBarLanguageSelect = localized(
    inject(mapMobxToProps)(observer(_AppBarLanguageSelect)),
);

import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import {
    makeStyles,
    FormControl,
    Input,
    InputAdornment,
    IconButton,
    ClickAwayListener,
    useTheme
} from "@material-ui/core";
import { Close } from "@material-ui/icons";

import { localized } from "../../localization/components";
import { SearchResultDropdown } from "../../Search/components";
import { SearchIcon } from "../../icons/SearchIcon";

const useStyles = makeStyles(theme => ({
    searchIconButton: {
        width: 34,
        height: 34,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `1px solid ${theme.palette.border.main}`,
        borderRadius: 40,
        marginRight: 16,
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#ffdecc"
        }
    },
    searchInput: {
        marginRight: "16px"
    },
    searchInputCloseIcon: {
        padding: "3px"
    }
}));

const _SearchInput = ({
    searchResultHeader,
    searchValueHeader,
    searchValueHeaderIsTouched,
    pending,
    setSearchValueHeader,
    l
}) => {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const classes = useStyles();
    const theme = useTheme();

    const handleClickAway = () => {
        setIsSearchActive(false);
    };

    const closeSearchInput = () => (
        <div
            onClick={() => setIsSearchActive(true)}
            className={classes.searchIconButton}
        >
            <SearchIcon color={theme.palette.text.secondary} />
        </div>
    );

    const openSearchInput = () => (
        <>
            <ClickAwayListener onClickAway={handleClickAway}>
                <FormControl className={classes.searchInput}>
                    <Input
                        placeholder={l("appbar.search")}
                        value={searchValueHeader}
                        autoComplete="off"
                        onChange={e => setSearchValueHeader(e.target.value)}
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon color={theme.palette.text.secondary} />
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    classes={{ root: classes.searchInputCloseIcon }}
                                    onClick={() => setSearchValueHeader("")}
                                >
                                    <Close />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </ClickAwayListener>

            {searchValueHeader && (
                <SearchResultDropdown
                    searchValueHeader={searchValueHeader}
                    searchValueHeaderIsTouched={searchValueHeaderIsTouched}
                    searchResult={searchResultHeader}
                    pending={pending}
                />
            )}
        </>
    );

    return isSearchActive ? openSearchInput() : closeSearchInput();
};

const mapMobxToProps = ({ searchUsers }) => ({
    searchResultHeader: searchUsers.searchResultHeader,
    searchValueHeader: searchUsers.searchValueHeader,
    searchValueHeaderIsTouched: searchUsers.searchValueHeaderIsTouched,
    pending: searchUsers.pendingHeader,
    setSearchValueHeader: searchUsers.setSearchValueHeader
});

export const SearchInput = localized(inject(mapMobxToProps)(observer(_SearchInput)));

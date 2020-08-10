import React from "react";
import { inject, observer } from "mobx-react";
import { Grid, makeStyles } from "@material-ui/core";

import { SearchPeopleList } from "../../Search/components";
import { BackButton } from "../../components/BackButton";
import { localized } from "../../localization/components";

const useStyles = makeStyles(theme => ({
    searchBackButton: {
        [theme.breakpoints.down("sm")]: {
            position: "fixed",
            top: 0,
            zIndex: 1100,
            width: "100%",
            background: theme.palette.background.paper
        }
    },
    searchInputWrapper: {
        background: theme.palette.background.light,
        border: `1px solid ${theme.palette.border.main}`,
        borderRadius: "4px 4px 0px 0px",
        marginTop: "16px",
        padding: "16px",
        [theme.breakpoints.down("sm")]: {
            marginTop: 0
        }
    },
    searchInput: {
        boxSizing: "border-box",
        fontFamily: "Museo Sans Cyrl Regular",
        fontWeight: 300,
        fontSize: "15px",
        lineHeight: "18px",
        height: 42,
        width: "100%",
        borderRadius: 30,
        border: `1px solid ${theme.palette.border.main}`,
        outline: "none",
        padding: "0 105px 0 24px"
    }
}));

const _SearchPeopleContainer = ({ searchValuePage, setSearchValuePage, l }) => {
    const classes = useStyles();

    return (
        <Grid container spacing={2}>
            <Grid xs={12}>
                <div className={classes.searchBackButton}>
                    <BackButton title="search-people" toHome />
                </div>
                <div className={classes.searchInputWrapper}>
                    <input
                        className={classes.searchInput}
                        type="text"
                        placeholder={l("search.people.enter")}
                        value={searchValuePage}
                        onChange={e => setSearchValuePage(e.target.value)}
                    />
                </div>
                {searchValuePage && <SearchPeopleList />}
            </Grid>
        </Grid>
    );
};

const mapMobxToProps = ({ searchUsers }) => ({
    searchValuePage: searchUsers.searchValuePage,
    setSearchValuePage: searchUsers.setSearchValuePage
});

export const SearchPeopleContainer = localized(
    inject(mapMobxToProps)(observer(_SearchPeopleContainer))
);

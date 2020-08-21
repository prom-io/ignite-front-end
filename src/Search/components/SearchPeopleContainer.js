import React from "react";
import { inject, observer } from "mobx-react";
import { Link } from "mobx-router";
import { Button, Grid, makeStyles } from "@material-ui/core";

import { SearchPeopleList } from "../../Search/components";
import { BackButton } from "../../components/BackButton";
import { localized } from "../../localization/components";
import { Routes } from "../../routes";
import { routerStore } from "../../store";

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
    followInputRow: {
        position: "relative",

        "& input": {
            boxSizing: "border-box",
            fontFamily: "Museo Sans Cyrl Regular",
            fontStyle: "normal",
            fontWeight: 300,
            fontSize: "15px",
            lineHeight: "18px",
            height: 42,
            width: "100%",
            borderRadius: 30,
            border: `1px solid ${theme.palette.border.main}`,
            outline: "none",
            padding: "0 105px 0 24px"
        },

        "& button": {
            position: "absolute",
            right: 0,
            maxWidth: 95,
            borderRadius: 30,
            height: 42,
            fontWeight: 600,
            fontSize: "15px",
            lineHeight: "18px",

            "&.Mui-disabled": {
                fontSize: "15px !important",
                pointerEvents: "auto !important",
                cursor: "no-drop !important"
            }
        }
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
                    <div className={classes.followInputRow}>
                        <input
                            type="text"
                            placeholder={l("search.people.enter")}
                            value={searchValuePage}
                            onChange={e => setSearchValuePage(e.target.value)}
                        />
                        <Link
                            view={Routes.searchPeople}
                            queryParams={{ q: searchValuePage }}
                            store={routerStore}
                        >
                            <Button
                                color="primary"
                                variant="contained"
                                disabled={!searchValuePage || !searchValuePage.trim()}
                                fullWidth
                            >
                                {l("appbar.search")}
                            </Button>
                        </Link>
                    </div>
                </div>
                <SearchPeopleList />
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

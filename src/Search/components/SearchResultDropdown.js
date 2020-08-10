import React from "react";
import { Link } from "mobx-router";
import { Paper, Typography, makeStyles } from "@material-ui/core";

import Loader from "../../components/Loader";
import { SearchResultDropdownItem } from "../../Search/components";
import { Routes } from "../../routes";
import { routerStore } from "../../store";
import { useLocalization } from "../../store/hooks";

const useStyles = makeStyles(theme => ({
    searchResultDropdown: {
        position: "absolute",
        top: "50px",
        overflow: "hidden",
        minWidth: "200px"
    },
    searchResultFooter: {
        padding: "16px",

        "& a": {
            fontFamily: "Museo Sans Cyrl Regular",
            fontStyle: "normal",
            fontWeight: 300,
            fontSize: "15px",
            color: theme.palette.primary.main,

            "&:hover": {
                textDecoration: "none"
            }
        }
    },
    centered: {
        marginLeft: "auto",
        marginRight: "auto",
        display: "table"
    },
    notFound: {
        color: "#000",
        padding: "16px"
    }
}));

export const SearchResultDropdown = ({ searchResult, showMore, pending }) => {
    const classes = useStyles();
    const { l } = useLocalization();

    return (
        <Paper className={classes.searchResultDropdown} elevation={3}>
            {searchResult.length !== 0 &&
                !pending &&
                searchResult.map((item, index) => {
                    if (index < 6) {
                        return (
                            <SearchResultDropdownItem key={item.id} user={item} />
                        );
                    }
                })}

            {pending && (
                <div className={classes.centered}>
                    <Loader size="md" css="top: 11px; left: 13px" />
                </div>
            )}

            {!pending && searchResult.length === 0 && (
                <Typography classes={{ root: classes.notFound }}>
                    Not found
                </Typography>
            )}

            {searchResult.length > 6 && (
                <div className={classes.searchResultFooter}>
                    <Link view={Routes.searchPeople} store={routerStore}>
                        <div onClick={showMore}>{l("user.card.show-more")}</div>
                    </Link>
                </div>
            )}
        </Paper>
    );
};

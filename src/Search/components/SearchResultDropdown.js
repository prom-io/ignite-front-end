import React from "react";
import { Link } from "mobx-router";
import { Paper, Typography, makeStyles } from "@material-ui/core";

import Loader from "../../components/Loader";
import { SearchResultItem } from "../../Search/components";
import { Routes } from "../../routes";
import { routerStore } from "../../store";
import { useLocalization } from "../../store/hooks";

const useStyles = makeStyles(theme => ({
    searchResultDropdown: {
        position: "absolute",
        top: "50px",
        padding: "15px",
        minWidth: "170px"
    },
    searchResultFooter: {
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
        color: "#000"
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
                        return <SearchResultItem user={item} />;
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
                    <div onClick={showMore}>
                        <Link view={Routes.searchPeople} store={routerStore}>
                            {l("user.card.show-more")}
                        </Link>
                    </div>
                </div>
            )}
        </Paper>
    );
};

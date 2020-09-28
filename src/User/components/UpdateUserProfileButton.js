import React from "react";
import { inject, observer } from "mobx-react";
import { Link } from "mobx-router";
import { Button, makeStyles } from "@material-ui/core";

import { Routes } from "../../routes";
import { localized } from "../../localization/components";

const useStyles = makeStyles(() => ({
    editButtonWrapper: {
        padding: "24px",
        width: "100%"
    },
    editButtonLink: {
        display: "block",
        textDecoration: "none",
        maxWidth: "204px",
        height: "40px",
        width: "100%",
        margin: "0 auto",

        "& button": {
            textTransform: "capitalize",
            width: "100%",
            height: "40px",
            borderRadius: "30px",
            background: "transparent",
            fontWeight: 600,
            fontSize: "15px",
            lineHeight: "18px"
        }
    }
}));

const _UpdateUserProfileButton = ({ routerStore, l }) => {
    const classes = useStyles();

    return (
        <div className={classes.editButtonWrapper}>
            <Link
                className={classes.editButtonLink}
                store={routerStore}
                view={Routes.userEdit}
            >
                <Button color="primary" variant="outlined">
                    {l("user.edit-profile")}
                </Button>
            </Link>
        </div>
    );
};

const mapMobxToProps = ({ store }) => ({
    routerStore: store
});

export const UpdateUserProfileButton = localized(
    inject(mapMobxToProps)(observer(_UpdateUserProfileButton))
);

import React from "react";
import {inject, observer} from "mobx-react";
import {Button, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    openLoginDialogButton: {
        borderRadius: 30,
        width: 114,
        fontStyle: "normal"
    },
}));

const _OpenLoginDialogButton = ({setLoginDialogOpen}) => {
    const classes = useStyles();

    return (
        <Button className={classes.openLoginDialogButton}
                onClick={() => setLoginDialogOpen(true)}
                variant="contained"
                disableElevation
                color="primary"
        >
            <strong>Log in</strong>
        </Button>
    )
};

const mapMobxToProps = ({login}) => ({setLoginDialogOpen: login.setLoginDialogOpen});

export const OpenLoginDialogButton = inject(mapMobxToProps)(observer(_OpenLoginDialogButton));


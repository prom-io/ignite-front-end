import React from "react";
import { inject, observer } from "mobx-react";
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    makeStyles,
    withMobileDialog
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    dialogActionButton: {
        cancelButton: {
            background: "transparent",
            maxWidth: 374,
            marginLeft: "auto",
            marginRight: "auto",
            display: "table",
            fontFamily: "Museo Sans Cyrl Regular",
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "15px",
            lineHeight: "18px",
            textAlign: "center",
            color: theme.palette.primary.main,
            marginTop: "24px"
        },

        unfollowButton: {
            maxWidth: 374,
            marginLeft: "auto",
            marginRight: "auto",
            display: "table",
            fontFamily: "Museo Sans Cyrl Regular",
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "15px",
            lineHeight: "18px",
            textAlign: "center",
            color: theme.palette.primary.main,
            marginTop: "24px"
        }
    }
}));

const _FollowDialog = ({
    unfollowUser,
    followDialogOpen,
    setFollowDialogOpen,
    fullScreen
}) => {
    const classes = useStyles();

    return (
        <Dialog
            open={followDialogOpen}
            onClose={() => setFollowDialogOpen(false)}
            fullScreen={fullScreen}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>Вы уверены?</DialogTitle>
            <DialogContent>
                <Button
                    variant="text"
                    className={[classes.dialogActionButton, cancelButton].join(" ")}
                    onClick={() => {
                        setFollowDialogOpen(false);
                    }}
                >
                    {l("user.profile.cancel")}
                </Button>
                <Button
                    variant="text"
                    className={[classes.dialogActionButton, unfollowButton].join(
                        " "
                    )}
                    onClick={unfollowUser}
                >
                    {l("user.profile.unfollow")}
                </Button>
            </DialogContent>
        </Dialog>
    );
};

const mapMobxToProps = ({ followDialog }) => ({
    unfollowUser: followDialog.unfollowUser,
    setFollowDialogOpen: followDialog.setFollowDialogOpen,
    followDialogOpen: followDialog.followDialogOpen
});

export const FollowDialog = withMobileDialog()(
    inject(mapMobxToProps)(observer(_FollowDialog))
);

import React from "react";
import { inject } from "mobx-react";
import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    DialogTitle,
    IconButton,
    makeStyles
} from "@material-ui/core";

import { ModalCloseIcon } from "../../icons/ModalCloseIcon";
import { localized } from "../../localization/components";

const useStyles = makeStyles(theme => ({
    leaveDialog: {
        position: "relative",
        maxWidth: "291px",
        padding: "52px 32px"
    },
    leaveDialogCloseBtn: {
        position: "absolute",
        top: 0,
        right: 0,
        width: "40px",
        height: "40px",
        margin: "8px",
        lineHeight: 0
    },
    leaveDialogTitle: {
        marginBottom: "24px",
        padding: 0,

        "& h2": {
            fontWeight: 600,
            fontSize: "20px",
            lineHeight: "24px",
            color: theme.palette.text.main,
            marginBottom: 0
        }
    },
    leaveDialogContent: {
        marginBottom: "24px",
        padding: 0,

        "& p": {
            margin: 0,
            fontWeight: 300,
            fontSize: "15px",
            lineHeight: "26px",
            color: theme.palette.text.main
        }
    },
    dialogActionsButton: {
        justifyContent: "space-between",
        padding: 0,

        "& button": {
            height: "40px",
            fontWeight: 600,
            fontSize: "15px",
            lineHeight: "18px",
            borderRadius: 30
        },

        "& button:first-child": {
            width: "124px",
            [theme.breakpoints.down("sm")]: {
                marginRight: "8px"
            }
        },

        "& button:last-child": {
            width: "146px",
            marginLeft: 0
        }
    },
    dialogPaper: {
        margin: "15px"
    }
}));

const _CommunityLeaveDialog = ({
    selectedCommunity,
    leaveCommunity,
    leaveDialogOpen,
    setLeaveDialogOpen,
    l
}) => {
    const classes = useStyles();

    return (
        <Dialog
            open={leaveDialogOpen}
            onClose={() => setLeaveDialogOpen(false)}
            classes={{
                paper: classes.dialogPaper
            }}
        >
            <div className={classes.leaveDialog}>
                <IconButton
                    onClick={() => setLeaveDialogOpen(false)}
                    className={classes.leaveDialogCloseBtn}
                >
                    <ModalCloseIcon />
                </IconButton>
                <DialogTitle className={classes.leaveDialogTitle}>
                    {l("community.dialog.leave-from")} @{selectedCommunity}?
                </DialogTitle>
                <DialogContent className={classes.leaveDialogContent}>
                    <DialogContentText>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Libero repudiandae dolorum explicabo adipisci, ipsam eligendi
                        vel molestiae deleniti reiciendis nesciunt.
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={classes.dialogActionsButton}>
                    <Button
                        color="primary"
                        variant="outlined"
                        className={classes.cancelButton}
                        onClick={() => {
                            setLeaveDialogOpen(false);
                        }}
                        autoFocus
                    >
                        {l("dialog.cancel")}
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.leaveButton}
                        onClick={leaveCommunity}
                    >
                        {l("community.button.leave")}
                    </Button>
                </DialogActions>
            </div>
        </Dialog>
    );
};

const mapMobxToProps = ({ communities }) => ({
    selectedCommunity: communities.selectedCommunity,
    leaveCommunity: communities.leaveCommunity,
    setLeaveDialogOpen: communities.setLeaveDialogOpen,
    leaveDialogOpen: communities.leaveDialogOpen
});

export const CommunityLeaveDialog = localized(
    inject(mapMobxToProps)(_CommunityLeaveDialog)
);

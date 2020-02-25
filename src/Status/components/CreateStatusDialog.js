import React from "react";
import {inject, observer} from "mobx-react";
import {Dialog, DialogTitle, DialogContent, Button, IconButton, makeStyles, CircularProgress} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {CreateStatusForm} from "./CreateStatusForm";

const useStyles = makeStyles(() => ({
    createStatusButton: {
        borderRadius: 30,
        float: "right",
        width: "114px",
    }
}));

const _CreateStatusDialog = ({
    createStatusDialogOpen,
    setCreateStatusDialogOpen,
    content,
    pending,
    createStatus
}) => {
    const classes = useStyles();

    return (
        <Dialog open={createStatusDialogOpen}
                onClose={() => setCreateStatusDialogOpen(false)}
                fullScreen
        >
            <DialogTitle>
                <IconButton onClick={() => setCreateStatusDialogOpen(false)}
                            disabled={pending}
                >
                    <ArrowBackIcon/>
                </IconButton>
                <Button className={classes.createStatusButton}
                        onClick={createStatus}
                        disabled={pending || content.length === 0}
                        color="primary"
                        variant="contained"
                >
                    {pending && <CircularProgress size={15}/>}
                    Send
                </Button>
            </DialogTitle>
            <DialogContent>
                <CreateStatusForm hideSendButton/>
            </DialogContent>
        </Dialog>
    )
};

const mapMobxToProps = ({createStatus}) => ({
    createStatusDialogOpen: createStatus.createStatusDialogOpen,
    setCreateStatusDialogOpen: createStatus.setCreateStatusDialogOpen,
    content: createStatus.content,
    pending: createStatus.pending,
    createStatus: createStatus.createStatus
});

export const CreateStatusDialog = inject(mapMobxToProps)(observer(_CreateStatusDialog));

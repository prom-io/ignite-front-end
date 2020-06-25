import React from 'react';
import { inject, observer } from 'mobx-react';
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    makeStyles,
    withMobileDialog,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { CreateStatusForm } from './CreateStatusForm';
import { localized } from '../../localization/components';
import Loader from '../../components/Loader';

const useStyles = makeStyles((theme) => ({
    createStatusButton: {
        borderRadius: 30,
        float: 'right',
        width: '114px',
    },
    statusFormDialog: {
        top: '-50px',
        overflow: 'unset',
        zIndex: 1500,
        [theme.breakpoints.down('sm')]: {
            top: '0px',
            overflowY: 'scroll',
        },
    },
    statusFormDialogTitle: {
        padding: '16px 24px 0 24px',
        '& h2': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
    },
    statusFormDialogContent: {
        overflow: 'unset',
        border: 'none',
        padding: 0,
    },
}));

const _CreateStatusDialog = ({
    createStatusDialogOpen,
    setCreateStatusDialogOpen,
    content,
    pending,
    uploadedAttachments,
    mediaAttachmentUploadPending,
    createStatus,
    fullScreen,
    l,
}) => {
    const classes = useStyles();

    return (
        <Dialog
            open={createStatusDialogOpen}
            onClose={() => setCreateStatusDialogOpen(false)}
            fullScreen={fullScreen}
            scroll="body"
            fullWidth
            maxWidth="md"
            classes={{
                paper: classes.statusFormDialog,
            }}
            BackdropProps={{
                style: {
                    backgroundColor: 'rgba(44,44,44,0.84)',
                },
            }}
        >
            <DialogTitle classes={{ root: classes.statusFormDialogTitle }}>
                <IconButton
                    onClick={() => setCreateStatusDialogOpen(false)}
                    disabled={pending}
                >
                    <ArrowBackIcon />
                </IconButton>
                <Button
                    className={classes.createStatusButton}
                    onClick={createStatus}
                    disabled={pending || mediaAttachmentUploadPending || !(content.length > 0 || uploadedAttachments.length !== 0)}
                    color="primary"
                    variant="contained"
                >
                    {pending && <Loader size="md" css="position:absolute; top: -2px; left: 40px" />}
                    {l('status.send')}
                </Button>
            </DialogTitle>
            <DialogContent classes={{ root: classes.statusFormDialogContent }}>
                <CreateStatusForm hideSendButton isDialogEmojiPicker />
            </DialogContent>
        </Dialog>
    );
};

const mapMobxToProps = ({ createStatus }) => ({
    createStatusDialogOpen: createStatus.createStatusDialogOpen,
    setCreateStatusDialogOpen: createStatus.setCreateStatusDialogOpen,
    content: createStatus.content,
    pending: createStatus.pending,
    mediaAttachmentUploadPending: createStatus.mediaAttachmentUploadPending,
    createStatus: createStatus.createStatus,
    uploadedAttachments: createStatus.mediaAttachments,
});

export const CreateStatusDialog = localized(
    withMobileDialog()(
        inject(mapMobxToProps)(observer(_CreateStatusDialog)),
    ),
);

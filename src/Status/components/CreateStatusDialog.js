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

const useStyles = makeStyles(() => ({
    createStatusButton: {
        borderRadius: 30,
        float: 'right',
        width: '114px',
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
            style={{
                zIndex: 15000000000,
            }}
            fullWidth
            maxWidth="md"
            BackdropProps={{
                style: {
                    backgroundColor: 'rgba(44,44,44,0.84)',
                },
            }}
        >
            <DialogTitle>
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
                    {pending && <Loader size={'md'} />}
                    {l('status.send')}
                </Button>
            </DialogTitle>
            <DialogContent>
                <CreateStatusForm hideSendButton />
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

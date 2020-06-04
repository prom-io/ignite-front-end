import React from 'react';
import { inject, observer } from 'mobx-react';
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CircularProgress,
    Grid,
    makeStyles,
    TextField,
    Typography,
} from '@material-ui/core';
import { AttachImageInput } from './AttachImageInput';
import { CreateStatusFormMediaAttachments } from './CreateStatusFormMediaAttachments';
import { RepostedStatusContent } from './RepostedStatusContent';
import { localized } from '../../localization/components';

const useStyles = makeStyles(theme => ({
    createStatusFormCard: {
        background: '#F1EBE8',
    },
    remainingCharactersCounter: {
        padding: '7px 10px',
    },
    createStatusButtonWrapper: {
        paddingTop: 15,
    },
    createStatusButton: {
        borderRadius: 30,
        float: 'right',
        width: '114px',
        boxShadow: 'none',
    },
    mediaAttachmentsContainer: {
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    cardActionsStyled: {
        display: 'flex',
        padding: '8px 15px',
    },
    customTextarea: {
        paddingLeft: 20,
        width: '95%',
        border: 'none',
        '& .MuiInput-underline:before': {
            borderBottom: 'none',
        },
        '& .MuiInput-underline:hover': {
            borderBottom: 'none',
        },
        '& .MuiInput-underline:after': {
            borderBottom: 'none',
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottom: 'none',
        },
    },
    containerRoot: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexWrap: 'nowrap',
    }
}));

const getDisabledLabelForAttachmentsInput = (maxAttachments, l) => {
    const maxAttachmentsString = `${maxAttachments}`;
    const isPlural = maxAttachmentsString.charAt(maxAttachmentsString.length - 1) !== '1';
    const bindings = { limit: 1 };
    const labelKey = isPlural ? 'status.images-attachments-limit.plural' : 'status.images-attachments-limit';

    return l(labelKey, bindings);
};

const _CreateStatusForm = ({
    charactersRemaining,
    submissionError,
    content,
    pending,
    currentUserAvatar,
    setContent,
    createStatus,
    mediaAttachmentsFiles,
    addMediaAttachments,
    removeMediaAttachment,
    uploadedAttachments,
    hideSendButton = false,
    referredStatus,
    statusReferenceType,
    setReferredStatus,
    setStatusReferenceType,
    mediaAttachmentUploadPending,
    l,
}) => {
    const classes = useStyles();

    return (
        <Card className={classes.createStatusFormCard} className="create-status-form">
            <Grid
                container
                style={{
                    padding: '25px 15px 0px',
                }}
            >
                {referredStatus && (
                    <Grid item xs={12}>
                        <Typography>
                            {statusReferenceType === 'REPOST'
                                ? l('status.reposted-status')
                                : `${l('status.replying-to')}: `}
                        </Typography>
                        <RepostedStatusContent
                            repostedStatus={referredStatus}
                            displayClearButton
                            onClearButtonClick={() => {
                                setReferredStatus(undefined);
                                setStatusReferenceType(undefined);
                            }}
                        />
                    </Grid>
                )}
                <Grid item xs={1}>
                    <Avatar src={currentUserAvatar} className="avatar-mini" />
                </Grid>
                <Grid item xs={11}>
                    <TextField
                        placeholder={l('status.placeholder')}
                        multiline
                        rows={4}
                        rowsMax={Number.MAX_SAFE_INTEGER}
                        onChange={event => setContent(event.target.value)}
                        fullWidth
                        value={content}
                        className={classes.customTextarea}
                    />
                </Grid>
            </Grid>
            <CardActions className={classes.cardActionsStyled}>
                <Grid container justify="flex-start">
                    <div className="create-status-form-pic">
                        <AttachImageInput
                            onImagesAttached={addMediaAttachments}
                            disabled={mediaAttachmentsFiles.length === 1}
                            disabledLabel={getDisabledLabelForAttachmentsInput(1, l)}
                        />
                        <img src="/pic-gif-disabled.png" />
                        <img src="/pic-list-disabled.png" />
                        <img src="/pic-smile-disabled.png" />
                    </div>
                </Grid>
                <Grid container classes={{root: classes.containerRoot}}>
                        <div className={classes.remainingCharactersCounter}>
                            <Typography
                                variant="body1"
                                color="textSecondary"
                            >
                                {charactersRemaining}
                            </Typography>
                        </div>
                        {!hideSendButton && (
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.createStatusButton}
                                onClick={createStatus}
                                disabled={(pending || mediaAttachmentUploadPending) || !(content.length > 0 || uploadedAttachments.length !== 0)}
                            >
                                {pending && <CircularProgress size={15} />}
                                {l('status.send')}
                            </Button>
                        )}
                </Grid>
            </CardActions>
            <div className={classes.mediaAttachmentsContainer}>
                <CreateStatusFormMediaAttachments
                    mediaAttachmentsFiles={mediaAttachmentsFiles}
                    onDelete={removeMediaAttachment}
                />
            </div>
        </Card>
    );
};

const mapMobxToProps = ({ createStatus, authorization, uploadMediaAttachments }) => ({
    charactersRemaining: createStatus.charactersRemaining,
    submissionError: createStatus.submissionError,
    content: createStatus.content,
    pending: createStatus.pending,
    mediaAttachmentUploadPending: createStatus.mediaAttachmentUploadPending,
    currentUserAvatar: authorization.currentUser
        ? authorization.currentUser.avatar || 'http://localhost:3000/avatars/original/missing.png'
        : 'http://localhost:3000/avatars/original/missing.png',
    setContent: createStatus.setContent,
    createStatus: createStatus.createStatus,
    addMediaAttachments: uploadMediaAttachments.attachFiles,
    removeMediaAttachment: uploadMediaAttachments.removeAttachedFileById,
    mediaAttachmentsFiles: uploadMediaAttachments.mediaAttachmentsFiles,
    uploadedAttachments: createStatus.mediaAttachments,
    referredStatus: createStatus.referredStatus,
    setReferredStatus: createStatus.setReferredStatus,
    statusReferenceType: createStatus.statusReferenceType,
    setStatusReferenceType: createStatus.setStatusReferenceType,
});

export const CreateStatusForm = localized(inject(mapMobxToProps)(observer(_CreateStatusForm)));

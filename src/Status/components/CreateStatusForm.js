import React, { createRef } from "react";
import { inject, observer } from "mobx-react";
import {
    Avatar,
    Button,
    Card,
    CardActions,
    Grid,
    TextField,
    Typography,
    ClickAwayListener,
    makeStyles
} from "@material-ui/core";

import { AttachImageInput } from "./AttachImageInput";
import { EmojiInput } from "./EmojiInput";
import { EmojiPicker } from "./EmojiPicker";
import { EmojiPickerDialog } from "./EmojiPickerDialog";
import { AttachErrorsDialog } from "./AttachErrorsDialog";
import { CreateStatusFormMediaAttachments } from "./CreateStatusFormMediaAttachments";
import { RepostedStatusContent } from "./RepostedStatusContent";
import Loader from "../../components/Loader";
import { localized } from "../../localization/components";
import { getTimeWhenCETIsMidnight } from "../../utils/date-utlis";
import { ListIcon } from "../../icons/ListIcon";

const useStyles = makeStyles(theme => ({
    createStatusFormCard: {
        background: theme.palette.background.light,
        position: "relative",
        overflow: "unset",
        boxShadow: "none",
        border: `1px solid ${theme.palette.border.main}`,
        boxSizing: "border-box"
    },
    remainingCharactersCounter: {
        padding: "7px 10px"
    },
    createStatusButton: {
        borderRadius: 30,
        float: "right",
        width: "114px",
        boxShadow: "none"
    },
    mediaAttachmentsContainer: {
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
    },
    cardActionsStyled: {
        display: "flex",
        padding: "8px 15px"
    },
    customTextarea: {
        paddingLeft: 20,
        width: "95%",
        border: "none",
        "& .MuiInput-underline:before": {
            borderBottom: "none"
        },
        "& .MuiInput-underline:hover": {
            borderBottom: "none"
        },
        "& .MuiInput-underline:after": {
            borderBottom: "none"
        },
        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderBottom: "none"
        }
    },
    containerRoot: {
        display: "flex",
        justifyContent: "flex-end",
        flexWrap: "nowrap"
    },
    customTextareaContainer: {
        display: "flex",
        width: "100%",
        padding: "14px"
    }
}));

const getDisabledLabelForAttachmentsInput = (maxAttachments, l) => {
    const maxAttachmentsString = `${maxAttachments}`;
    const isPlural =
        maxAttachmentsString.charAt(maxAttachmentsString.length - 1) !== "1";
    const bindings = { limit: 1 };
    const labelKey = isPlural
        ? "status.images-attachments-limit.plural"
        : "status.images-attachments-limit";

    return l(labelKey, bindings);
};

const getFormPlaceholder = (actionRights, l) => {
    if (actionRights && !actionRights.can_create) {
        const time = getTimeWhenCETIsMidnight();
        if (actionRights.cannot_create_reason_code === "LIMIT_EXCEEDED") {
            return l("status.placeholder.already-published") + `${time} GMT (00:00 CET)`;
        } else if (actionRights.cannot_create_reason_code === "DOESNT_HAVE_ENOUGH_POSTS") {
            return l("status.placeholder.have-no-posts");
        } else if (actionRights.cannot_create_reason_code === "MISSING_AVATAR_OR_USERNAME_OR_BIO") {
            return l("status.placeholder.missing-info");
        } else if (actionRights.cannot_create_reason_code === "MEMES_LIMIT_EXCEEDED_FOR_CURRENT_CONTEST") {
            return l("status.placeholder.posts-limit") + `${time} GMT (00:00 CET)`;
        }
    }

    return l("status.placeholder");
};

const _CreateStatusForm = ({
    charactersRemaining,
    content,
    pending,
    currentUserAvatar,
    setContent,
    setTargetSelection,
    createStatus,
    mediaAttachmentsFiles,
    addMediaAttachments,
    removeMediaAttachment,
    uploadedAttachments,
    hideSendButton = false,
    isDialogEmojiPicker = false,
    referredStatus,
    setReferredStatus,
    setStatusReferenceType,
    setEmojiPickerVisible,
    setEmojiPickerDialogVisible,
    mediaAttachmentUploadPending,
    actionRights,
    l
}) => {
    const classes = useStyles();
    const wrapperRef = createRef();

    const handleEmojiClick = () => {
        setTargetSelection(undefined);
    };

    return (
        <>
            <ClickAwayListener onClickAway={handleEmojiClick}>
                <Card className={classes.createStatusFormCard}>
                    <Grid container>
                        {referredStatus && (
                            <Grid item xs={12}>
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
                        <div className={classes.customTextareaContainer}>
                            <Avatar
                                src={currentUserAvatar}
                                className="avatar-mini"
                            />
                            <TextField
                                placeholder={getFormPlaceholder(
                                    referredStatus ? false : actionRights,
                                    l
                                )}
                                multiline
                                rows={4}
                                rowsMax={Number.MAX_SAFE_INTEGER}
                                onChange={event => setContent(event.target.value)}
                                onBlur={setTargetSelection}
                                fullWidth
                                value={content}
                                className={classes.customTextarea}
                                ref={wrapperRef}
                            />
                        </div>
                    </Grid>
                    <CardActions className={classes.cardActionsStyled}>
                        <Grid container justify="flex-start">
                            <div className="create-status-form-pic">
                                <AttachImageInput
                                    onImagesAttached={addMediaAttachments}
                                    disabled={mediaAttachmentsFiles.length === 1}
                                    disabledLabel={getDisabledLabelForAttachmentsInput(
                                        1,
                                        l
                                    )}
                                />
                                <ListIcon color={"rgba(255, 92, 1, 0.2)"} />
                                <EmojiInput
                                    setEmojiPickerVisible={setEmojiPickerVisible}
                                    setEmojiPickerDialogVisible={
                                        setEmojiPickerDialogVisible
                                    }
                                    isDialogEmojiPicker={isDialogEmojiPicker}
                                />
                            </div>
                        </Grid>
                        <Grid container classes={{ root: classes.containerRoot }}>
                            <div className={classes.remainingCharactersCounter}>
                                <Typography variant="body1" color="textSecondary">
                                    {charactersRemaining}
                                </Typography>
                            </div>
                            {!hideSendButton && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.createStatusButton}
                                    onClick={() =>
                                        createStatus(
                                            referredStatus
                                                ? false
                                                : Boolean(actionRights)
                                        )
                                    }
                                    disabled={
                                        (!Boolean(referredStatus) &&
                                            actionRights &&
                                            !actionRights.can_create) ||
                                        pending ||
                                        mediaAttachmentUploadPending ||
                                        !(
                                            content.length > 0 ||
                                            uploadedAttachments.length !== 0
                                        )
                                    }
                                >
                                    {pending && (
                                        <Loader
                                            size="md"
                                            css="position:absolute; top: -2px; left: 40px"
                                        />
                                    )}
                                    {l("status.send")}
                                </Button>
                            )}
                        </Grid>
                    </CardActions>
                    {mediaAttachmentsFiles && mediaAttachmentsFiles.length > 0 && (
                        <div className={classes.mediaAttachmentsContainer}>
                            <CreateStatusFormMediaAttachments
                                mediaAttachmentsFiles={mediaAttachmentsFiles}
                                onDelete={removeMediaAttachment}
                            />
                        </div>
                    )}
                    {isDialogEmojiPicker ? <EmojiPickerDialog /> : <EmojiPicker />}
                </Card>
            </ClickAwayListener>
            <AttachErrorsDialog />
        </>
    );
};

const mapMobxToProps = ({
    createStatus,
    authorization,
    uploadMediaAttachments,
    memezatorActions
}) => ({
    charactersRemaining: createStatus.charactersRemaining,
    content: createStatus.content,
    pending: createStatus.pending,
    mediaAttachmentUploadPending: createStatus.mediaAttachmentUploadPending,
    setEmojiPickerVisible: createStatus.setEmojiPickerVisible,
    setEmojiPickerDialogVisible: createStatus.setEmojiPickerDialogVisible,
    currentUserAvatar: authorization.currentUser && authorization.currentUser.avatar,
    setContent: createStatus.setContent,
    setTargetSelection: createStatus.setTargetSelection,
    createStatus: createStatus.createStatus,
    addMediaAttachments: uploadMediaAttachments.attachFiles,
    removeMediaAttachment: uploadMediaAttachments.removeAttachedFileById,
    mediaAttachmentsFiles: uploadMediaAttachments.mediaAttachmentsFiles,
    uploadedAttachments: createStatus.mediaAttachments,
    referredStatus: createStatus.referredStatus,
    setReferredStatus: createStatus.setReferredStatus,
    setStatusReferenceType: createStatus.setStatusReferenceType,
    actionRights: memezatorActions.actionRights
});

export const CreateStatusForm = localized(
    inject(mapMobxToProps)(observer(_CreateStatusForm))
);

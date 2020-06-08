import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { Avatar, Button, CircularProgress, makeStyles } from '@material-ui/core';
import { Photo } from '@material-ui/icons';
import { localized } from '../../localization/components';

const useStyles = makeStyles(theme => ({
    avatarAttachmentPhoto: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarAttachmentContainer: {
        [theme.breakpoints.down('sm')]: {
            background: '#FFFBF8',
            padding: '8px 24px',
        },
    },
    avatarUploadButton: {
        position: 'absolute',
        width: '80px',
        height: '80px',
        borderRadius: '80px',
        background: 'rgba(34, 34, 34, 0.8)',
    },
    avatarAttachmentDescription: {
        marginTop: '24px',
        '& p': {
            margin: 0,
            color: '#A2A2A2',
            fontSize: '12px',
            fontFamily: 'Museo Sans Cyrl Regular',
        },
        '& span': {
            marginTop: '8px',
            color: '#1C1C1C',
            fontSize: '16px',
            fontFamily: 'Museo Sans Cyrl Bold',
        },
    },
}));

const lineBreak = param => `${param.slice(0, 21)} ${param.slice(21)}`;

const _UserAvatarFileInput = ({
    user,
    avatarFileContainer,
    uploadFile,
    displayName,
    l,
}) => {
    const classes = useStyles();

    const [value, setValue] = useState(undefined);

    const handleFileAttachment = files => {
        if (files && files.length !== 0) {
            uploadFile(files[0]);
        }
    };

    return (
        <div className={classes.avatarAttachmentContainer}>
            <div className={classes.avatarAttachmentPhoto}>
                <Avatar
                    style={{
                        width: 80,
                        height: 80,
                    }}
                    src={avatarFileContainer ? avatarFileContainer.url : user.avatar}
                />
                <Button
                    disabled={avatarFileContainer && avatarFileContainer.pending}
                    component="label"
                    variant="outlined"
                    classes={{ root: classes.avatarUploadButton }}
                >
                    {avatarFileContainer && avatarFileContainer.pending
                        ? <CircularProgress size={15} color="primary" />
                        : <Photo style={{ color: '#fff' }} />}
                    <input
                        type="file"
                        value={value}
                        style={{ display: 'none' }}
                        accept="image/png, image/jpg, image/jpeg"
                        onClick={() => setValue('')}
                        onChange={event => handleFileAttachment(event.target.files)}
                    />
                </Button>
            </div>
            <div className={classes.avatarAttachmentDescription}>
                <p>Wallet</p>
                <span>{lineBreak(displayName)}</span>
            </div>
        </div>
    );
};

const mapMobxToProps = ({ userAvatarUpload, userProfileUpdate }) => ({
    user: userProfileUpdate.user,
    avatarFileContainer: userAvatarUpload.avatarFileContainer,
    uploadFile: userAvatarUpload.uploadFile,
    displayName: userProfileUpdate.user && userProfileUpdate.user.display_name,
});

export const UserAvatarFileInput = localized(
    inject(mapMobxToProps)(observer(_UserAvatarFileInput)),
);

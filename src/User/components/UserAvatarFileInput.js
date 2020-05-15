import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { Avatar, Button, CircularProgress, makeStyles } from '@material-ui/core';
import { Photo } from '@material-ui/icons';
import { localized } from '../../localization/components';

const useStyles = makeStyles(() => ({
    avatarAttachmentContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

const _UserAvatarFileInput = ({
    user,
    avatarFileContainer,
    uploadFile,
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
                color="primary"
                variant="outlined"
            >
                {avatarFileContainer && avatarFileContainer.pending
                    ? <CircularProgress size={15} color="primary" />
                    : <Photo />}
                {l('user.upload-avatar')}
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
    );
};

const mapMobxToProps = ({ userAvatarUpload, userProfileUpdate }) => ({
    user: userProfileUpdate.user,
    avatarFileContainer: userAvatarUpload.avatarFileContainer,
    uploadFile: userAvatarUpload.uploadFile,
});

export const UserAvatarFileInput = localized(
    inject(mapMobxToProps)(observer(_UserAvatarFileInput)),
);

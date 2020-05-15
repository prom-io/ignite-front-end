import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';
import { addLineBreak } from '../../utils/string-utils';

export const UserProfileInfo = ({ username, displayName, bio }) => (
    <>
        <div>
            <Typography variant="h6" className="user-profile-info-text">
                {addLineBreak(displayName)}
            </Typography>
        </div>
        <Typography variant="body2" color="textSecondary" className="user-profile-info-text">
            {`@${addLineBreak(username)}`}
        </Typography>
        {bio && <Typography className="user-profile-info-text">{bio}</Typography>}
    </>
);

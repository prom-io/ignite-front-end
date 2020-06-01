import React from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Typography, makeStyles } from '@material-ui/core';

import { localized } from '../../localization/components';
import { SuccessFollowIcon } from '../../icons/SuccessFollowIcon';

const useStyles = makeStyles(() => ({
    followInputWrapper: {
        marginTop: 16,
        boxSizing: 'border-box',
        background: '#fbf7f6',
        padding: 16,
        border: '1px solid #F1EBE8',
        borderRadius: '4px 4px 0px 0px',
        height: 96,
    },
    followInputRow: {
        position: 'relative',

        '& input': {
            boxSizing: 'border-box',
            fontFamily: 'Museo Sans Cyrl Regular',
            fontStyle: 'normal',
            fontWeight: 300,
            fontSize: '15px',
            lineHeight: '18px',
            height: 42,
            width: '100%',
            borderRadius: 30,
            border: '1px solid #F1EBE8',
            outline: 'none',
            padding: '0 105px 0 24px',
        },

        '& button': {
            position: 'absolute',
            right: 0,
            maxWidth: 95,
            borderRadius: 30,
            height: 42,
            fontWeight: 600,
            fontSize: '15px',
            lineHeight: '18px',

            '&.Mui-disabled': {
                fontSize: '15px !important',
                pointerEvents: 'auto !important',
                cursor: 'no-drop !important',
            },
        },
    },
    followInputResult: {
        paddingLeft: 24,
        paddingTop: 9,

        '& p': {
            fontSize: '12px',
            lineHeight: '14px',
            fontWeight: 300,
            paddingLeft: 8,
        },
    },
    followInputResultError: {
        display: 'flex',
        color: '#FF0101',
    },
    followInputResultSuccess: {
        display: 'flex',
        color: '#FF5C01',

        '& span': {
            textDecoration: 'underline',
        },
    },
}));

const _FollowPeopleInput = ({
    setFollowInputValue,
    doFollow,
    followInputValue,
    followResult,
    l,
}) => {
    const classes = useStyles();

    return (
        <div className={classes.followInputWrapper}>
            <div className={classes.followInputRow}>
                <input
                    type="text"
                    placeholder={l('follow.people.enter')}
                    value={followInputValue}
                    onChange={event => setFollowInputValue(event.target.value.trim())}
                />
                <Button
                    color="primary"
                    variant="contained"
                    onClick={doFollow}
                    disabled={!followInputValue}
                    fullWidth
                >
                    {l('user.profile.follow')}
                </Button>
            </div>
            <div className={classes.followInputResult}>
                {followResult.type === 'error' ? (
                    <div className={classes.followInputResultError}>
                        <SuccessFollowIcon />
                        <Typography>{l('follow.people.not-found')}</Typography>
                    </div>
                ) : followResult.type === 'success' ? (
                    <div className={classes.followInputResultSuccess}>
                        <Typography>
                            {l('follow.people.success')}
                            {' '}
                            <span>
                                @
                                {followResult.username}
                            </span>
                        </Typography>
                    </div>
                ) : (
                    followResult.type === 'already' && (
                        <div className={classes.followInputResultError}>
                            <Typography>{l('follow.people.already')}</Typography>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

const mapMobxToProps = ({ followPeople }) => ({
    setFollowInputValue: followPeople.setFollowInputValue,
    doFollow: followPeople.doFollow,
    followInputValue: followPeople.followInputValue,
    followResult: followPeople.followResult,
    pending: followPeople.pending,
});

export const FollowPeopleInput = localized(
    inject(mapMobxToProps)(observer(_FollowPeopleInput)),
);

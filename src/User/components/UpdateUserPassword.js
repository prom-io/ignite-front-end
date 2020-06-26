import React from 'react';
import { inject, observer } from 'mobx-react';
import {
    Button,
    Typography,
    makeStyles,
} from '@material-ui/core';
import { localized } from '../../localization/components';
import { useStore } from '../../store/hooks';

const useStyles = makeStyles(theme => ({
    updateUserPassword: {
        background: '#fff',
        padding: '34px 48px 40px 34px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

        '& h5': {
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '24px',
        },
        [theme.breakpoints.down('sm')]: {
            marginBottom: '50px',
            padding: '34px',
        },
    },
    alignItemsUnset: {
        alignItems: 'unset',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    updateUserPasswordOpen: {
        boxSizing: 'border-box',
        padding: '11px 25px',
        height: '40px',
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '30px',
        fontWeight: 600,
        fontSize: '15px',
        lineHeight: '18px',
        color: theme.palette.primary.main,
    },
    updateUserPasswordForm: {
        maxWidth: '344px',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            maxWidth: 'unset',
        },
    },
    updateUserPasswordFormActions: {
        marginTop: '40px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    updateUserPasswordChange: {
        padding: '11px 26px',
        height: '40px',
        borderRadius: '30px',
        fontWeight: 600,
        fontSize: '15px',
        lineHeight: '18px',
    },
    updateUserPasswordCancel: {
        color: theme.palette.primary.main,
        fontWeight: 300,
        fontSize: '15px',
        lineHeight: '18px',
    },
}));

const _UpdateUserPassword = ({
    updateUserProfileForm,
    formErrors,
    pending,
    updateUserPassword,
    setFormValue,
    l,
    routerStore,
}) => {
    const classes = useStyles();
    const { genericAuthorizationDialog } = useStore();
    const {
        setGenericAuthorizationDialogOpen,
        setGenericAuthorizationDialogType,
    } = genericAuthorizationDialog;

    return (
        <div
            className={classes.updateUserPassword}
        >
            <Typography variant="h5">{l('authorization.login.password')}</Typography>
            <Button
                className={classes.updateUserPasswordOpen}
                onClick={() => {
                    setGenericAuthorizationDialogOpen(true);
                    setGenericAuthorizationDialogType('forgotPassword');
                }}
            >
                {l('user.change')}
            </Button>
        </div>
    );
};

const mapMobxToProps = ({ userProfileUpdate, store }) => ({
    updateUserProfileForm: userProfileUpdate.updateUserProfileForm,
    formErrors: userProfileUpdate.formErrors,
    submissionError: userProfileUpdate.submissionError,
    pending: userProfileUpdate.pending,
    setFormValue: userProfileUpdate.setFormValue,
    updateUserPassword: userProfileUpdate.updateUserPassword,
    routerStore: store,
});

export const UpdateUserPassword = localized(
    inject(mapMobxToProps)(observer(_UpdateUserPassword)),
);

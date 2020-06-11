import React, { Fragment, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Card, CardContent, makeStyles, TextField, Typography } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { localized } from '../../localization/components';
import Loader from '../../components/Loader';

const useStyles = makeStyles(theme => ({
    loginCard: {
        backgroundColor: theme.palette.background.light,
        boxShadow: 'none',
        border: `1px solid ${theme.palette.border.main}`,
        borderRadius: '4px 4px 0px 0px',
        paddingBottom: '8px',
    },
    loginCardContent: {
        padding: '20px',
    },
    loginButton: {
        maxWidth: 374,
        borderRadius: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'table',
        height: '40px',
        fontFamily: 'Museo Sans Cyrl Bold',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '15px',
        lineHeight: '18px',
        textAlign: 'center',
        color: '##FFFFFF',
        marginTop: '30px',
    },
    signUpButton: {
        maxWidth: 374,
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'table',
        fontFamily: 'Museo Sans Cyrl Bold',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '15px',
        lineHeight: '18px',
        textAlign: 'center',
        color: theme.palette.primary.main,
        marginTop: '18px',
        marginBottom: '6px',
        borderRadius: '30px',
    },
    errorLabel: {
        color: theme.palette.error.main,
    },
    loginInput: {
        display: 'flex',
        maxWidth: '375px',
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    secondaryButtonsGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '375px',
        margin: '16px auto 0 auto',
        fontFamily: 'Museo Sans Cyrl Regular',
        fontSize: '15px',
    },
    forgotPassword: {
        color: theme.palette.text.secondary,
        cursor: 'pointer',
        '&:hover': {
            color: theme.palette.text.main,
        },
    },
}));

const getLabelFromSubmissionError = (error, l) => {
    if (error.response) {
        if (error.response.status === 401) {
            return l('authorization.login.error.invalid-credentials.password');
        }
        return l('authorization.login.error.unknown', { responseStatus: error.response.status });
    }
    return l('authorization.login.error.no-response');
};

const _LoginForm = ({
    loginForm,
    submissionError,
    pending,
    setFormValue,
    doLogin,
    setSignUpDialogOpen,
    hideLoginButton,
    hideSignUpButton,
    disableCard,
    setLoginDialogOpen,
    l,
}) => {
    const classes = useStyles();
    const [isRemember, setIsRemember] = useState(false);

    const content = (
        <>
            <TextField
                label={l('authorization.login.wallet-address')}
                value={loginForm.username}
                onChange={event => setFormValue('username', event.target.value)}
                className={`input-default ${classes.loginInput}`}
            />
            <TextField
                label={l('authorization.login.password')}
                value={loginForm.password}
                onChange={event => setFormValue('password', event.target.value)}
                className={`input-default ${classes.loginInput}`}
                type="password"
            />
            {submissionError && (
                <Typography
                    variant="body1"
                    className={classes.errorLabel}
                >
                    {getLabelFromSubmissionError(submissionError, l)}
                </Typography>
            )}
            <div className={classes.secondaryButtonsGroup}>
                <FormControlLabel
                    color="primary"
                    control={<Checkbox checked={isRemember} color="primary" onChange={() => setIsRemember(!isRemember)} name="remember" />}
                    label="Remember me"
                />
                <a className={classes.forgotPassword}>Forgot password?</a>
            </div>
            {!hideLoginButton && (
                <Button
                    className={classes.loginButton}
                    color="primary"
                    variant="contained"
                    onClick={() => doLogin(isRemember)}
                    disabled={pending}
                    fullWidth
                >
                    {pending && <Loader size={'md'} />}
                    {l('authorization.login')}
                </Button>
            )}
            {!hideSignUpButton && (
                <Button
                    variant="text"
                    color="primary"
                    fullWidth
                    className={classes.signUpButton}
                    onClick={() => {
                        setLoginDialogOpen(false);
                        setSignUpDialogOpen(true);
                    }}
                    disabled={pending}
                >
                    {l('sign-up.beta-testing')}
                </Button>
            )}
        </>
    );

    return (disableCard
        ? content
        : (
            <>
                <Card className={classes.loginCard}>
                    <CardContent className={classes.loginCardContent}>
                        {content}
                    </CardContent>
                </Card>
            </>
        )
    );
};

const mapMobxToProps = ({ login, signUp }) => ({
    loginForm: login.loginForm,
    pending: login.pending,
    submissionError: login.submissionError,
    setFormValue: login.setFormValue,
    doLogin: login.doLogin,
    setSignUpDialogOpen: signUp.setSignUpDialogOpen,
    setLoginDialogOpen: login.setLoginDialogOpen,
});

export const LoginForm = localized(
    inject(mapMobxToProps)(observer(_LoginForm)),
);

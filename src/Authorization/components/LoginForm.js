import React, { useState } from "react";
import { observer } from "mobx-react";
import {
    Button,
    Card,
    CardContent,
    Checkbox,
    FormControl,
    FormControlLabel,
    IconButton,
    InputAdornment,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";
import { Visibility } from "@material-ui/icons";
import { useLocalization, useStore } from "../../store/hooks";
import Loader from "../../components/Loader";
import { EyeIcon } from "../../icons/EyeIcon";

const useStyles = makeStyles(theme => ({
    loginCard: {
        backgroundColor: theme.palette.background.light,
        boxShadow: "none",
        border: `1px solid ${theme.palette.border.main}`,
        borderRadius: "4px 4px 0px 0px",
        paddingBottom: "8px"
    },
    loginCardContent: {
        padding: "24px 60px",
        [theme.breakpoints.down("sm")]: {
            padding: "24px 12px"
        }
    },
    loginButton: {
        maxWidth: 374,
        borderRadius: 30,
        marginLeft: "auto",
        marginRight: "auto",
        display: "table",
        height: "40px",
        fontFamily: "Museo Sans Cyrl Bold",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "15px",
        lineHeight: "18px",
        textAlign: "center",
        color: "##FFFFFF",
        marginTop: "30px"
    },
    signUpButton: {
        maxWidth: 374,
        marginLeft: "auto",
        marginRight: "auto",
        display: "table",
        fontFamily: "Museo Sans Cyrl Bold",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "15px",
        lineHeight: "18px",
        textAlign: "center",
        color: theme.palette.primary.main,
        marginTop: "18px",
        marginBottom: "6px",
        borderRadius: "30px"
    },
    errorLabel: {
        color: theme.palette.error.main,
        fontSize: "15px"
    },
    loginInput: {
        display: "flex",
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto"
    },
    secondaryButtonsGroup: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        margin: "16px auto 0 auto",
        fontFamily: "Museo Sans Cyrl Regular",
        fontSize: "15px"
    },
    forgotPassword: {
        color: theme.palette.text.secondary,
        cursor: "pointer",
        "&:hover": {
            color: theme.palette.text.main
        }
    },
    loginForm: {
        display: "flex",
        flexDirection: "column"
    },
    iconButton: {
        "& svg": {
            width: "24px",
            height: "24px"
        },
        "&:hover": {
            background: "rgba(255,255,255,0)"
        }
    }
}));

const getLabelFromSubmissionError = (error, l) => {
    if (error.response) {
        if (error.response.status === 401) {
            return l("authorization.login.error.invalid-credentials.password");
        }
        return l("authorization.login.error.unknown", {
            responseStatus: error.response.status
        });
    }
    return l("authorization.login.error.no-response");
};

export const LoginForm = observer(
    ({ hideLoginButton, hideSignUpButton, disableCard }) => {
        const classes = useStyles();
        const { login, genericAuthorizationDialog } = useStore();
        const { loginForm, submissionError, setFormValue, doLogin, pending } = login;
        const {
            setGenericAuthorizationDialogOpen,
            setGenericAuthorizationDialogType
        } = genericAuthorizationDialog;
        const { l } = useLocalization();
        const [isRemember, setIsRemember] = useState(false);
        const [passwordVisibility, setPasswordVisibility] = useState(false);

        const handleClickShowPassword = () => {
            setPasswordVisibility(!passwordVisibility);
        };

        const handleMouseDownPassword = event => {
            event.preventDefault();
        };

        const content = (
            <div className={classes.loginForm}>
                <FormControl>
                    <TextField
                        label={l("authorization.login.wallet-address")}
                        value={loginForm.username}
                        onChange={event =>
                            setFormValue("username", event.target.value)
                        }
                        className={`input-default ${classes.loginInput}`}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment
                                    position="end"
                                    className={classes.copyPasswordInputAdornment}
                                />
                            )
                        }}
                    />
                </FormControl>
                <FormControl classes={{ root: classes.input }}>
                    <TextField
                        label={l("authorization.login.password")}
                        value={loginForm.password}
                        onChange={event =>
                            setFormValue("password", event.target.value)
                        }
                        className={`input-default ${classes.loginInput}`}
                        type={passwordVisibility ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        classes={{ root: classes.iconButton }}
                                    >
                                        {passwordVisibility ? (
                                            <Visibility />
                                        ) : (
                                            <EyeIcon />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </FormControl>

                {submissionError && (
                    <Typography variant="body1" className={classes.errorLabel}>
                        {getLabelFromSubmissionError(submissionError, l)}
                    </Typography>
                )}
                <div className={classes.secondaryButtonsGroup}>
                    <FormControlLabel
                        color="primary"
                        control={
                            <Checkbox
                                checked={isRemember}
                                color="primary"
                                onChange={() => setIsRemember(!isRemember)}
                                name="remember"
                            />
                        }
                        label={l("authorization.login.remember-me")}
                    />
                    <a
                        className={classes.forgotPassword}
                        onClick={() => {
                            setGenericAuthorizationDialogOpen(true);
                            setGenericAuthorizationDialogType("forgotPassword");
                        }}
                    >
                        {l("authorization.login.forgot-password")}
                    </a>
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
                        {pending && <Loader size="md" />}
                        {l("authorization.login")}
                    </Button>
                )}
                {!hideSignUpButton && (
                    <Button
                        variant="text"
                        color="primary"
                        fullWidth
                        className={classes.signUpButton}
                        onClick={() => {
                            setGenericAuthorizationDialogOpen(true);
                            setGenericAuthorizationDialogType("signUp");
                        }}
                        disabled={pending}
                    >
                        {l("sign-up")}
                    </Button>
                )}
            </div>
        );

        return disableCard ? (
            content
        ) : (
            <>
                <Card className={classes.loginCard}>
                    <CardContent className={classes.loginCardContent}>
                        {content}
                    </CardContent>
                </Card>
            </>
        );
    }
);

import React from "react";
import { observer } from "mobx-react";
import {
    Button,
    DialogContent,
    TextField,
    Typography,
    makeStyles
} from "@material-ui/core";

import { UserAvatarFileInput } from "../../User/components";
import { useLocalization, useStore } from "../../store/hooks";
import { authorizationDialogsStyles } from "../../styles/material/authorizationDialogsStyles";

const useStyles = makeStyles(theme => ({
    formWrapper: {
        display: "flex",
        alignItems: "center",
        padding: "32px 0",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column"
        }
    },
    formAvatar: {
        marginRight: "32px",
        [theme.breakpoints.down("sm")]: {
            marginRight: "0",
            "& > div": {
                background: "transparent"
            }
        }
    },
    formFieldsWrapper: {
        width: "100%"
    },
    formField: {
        marginTop: "15px",
        "& > span": {
            display: "block",
            textAlign: "right",
            fontFamily: "Museo Sans Cyrl Regular",
            fontStyle: "normal",
            fontWeight: 300,
            fontSize: "12px",
            lineHeight: "14px",
            color: theme.palette.text.secondary
        }
    }
}));

export const CommunityData = observer(() => {
    const classesCommunity = useStyles();
    const classes = authorizationDialogsStyles();
    const { signUp, genericAuthorizationDialog } = useStore();
    const { l } = useLocalization();
    const {
        formErrors,
        setCommunityFormValue,
        doSignUp,
        signUpCommunityForm
    } = signUp;
    const { setGenericAuthorizationDialogType } = genericAuthorizationDialog;

    const signUpButtonDisabled =
        !Boolean(signUpCommunityForm.username) ||
        !Boolean(signUpCommunityForm.about);

    return (
        <DialogContent classes={{ root: classes.dialogContentRoot }}>
            <Typography classes={{ root: classes.contentDescription }}>
                {l("sign-up.community-about")}
            </Typography>
            <div style={{ marginTop: 15 }}>
                <a
                    href="#test"
                    className={classes.link}
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    What is community?
                </a>
            </div>
            <div className={classesCommunity.formWrapper}>
                <div className={classesCommunity.formAvatar}>
                    <UserAvatarFileInput />
                </div>
                <div className={classesCommunity.formFieldsWrapper}>
                    <div className={classesCommunity.formField}>
                        <TextField
                            label={l("user.name")}
                            value={signUpCommunityForm.username}
                            onChange={event =>
                                setCommunityFormValue("username", event.target.value)
                            }
                            error={Boolean(formErrors.username)}
                            helperText={
                                formErrors.username && l(formErrors.username)
                            }
                            margin="dense"
                            fullWidth
                        />
                        <span>
                            {signUpCommunityForm.username.length}
                            /50
                        </span>
                    </div>

                    <div className={classesCommunity.formField}>
                        <TextField
                            label={l("user.about")}
                            value={signUpCommunityForm.about}
                            onChange={event =>
                                setCommunityFormValue("about", event.target.value)
                            }
                            error={Boolean(formErrors.about)}
                            helperText={formErrors.about && l(formErrors.about)}
                            margin="dense"
                            fullWidth
                        />
                        <span>
                            {signUpCommunityForm.about.length}
                            /250
                        </span>
                    </div>
                </div>
            </div>
            <Button
                variant="contained"
                color="primary"
                classes={{ root: classes.button }}
                style={{ marginTop: 20 }}
                disabled={signUpButtonDisabled}
                onClick={() => {
                    setGenericAuthorizationDialogType("createWalletPreload");
                    doSignUp();
                }}
            >
                {l("user.update-profile.save")}
            </Button>
        </DialogContent>
    );
});

import React from "react";
import { observer } from "mobx-react";
import { Button, DialogContent, makeStyles } from "@material-ui/core";

import { useStore, useLocalization } from "../../../store";

const useStyles = makeStyles(theme => ({
    contentDescription: {
        fontFamily: "Museo Sans Cyrl Regular",
        fontSize: "15px",
        lineHeight: "26px",
        color: "#1C1C1C",
        [theme.breakpoints.down("sm")]: {
            fontSize: "14px"
        }
    },
    contentBlock: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderTop: "1px solid #F1EBE8",
        marginTop: "32px",
        paddingTop: "32px",
        fontFamily: "Museo Sans Cyrl Regular",
        "&>div": {
            width: "320px"
        },
        "& p": {
            margin: 0,
            fontSize: "20px"
        },
        "& span": {
            fontSize: "15px",
            fontFamily: "Museo Sans Cyrl Bold"
        },
        [theme.breakpoints.down("sm")]: {
            "& span": {
                fontSize: "12px"
            },
            marginTop: "18px",
            paddingTop: "18px"
        }
    },
    button: {
        width: "187px"
    }
}));

const publishTransactionTranslations = {
    en: () => (
        <span>
            Publish a record to Ethereum blockchain
            <br />
            (for advanced users only)
        </span>
    ),
    kr: () => (
        <span>
            이더리움 블록체인에 레코드 게시해요
            <br />
            (고급 사용자 전용입니다)
        </span>
    )
};

export const ForgotPassword = observer(() => {
    const classes = useStyles();
    const { genericAuthorizationDialog } = useStore();
    const { l, locale } = useLocalization();
    const { setGenericAuthorizationDialogType } = genericAuthorizationDialog;

    return (
        <DialogContent classes={{ root: classes.dialogRoot }}>
            <span className={classes.contentDescription}>
                {l("password-recovery.verification-is-needed")}
            </span>
            <div className={classes.contentBlock}>
                <div>
                    <p>{l("sign-up.options.recommended-option")}:</p>
                    <span>{l("password-recovery.options.private-key")}</span>
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    classes={{
                        root: classes.button
                    }}
                    onClick={() =>
                        setGenericAuthorizationDialogType("resetPassword")
                    }
                >
                    {l("password-recovery.enter-key")}
                </Button>
            </div>
            <div className={classes.contentBlock}>
                <div>{publishTransactionTranslations[locale]()}</div>
                <Button
                    variant="outlined"
                    color="primary"
                    classes={{
                        root: classes.button
                    }}
                    onClick={() =>
                        setGenericAuthorizationDialogType("resetWithoutKey")
                    }
                >
                    {l("password-recovery.enter-transaction-hash")}
                </Button>
            </div>
        </DialogContent>
    );
});

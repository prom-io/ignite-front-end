import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Button, Checkbox, DialogContent, makeStyles } from '@material-ui/core';
import { CopyToClipboardButton } from '../../CopyToClipboardButton/components';
import { useStore } from '../../store/hooks';

const useStyles = makeStyles(() => ({
    dialogContentRoot: {
        display: 'flex',
        flexDirection: 'column',
    },
    contentDescription: {
        margin: '0',
        fontFamily: 'Museo Sans Cyrl Bold',
        fontSize: '20px',
        lineHeight: '26px',
        color: '#1C1C1C',
        '& span': {
            color: '#FF5C01',
        },
    },
    infoCheckingBlock: {
        margin: '16px 0 24px 0',
        borderBottom: '1px solid #F1EBE8',
    },
    markList: {
        marginTop: 24,
        fontFamily: 'Museo Sans Cyrl Regular',
        fontSize: '15px',
        lineHeight: '24px',
        '& span': {
            color: '#FF5C01',
        },
        '& ul': {
            padding: '0 16px',
            margin: 0,
            '& li': {
                margin: '8px 0',
            },
            '& li::marker': {
                color: '#A2A2A2',
            },
        },
    },
    checkboxBlock: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        borderTop: '1px solid #F1EBE8',
        padding: '12px 0 16px 0',
    },
    checkboxBlockDescription: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: 15,
        marginLeft: 24,
    },
    checkboxTitle: {
        display: 'flex',
        alignItems: 'flex-start',
    },
    title: {
        fontFamily: 'Museo Sans Cyrl Bold',
    },
    value: {
        marginTop: 8,
        fontFamily: 'Museo Sans Cyrl Regular',
    },
    button: {
        width: '187px',
        marginTop: 40,
        alignSelf: 'center',
    },
    checkbox: {
        padding: 0,
        height: 'fit-content',
    },
}));

export const Attention = observer(() => {
    const classes = useStyles();
    const { walletGeneration, signUp, genericAuthorizationDialog } = useStore();
    const { generatedWallet } = walletGeneration;
    const { signUpForm, submissionError } = signUp;
    const { setGenericAuthorizationDialogType } = genericAuthorizationDialog;

    const [addressCopied, setAddressCopied] = useState(false);
    const [privateKeyCopied, setPrivateKeyCopied] = useState(false);
    const [passwordCopied, setPasswordCopied] = useState(false);

    const handleOkClick = () => {
        if (submissionError) {
            setGenericAuthorizationDialogType('errorAuthorization');
        } else {
            setGenericAuthorizationDialogType('welcome');
        }
    };

    return (
        <DialogContent classes={{
            root: classes.dialogContentRoot,
        }}
        >
            <p className={classes.contentDescription}>
                Make sure you
                {' '}
                <span>really</span>
                {' '}
                saved this info:
            </p>

            <div className={classes.infoCheckingBlock}>
                <div className={classes.checkboxBlock}>
                    <div className={classes.checkboxTitle}>
                        <Checkbox
                            color="primary"
                            classes={{ root: classes.checkbox }}
                            checked={addressCopied}
                            onChange={() => setAddressCopied(!addressCopied)}
                        />
                        <div className={classes.checkboxBlockDescription}>
                            <span className={classes.title}>Wallet Address (login)</span>
                            <span className={classes.value}>{generatedWallet.address}</span>
                        </div>
                    </div>
                    <span>
                        <CopyToClipboardButton textToCopy={generatedWallet.address} />
                    </span>
                </div>
                <div className={classes.checkboxBlock}>
                    <div className={classes.checkboxTitle}>
                        <Checkbox
                            color="primary"
                            classes={{ root: classes.checkbox }}
                            checked={privateKeyCopied}
                            onChange={() => setPrivateKeyCopied(!privateKeyCopied)}
                        />
                        <div className={classes.checkboxBlockDescription}>
                            <span className={classes.title}>Private Key (password recovery key)</span>
                            <span className={classes.value}>{generatedWallet.privateKey}</span>
                        </div>
                    </div>
                    <span>
                        <CopyToClipboardButton textToCopy={generatedWallet.privateKey} />
                    </span>
                </div>
                <div className={classes.checkboxBlock}>
                    <div className={classes.checkboxTitle}>
                        <Checkbox
                            color="primary"
                            classes={{ root: classes.checkbox }}
                            checked={passwordCopied}
                            onChange={() => setPasswordCopied(!passwordCopied)}
                        />
                        <div className={classes.checkboxBlockDescription}>
                            <span className={classes.title}>Password</span>
                            <span className={classes.value}>{signUpForm.password}</span>
                        </div>
                    </div>
                    <span>
                        <CopyToClipboardButton textToCopy={signUpForm.password} />
                    </span>
                </div>
            </div>
            <div className={classes.markList}>
                <p className={classes.contentDescription}>
                    Please do not lose it!
                </p>
                <ul>
                    <li>
                        Make
                        <span>100%</span>
                        {' '}
                        sure that you really saved all this info in a safe place
                    </li>
                    <li>You will be able to change the password later using the Private Key</li>
                    <li>
                        If you lose your Private Key, you will
                        <span>never</span>
                        {' '}
                        recover the password
                    </li>
                </ul>
            </div>

            <Button
                variant="contained"
                color="primary"
                classes={{
                    root: classes.button,
                }}
                disabled={!passwordCopied || !privateKeyCopied || !addressCopied}
                onClick={handleOkClick}
            >
                Ok
            </Button>
        </DialogContent>
    );
});

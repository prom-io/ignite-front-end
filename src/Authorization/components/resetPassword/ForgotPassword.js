import React from 'react';
import { observer } from 'mobx-react';
import { Button, DialogContent, makeStyles } from '@material-ui/core';
import { useStore, useLocalization } from '../../../store/hooks';

const useStyles = makeStyles(() => ({
    contentDescription: {
        fontFamily: 'Museo Sans Cyrl Regular',
        fontSize: '15px',
        lineHeight: '26px',
        color: '#1C1C1C',
    },
    contentBlock: {
        display: 'flex',
        justifyContent: 'space-between',
        borderTop: '1px solid #F1EBE8',
        marginTop: '32px',
        paddingTop: '32px',
        fontFamily: 'Museo Sans Cyrl Regular',
        '&>div': {
            width: '320px',
        },
        '& p': {
            margin: 0,
            fontSize: '20px',
        },
        '& span': {
            fontSize: '15px',
            fontFamily: 'Museo Sans Cyrl Bold',
        },
    },
    button: {
        width: '187px',
    },
    dialogRoot: {
        margin: '24px 62px 40px 62px',
    },
}));

const publishTransactionTranslations = {
    en: () => (
        <span>
            Publish a record to Ethereum blockchain
            <br />
            (for advanced users only)
        </span>
    ),
    ko: () => (
        <span>
            Publish a record to Ethereum blockchain
            <br />
            (for advanced users only)
        </span>
    ),
};

export const ForgotPassword = observer(() => {
    const classes = useStyles();
    const { genericAuthorizationDialog } = useStore();
    const { l, locale } = useLocalization();
    const { setGenericAuthorizationDialogType } = genericAuthorizationDialog;

    return (
        <DialogContent classes={{ root: classes.dialogRoot }}>
            <span className={classes.contentDescription}>
                {l('password-recovery.verification-is-needed')}
            </span>
            <div className={classes.contentBlock}>
                <div>
                    <p>
                        {l('sign-up.options.recommended-option')}
                        :
                    </p>
                    <span>{l('password-recovery.options.private-key')}</span>
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    classes={{
                        root: classes.button,
                    }}
                    onClick={() => setGenericAuthorizationDialogType('resetPassword')}
                >
                    {l('password-recovery.enter-key')}
                </Button>
            </div>
            <div className={classes.contentBlock}>
                <div>
                    {publishTransactionTranslations[locale]()}
                </div>
                <Button
                    variant="outlined"
                    color="primary"
                    classes={{
                        root: classes.button,
                    }}
                    onClick={() => setGenericAuthorizationDialogType('resetWithoutKey')}
                >
                    {l('password-recovery.enter-transaction-hash')}
                </Button>
            </div>
        </DialogContent>
    );
});

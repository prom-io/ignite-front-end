import React from 'react';
import { Button, DialogContent, makeStyles } from '@material-ui/core';
import { InputPasswordGroup } from './InputPasswordGroup';
import { KeyCopyBlock } from './KeyCopyBlock';
import { _Checkbox } from './_Checkbox';

const useStyles = makeStyles(theme => ({
    dialogContentRoot: {
        display: 'flex',
        flexDirection: 'column',
    },
    button: {
        width: '187px',
        marginTop: 40,
        alignSelf: 'center',
    },
    checkbox: {
        marginTop: '30px',
    },
}));

export const GenerateHash = ({ submissionError, l }) => {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
        copied: false,
    });

    return (
        <DialogContent classes={{
            root: classes.dialogContentRoot,
        }}
        >
            <InputPasswordGroup values={values} setValues={setValues} title="Please create a password for your new account" />

            <KeyCopyBlock title="A hashcode for this password" type="disable">
                Hashcode not generated
            </KeyCopyBlock>

            <_Checkbox className={classes.checkbox}>I have saved the hashcode to publish it later in a record in Ethereum blockchain</_Checkbox>

            <Button
                variant="contained"
                color="primary"
                classes={{
                    root: classes.button,
                }}
            >
                Continue
            </Button>
        </DialogContent>
    );
};

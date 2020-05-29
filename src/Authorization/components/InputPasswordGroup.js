import React from 'react';
import { makeStyles } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { CopyIcon } from '../../icons/CopyIcon';

const useStyles = makeStyles(theme => ({
    titleBold: {
        fontFamily: 'Museo Sans Cyrl Bold',
        fontSize: '20px',
        lineHeight: '24px',
    },
    descriptionSecondary: {
        marginTop: '22px',
        color: '#A2A2A2',
        fontSize: '15px',
        lineHeight: '26px',
        fontFamily: 'Museo Sans Cyrl Regular',
    },
    link: {
        margin: '16px 0',
        cursor: 'pointer',
        color: '#FF5C01',
        textDecoration: 'underline',
        fontFamily: 'Museo Sans Cyrl Regular',
        fontSize: '15px',
        lineHeight: '18px',
    },
    inputGroup: {
        marginTop: '30px',
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        marginTop: '10px',
    },
    iconButton: {
        padding: 0,
    },
    underlineInput: {
        '&:hover': {
            borderColor: '#F1EBE8',
        },
        '&:before': {
            borderColor: '#F1EBE8',
        },
    },
}));

export const InputPasswordGroup = ({ submissionError, l, setValues, values, title }) => {
    const classes = useStyles();

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickCopyPassword = () => {
        document.execCommand('copy');
        setValues({ ...values, copied: true });
    };

    return (
        <div className={classes.inputGroup}>
            <div className={classes.titleBold}>{title}</div>
            <FormControl classes={{ root: classes.input }}>
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                    id="standard-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    classes={{
                        underline: classes.underlineInput,
                    }}
                    endAdornment={(
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickCopyPassword}
                                onMouseDown={handleMouseDownPassword}
                                classes={{ root: classes.iconButton }}
                            >
                                <CopyIcon />
                            </IconButton>
                        </InputAdornment>
                    )}
                />
            </FormControl>

            <FormControl classes={{ root: classes.input }}>
                <InputLabel htmlFor="standard-adornment-password">Confirm password</InputLabel>
                <Input
                    id="standard-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.repeatPassword}
                    onChange={handleChange('repeatPassword')}
                    classes={{
                        underline: classes.underlineInput,
                    }}
                    endAdornment={(
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                classes={{ root: classes.iconButton }}
                            >
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    )}
                />
            </FormControl>
            <span className={classes.descriptionSecondary}>
                Your password must be at least 8 characters long, be of mixed case and also contain a digit or symbol.
            </span>
            <a className={classes.link}>Generate a strong password</a>
        </div>
    );
};

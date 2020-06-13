import React, { useState } from 'react';
import {
    TextField,
    InputAdornment,
    IconButton,
    makeStyles,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import { useLocalization } from '../../store/hooks';

const useStyles = makeStyles(theme => ({
    iconButton: {
        padding: 0,
    },
}));

const UserPasswordField = ({ label, value, errors, setFormValue }) => {
    const classes = useStyles();
    const { l } = useLocalization();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <TextField
            label={l(label)}
            type={showPassword ? 'text' : 'password'}
            value={value}
            onChange={setFormValue}
            error={Boolean(errors)}
            helperText={errors && l(errors)}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            classes={{ root: classes.iconButton }}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            fullWidth
        />
    );
};

export default UserPasswordField;

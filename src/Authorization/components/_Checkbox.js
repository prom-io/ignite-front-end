import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    checkboxGroup: {
        display: 'flex',
        marginBottom: '16px',
        fontFamily: 'Museo Sans Cyrl Regular',
        fontSize: '15px',
        lineHeight: '22px',
        color: theme.palette.text.main,
        '&>div': {
            marginLeft: '16px',
            '& a': {
                color: theme.palette.text.main,
            },
        },
    },
    checkbox: {
        padding: 0,
        height: 'fit-content',
    },
}));

export const _Checkbox = ({ children, ...props }) => {
    const classes = useStyles();
    return (
        <div className={`${classes.checkboxGroup} ${props.className}`} style={props.style}>
            <Checkbox
                color="primary"
                classes={{ root: classes.checkbox }}
                checked={props.checked}
                onChange={() => props.onChange(!props.checked)}
            />
            <div>{children}</div>
        </div>
    );
};

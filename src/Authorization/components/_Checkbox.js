import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    checkboxGroup: {
        display: 'flex',
        marginBottom: '6px',
        fontFamily: 'Museo Sans Cyrl Regular',
        fontSize: '15px',
        lineHeight: '22px',
        color: '#1C1C1C',
        '&>div': {
            marginLeft: '16px',
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
        <div className={`${classes.checkboxGroup} ${props.className}`}>
            <Checkbox color="primary" classes={{ root: classes.checkbox }} checked={props.checked}
                      onChange={() => props.onChange(!props.checked)} />
            <div>{children}</div>
        </div>
    );
};

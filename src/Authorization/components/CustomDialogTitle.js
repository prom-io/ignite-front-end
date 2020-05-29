import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { CloseIcon } from '../../icons/CloseIcon';
import { AttentionIcon } from '../../icons/AttentionIcon';

const useStyles = makeStyles(theme => ({
    titleBlock: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: '24px',
        background: '#FFFBF8',
        fontFamily: 'Museo Sans Cyrl Bold',
        fontSize: '28px',
    },
    titleHeader: {
        display: 'flex',
        alignItems: 'center',
    },
    logoIcon: {
        marginLeft: 32,
    },
    text: {
        marginLeft: 24,
    },
    closeIcon: {
        cursor: 'pointer',
        top: '-10px',
        right: '-10px',
        '& svg': {
            stroke: '#A1A1A1',
        },
    },
    colorPrimary: {
        '&:hover': {
            background: 'rgba(255, 92, 1, 0.2)',
        },
    },
}));

const CustomDialogTitle = ({ title, type, setLoginDialogOpen }) => {
    const classes = useStyles();
    return (
        <div className={classes.titleBlock}>
            <div className={classes.titleHeader}>
                { type === 'attention'
                    ? (
                        <a rel="noopener noreferrer" className={classes.logoIcon}>
                            { AttentionIcon() }
                        </a>
                    )
                    : (
                        <a rel="noopener noreferrer" className={classes.logoIcon}>
                            <div className="header-logo" />
                        </a>
                    )}
                <span className={classes.text}>{title}</span>
            </div>
            <IconButton
                aria-label="close"
                color="primary"
                classes={{
                    root: classes.closeIcon,
                    colorPrimary: classes.colorPrimary,
                }}
                onClick={() => setLoginDialogOpen(false)}
            >
                <CloseIcon />
            </IconButton>
        </div>
    );
};

export default CustomDialogTitle;

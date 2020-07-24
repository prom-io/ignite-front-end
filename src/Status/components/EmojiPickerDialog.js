import React from 'react';
import { observer } from 'mobx-react';
import { ClickAwayListener, makeStyles } from '@material-ui/core';
import Picker from 'react-emojipicker';

import { useStore } from '../../store/hooks';

const useStyles = makeStyles(theme => ({
    emojiPickerDialog: {
        zIndex: 3,
        position: 'absolute',
        left: '100px',
        bottom: '-305px',
        [theme.breakpoints.down('xs')]: {
            left: 0,
            bottom: '-318px',
        },

        '& > div > div': {
            height: '315px',
            [theme.breakpoints.down('xs')]: {
                width: 'unset',
            },
        },

        '& > div > div > div': {
            '&:first-child': {
                width: 'unset',
                position: 'absolute',
                top: 0,
                left: 0,
            },
            '&:last-child': {
                paddingLeft: '60px',
                width: 'unset',
            },
        },

        '& span.ld-emoji img': {
            width: '20px !important',
            height: '20px !important',
        },
    },
}));

export const EmojiPickerDialog = observer(() => {
    const classes = useStyles();
    const {
        emojiPickerDialogVisible,
        addEmoji,
        setEmojiPickerDialogVisible,
    } = useStore().createStatus;

    const onEmojiClick = emoji => {
        addEmoji(emoji);
    };

    return (
        emojiPickerDialogVisible && (
            <ClickAwayListener
                onClickAway={() => setEmojiPickerDialogVisible(false)}
            >
                <div className={classes.emojiPickerDialog}>
                    <Picker onEmojiSelected={onEmojiClick} />
                </div>
            </ClickAwayListener>
        )
    );
});

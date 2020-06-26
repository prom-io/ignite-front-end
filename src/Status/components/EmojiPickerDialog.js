import React from 'react';
import { observer } from 'mobx-react';
import { ClickAwayListener, makeStyles } from '@material-ui/core';
import Picker from 'emoji-picker-react';

import { useStore } from '../../store/hooks';

const useStyles = makeStyles(theme => ({
    emojiPickerDialog: {
        zIndex: 3,
        position: 'absolute',
        left: '100px',
        bottom: '-230px',
        [theme.breakpoints.down('xs')]: {
            left: 0,
        },

        '& .emoji-picker-react': {
            boxShadow: 'none',
            height: '240px',
            [theme.breakpoints.down('xs')]: {
                width: '100% !important',
            },
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

    const onEmojiClick = (event, emoji) => {
        addEmoji(emoji);
    };

    return (
        emojiPickerDialogVisible && (
            <ClickAwayListener
                onClickAway={() => setEmojiPickerDialogVisible(false)}
            >
                <div className={classes.emojiPickerDialog}>
                    <Picker
                        onEmojiClick={onEmojiClick}
                        groupNames={{ smileys_people: 'PEOPLE' }}
                        disableAutoFocus
                        preload
                    />
                </div>
            </ClickAwayListener>
        )
    );
});

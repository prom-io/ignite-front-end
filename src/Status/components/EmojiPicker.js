import React from 'react';
import { observer } from 'mobx-react';
import Picker from 'react-emojipicker';
import { ClickAwayListener, makeStyles } from '@material-ui/core';

import { useStore } from '../../store/hooks';

const useStyles = makeStyles(theme => ({
    emojiPicker: {
        zIndex: 3,
        position: 'absolute',
        left: '100px',
        bottom: '-310px',
        [theme.breakpoints.down('xs')]: {
            left: 0,
        },

        '& > div > div': {
            height: '315px',
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

export const EmojiPicker = observer(() => {
    const classes = useStyles();
    const {
        emojiPickerVisible,
        addEmoji,
        setEmojiPickerVisible,
    } = useStore().createStatus;

    const onEmojiClick = emoji => {
        addEmoji(emoji);
    };

    return (
        emojiPickerVisible && (
            <ClickAwayListener onClickAway={() => setEmojiPickerVisible(false)}>
                <div className={classes.emojiPicker}>
                    <Picker onEmojiSelected={onEmojiClick} />
                </div>
            </ClickAwayListener>
        )
    );
});

import React from 'react';
import { IconButton, makeStyles } from '@material-ui/core';

import { SmileIcon } from '../../icons/SmileIcon';

const useStyles = makeStyles(() => ({
    emojiImageInput: {
        width: 20,
        height: 20,
        padding: '0px !important',
    },
    disabled: {
        background: 'none !important',
    },
}));

export const EmojiInput = ({
    setEmojiPickerVisible,
    setEmojiPickerDialogVisible,
    isDialogEmojiPicker,
    handleEmojiClick,
}) => {
    const classes = useStyles();
    const iconHandleClick = () => {
        isDialogEmojiPicker
          ? setEmojiPickerDialogVisible(true)
          : setEmojiPickerVisible(true)
    };

    return (
        <IconButton
            name="test"
            component="label"
            variant="text"
            className={classes.emojiImageInput}
            onClick={()=>iconHandleClick()}
            disableRipple
        >
            <SmileIcon />
        </IconButton>
    );
};

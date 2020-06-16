import React from "react";
import { observer } from "mobx-react";
import { ClickAwayListener, makeStyles } from "@material-ui/core";
import { Picker } from "emoji-mart";

import { useStore } from "../../store/hooks";

const useStyles = makeStyles(theme => ({
    emojiPicker: {
        zIndex: 3,
        position: "absolute",
        top: "160px",
        left: "100px",
        [theme.breakpoints.down("xs")]: {
            left: 0
        },

        "& .emoji-mart": {
            [theme.breakpoints.down("xs")]: {
                width: "100% !important"
            }
        },

        "& .emoji-mart-bar .emoji-mart-preview": {
            display: "none"
        }
    }
}));

export const EmojiPicker = observer(() => {
    const classes = useStyles();
    const {
        emojiPickerVisible,
        addEmoji,
        setEmojiPickerVisible
    } = useStore().createStatus;

    return (
        emojiPickerVisible && (
            <ClickAwayListener onClickAway={() => setEmojiPickerVisible(false)}>
                <div className={classes.emojiPicker}>
                    <Picker
                        onSelect={emoji => addEmoji(emoji)}
                        set="apple"
                        showPreview={false}
                    />
                </div>
            </ClickAwayListener>
        )
    );
});

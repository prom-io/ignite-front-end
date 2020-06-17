import React from "react";
import { observer } from "mobx-react";
import { ClickAwayListener, makeStyles } from "@material-ui/core";
import { Picker } from "emoji-mart";

import { useStore } from "../../store/hooks";

const useStyles = makeStyles(theme => ({
    emojiPickerDialog: {
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

        "& .emoji-mart-scroll": {
            height: "140px"
        },

        "& .emoji-mart-bar .emoji-mart-preview": {
            display: "none"
        }
    }
}));

export const EmojiPickerDialog = observer(() => {
    const classes = useStyles();
    const {
        emojiPickerDialogVisible,
        addEmoji,
        setEmojiPickerDialogVisible
    } = useStore().createStatus;

    return (
        emojiPickerDialogVisible && (
            <ClickAwayListener
                onClickAway={() => setEmojiPickerDialogVisible(false)}
            >
                <div className={classes.emojiPickerDialog}>
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

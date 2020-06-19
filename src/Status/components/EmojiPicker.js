import React from "react";
import { observer } from "mobx-react";
import { ClickAwayListener, makeStyles } from "@material-ui/core";
import Picker from "emoji-picker-react";

import { useStore } from "../../store/hooks";

const useStyles = makeStyles(theme => ({
    emojiPicker: {
        zIndex: 3,
        position: "absolute",
        left: "100px",
        bottom: "-310px",
        [theme.breakpoints.down("xs")]: {
            left: 0
        },

        "& .emoji-picker-react": {
            boxShadow: "none",
            [theme.breakpoints.down("xs")]: {
                width: "100% !important"
            }
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

    const onEmojiClick = (event, emoji) => {
        addEmoji(emoji);
    };

    return (
        emojiPickerVisible && (
            <ClickAwayListener onClickAway={() => setEmojiPickerVisible(false)}>
                <div className={classes.emojiPicker}>
                    <Picker
                        onEmojiClick={onEmojiClick}
                        groupNames={{ smileys_people: "PEOPLE" }}
                        disableAutoFocus
                        preload
                    />
                </div>
            </ClickAwayListener>
        )
    );
});

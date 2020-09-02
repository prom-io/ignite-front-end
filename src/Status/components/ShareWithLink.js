import React from "react";
import { observer } from "mobx-react";
import { MenuItem, ListItemIcon, ListItemText, makeStyles } from "@material-ui/core";

import { useLocalization } from "../../store";
import { ShareIcon } from "../../icons/ShareIcon";

const useStyles = makeStyles(() => ({
    listItemIconRoot: {
        minWidth: 15,
        marginRight: 8
    }
}));

export const ShareWithLink = observer(({ status, setOpen }) => {
    const classes = useStyles();
    const { l } = useLocalization();

    const copyToClipboard = () => {
        const textField = document.createElement("textarea");
        textField.innerText = `${window.location.origin}/status/${status.id}`;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand("copy");
        textField.remove();

        if (setOpen) {
            setOpen(false);
        }
    };

    return (
        <MenuItem onClick={copyToClipboard}>
            <ListItemIcon
                classes={{
                    root: classes.listItemIconRoot
                }}
            >
                <ShareIcon />
            </ListItemIcon>
            <ListItemText>{l("status.copy-link")}</ListItemText>
        </MenuItem>
    );
});

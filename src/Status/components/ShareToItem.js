import React from "react";
import { observer } from "mobx-react";
import { MenuItem, ListItemIcon, ListItemText, makeStyles } from "@material-ui/core";
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    LinkedinShareButton,
    LinkedinIcon
} from "react-share";

import { trimString } from "../../utils/string-utils";
import { useLocalization } from "../../store";

const useStyles = makeStyles(() => ({
    shareButton: {
        width: "100%"
    },
    listItemIconRoot: {
        minWidth: 15,
        marginRight: 8
    }
}));

export const ShareToItem = observer(({ to, status, setOpen }) => {
    const classes = useStyles();
    const { l } = useLocalization();

    switch (to) {
        case "Facebook": {
            return (
                <FacebookShareButton
                    url={`http://beta.ignite.so/status/${status.id}`}
                    quote={trimString(
                        status.content || status.referred_status.content,
                        200
                    )}
                    className={classes.shareButton}
                    onClick={() => setOpen(false)}
                >
                    <MenuItem>
                        <ListItemIcon
                            classes={{
                                root: classes.listItemIconRoot
                            }}
                        >
                            <FacebookIcon size={16} round />
                        </ListItemIcon>
                        <ListItemText>{l("status.share-facebook")}</ListItemText>
                    </MenuItem>
                </FacebookShareButton>
            );
        }
        case "Twitter": {
            return (
                <TwitterShareButton
                    url={`http://beta.ignite.so/status/${status.id}`}
                    title={trimString(
                        status.content || status.referred_status.content,
                        200
                    )}
                    className={classes.shareButton}
                    onClick={() => setOpen(false)}
                >
                    <MenuItem>
                        <ListItemIcon
                            classes={{
                                root: classes.listItemIconRoot
                            }}
                        >
                            <TwitterIcon size={16} round />
                        </ListItemIcon>
                        <ListItemText>{l("status.share-twitter")}</ListItemText>
                    </MenuItem>
                </TwitterShareButton>
            );
        }
        case "LinkedIn": {
            return (
                <LinkedinShareButton
                    url={`http://beta.ignite.so/status/${status.id}`}
                    className={classes.shareButton}
                    onClick={() => setOpen(false)}
                >
                    <MenuItem>
                        <ListItemIcon
                            classes={{
                                root: classes.listItemIconRoot
                            }}
                        >
                            <LinkedinIcon size={16} round />
                        </ListItemIcon>
                        <ListItemText>{l("status.share-linkedin")}</ListItemText>
                    </MenuItem>
                </LinkedinShareButton>
            );
        }
    }
});

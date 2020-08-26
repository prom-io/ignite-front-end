import React, { useState } from "react";
import { Button, makeStyles } from "@material-ui/core";

import { localized } from "../../localization/components";

const useStyles = makeStyles(theme => ({
    joinBtn: {
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: "30px",
        padding: "5px 21px",
        color: "#FF5C01",
        width: "96px",
        height: "32px",
        fontSize: "15px",
        fontWeight: 600,
        lineHeight: "18px",

        [theme.breakpoints.down("md")]: {
            width: "90px"
        },

        "&.join": {
            background: "#fff"
        },

        "&.leave": {
            border: "none",
            background: "rgba(255, 92, 1, 0.2)"
        }
    }
}));

const _CommunityJoinButton = ({ community, doJoin, l }) => {
    const classes = useStyles();
    const [statusBtn, setStatusBtn] = useState(
        community.following ? "leave" : "join"
    );

    return (
        <Button
            variant="contained"
            color="primary"
            className={[classes.joinBtn, statusBtn].join(" ")}
            onClick={() => doJoin(community, setStatusBtn)}
        >
            {l(`community.button.${statusBtn}`)}
        </Button>
    );
};

export const CommunityJoinButton = localized(_CommunityJoinButton);

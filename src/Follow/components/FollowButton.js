import React, { useState } from "react";
import { inject } from "mobx-react";
import { Button, makeStyles } from "@material-ui/core";

import { localized } from "../../localization/components";

const useStyles = makeStyles(theme => ({
    followBtn: {
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: "30px",
        width: "80px",
        height: "24px",
        padding: "5px 21px",
        lineHeight: 0,
        color: "#FF5C01",
        fontSize: "12px",

        "&.lg": {
            width: "96px",
            height: "32px",
            fontSize: "15px",
            fontWeight: 600,
            lineHeight: "18px"
        },

        "&.follow": {
            background: "transparent"
        },

        "&.following": {
            border: "none",
            background: "rgba(255, 92, 1, 0.2)"
        },

        "&.followed": {
            border: "none",
            background: "rgba(255, 92, 1, 0.2)"
        },

        "&.unfollow": {
            background: theme.palette.primary.main,
            color: "#fff"
        }
    }
}));

const _FollowButton = ({ user, handleClick, size, l }) => {
    const classes = useStyles();
    const [statusBtn, setStatusBtn] = useState(
        user.following ? "followed" : user.followingForBtn ? "following" : "follow"
    ); // follow, followed, following or unfollow

    const handleMouseEnter = () => {
        if (statusBtn === "following" || statusBtn === "followed") {
            setStatusBtn("unfollow");
        }
    };

    const handleMouseLeave = () => {
        if (statusBtn === "unfollow") {
            setStatusBtn(
                user.following
                    ? "followed"
                    : user.followingForBtn
                    ? "following"
                    : "follow"
            );
        }
    };

    const changeStatus = () => {
        if (statusBtn === "follow") {
            setStatusBtn("following");
        } else if (statusBtn === "unfollow") {
            setStatusBtn("follow");
        }
    };

    return (
        <Button
            variant="contained"
            color="primary"
            className={[classes.followBtn, statusBtn, size].join(" ")}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => {
                handleClick(user);
                changeStatus();
            }}
        >
            {l(`user.profile.${statusBtn}`)}
        </Button>
    );
};

const mapMobxToProps = ({}) => ({});

export const FollowButton = localized(inject(mapMobxToProps)(_FollowButton));

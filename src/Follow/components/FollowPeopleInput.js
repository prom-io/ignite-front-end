import React from "react";
import { inject, observer } from "mobx-react";
import { Button, makeStyles } from "@material-ui/core";

import { localized } from "../../localization/components";

const useStyles = makeStyles(theme => ({
    followInputWrapper: {
        background: theme.palette.background.light,
        border: `1px solid ${theme.palette.border.main}`,
        borderRadius: "4px 4px 0px 0px",
        marginTop: "16px",
        padding: "16px",
        [theme.breakpoints.down("sm")]: {
            marginTop: 0
        }
    },
    followInputRow: {
        position: "relative",

        "& input": {
            boxSizing: "border-box",
            fontFamily: "Museo Sans Cyrl Regular",
            fontStyle: "normal",
            fontWeight: 300,
            fontSize: "15px",
            lineHeight: "18px",
            height: 42,
            width: "100%",
            borderRadius: 30,
            border: `1px solid ${theme.palette.border.main}`,
            outline: "none",
            padding: "0 105px 0 24px"
        },

        "& button": {
            position: "absolute",
            right: 0,
            maxWidth: 95,
            borderRadius: 30,
            height: 42,
            fontWeight: 600,
            fontSize: "15px",
            lineHeight: "18px",

            "&.Mui-disabled": {
                fontSize: "15px !important",
                pointerEvents: "auto !important",
                cursor: "no-drop !important"
            }
        }
    }
}));

const _FollowPeopleInput = ({
    setFollowInputValue,
    fetchSearchPeople,
    followInputValue,
    l
}) => {
    const classes = useStyles();

    return (
        <div className={classes.followInputWrapper}>
            <div className={classes.followInputRow}>
                <input
                    type="text"
                    placeholder={l("follow.people.enter")}
                    value={followInputValue}
                    onChange={event => setFollowInputValue(event.target.value)}
                />
                <Button
                    color="primary"
                    variant="contained"
                    onClick={fetchSearchPeople}
                    disabled={!followInputValue || !followInputValue.trim()}
                    fullWidth
                >
                    {l("appbar.search")}
                </Button>
            </div>
        </div>
    );
};

const mapMobxToProps = ({ followPeople }) => ({
    setFollowInputValue: followPeople.setFollowInputValue,
    fetchSearchPeople: followPeople.fetchSearchPeople,
    followInputValue: followPeople.followInputValue
});

export const FollowPeopleInput = localized(
    inject(mapMobxToProps)(observer(_FollowPeopleInput))
);

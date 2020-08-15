import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import { Grid, Typography, Button, makeStyles } from "@material-ui/core";

import { localized } from "../../localization/components";
import { DetailsIcon } from "../../icons/DetailsIcon";
import rulesPattern from "../../images/memezator-rules-pattern.jpg";

const useStyles = makeStyles(theme => ({
    memezatorRulesWrapper: {
        border: `1px solid ${theme.palette.primary.main}`,
        borderTopLeftRadius: "4px",
        borderTopRightRadius: "4px",
        padding: "16px 18px",
        color: "#1C1C1C",
        background: `url(${rulesPattern})`,
        [theme.breakpoints.down("sm")]: {
            borderLeft: "unset",
            borderRight: "unset",
            borderRadius: 0
        }
    },
    memezatorRulesHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "9px",
        [theme.breakpoints.down("sm")]: {
            marginBottom: "16px"
        }
    },
    memezatorRulesTitle: {
        fontSize: "20px",
        fontWeight: 600,
        [theme.breakpoints.down("sm")]: {
            fontSize: "16px"
        }
    },
    memezatorRulesPower: {
        fontSize: "15px",
        fontWeight: 600,
        [theme.breakpoints.down("sm")]: {
            fontSize: "14px"
        }
    },
    memezatorRulesContent: {
        marginBottom: "12px"
    },
    memezatorRulesParagraph: {
        fontSize: "15px",
        [theme.breakpoints.down("sm")]: {
            fontSize: "14px"
        }
    },
    memezatorRulesAction: {
        textAlign: "right"
    },
    memezatorRulesActionBtn: {
        background: "#fff",
        height: "24px",
        minWidth: "56px",
        [theme.breakpoints.down("sm")]: {
            height: "28px"
        }
    }
}));

const _MemezatorRules = ({ currentUser, l }) => {
    const classes = useStyles();
    const [showRules, setShowRules] = useState(false);

    return (
        <Grid item xs={12} className={classes.memezatorRulesWrapper}>
            <div className={classes.memezatorRulesHeader}>
                <Typography
                    classes={{ root: classes.memezatorRulesTitle }}
                    variant="h5"
                >
                    {l("memezator.rules")}
                </Typography>
                {currentUser && (
                    <Typography
                        classes={{ root: classes.memezatorRulesPower }}
                        variant="h6"
                    >
                        {l("memezator.voting-power")}: {currentUser.voting_power}
                    </Typography>
                )}
            </div>
            <div className={classes.memezatorRulesContent}>
                <Typography classes={{ root: classes.memezatorRulesParagraph }}>
                    <b>1.</b> Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                </Typography>
                <Typography classes={{ root: classes.memezatorRulesParagraph }}>
                    <b>2.</b> Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Typography>
                {showRules && (
                    <>
                        <Typography
                            classes={{ root: classes.memezatorRulesParagraph }}
                        >
                            <b>3.</b> Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua.
                        </Typography>
                        <Typography
                            classes={{ root: classes.memezatorRulesParagraph }}
                        >
                            <b>4.</b> Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.
                        </Typography>
                    </>
                )}
            </div>
            <div className={classes.memezatorRulesAction}>
                <Button
                    classes={{ root: classes.memezatorRulesActionBtn }}
                    color="primary"
                    variant="outlined"
                    onClick={() => setShowRules(!showRules)}
                >
                    <DetailsIcon />
                </Button>
            </div>
        </Grid>
    );
};

const mapMobxToProps = ({ authorization }) => ({
    currentUser: authorization.currentUser
});

export const MemezatorRules = localized(
    inject(mapMobxToProps)(observer(_MemezatorRules))
);

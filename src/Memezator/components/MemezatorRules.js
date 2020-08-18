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
    memezatorRulesNotes: {
        fontSize: "15px",
        margin: '10px 0',
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
              <Typography classes={{ root: classes.memezatorRulesNotes }}>
                {l('memezator.rules-list.note-top')}
              </Typography>
                {(l('memezator.rules-list')).map((rule, index) => {
                    return <Typography key={index} classes={{ root: classes.memezatorRulesParagraph }}>
                        <b>{index+1}.</b> {rule}
                    </Typography>
                })}
                {showRules &&
                  <>
                    {(l('memezator.rules-list-hidden')).map((rule, index) => {
                        return <Typography key={index} classes={{ root: classes.memezatorRulesParagraph }}>
                            <b>{(l('memezator.rules-list')).length+index+1}.</b> {rule}
                        </Typography>
                    })}
                      <Typography classes={{ root: classes.memezatorRulesNotes }}>
                          <b>*</b> {l('memezator.rules-list.note-bottom')}
                      </Typography>
                  </>
                }
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

import React from "react";
import {inject, observer} from "mobx-react";
import {CardHeader, CardContent, Avatar, makeStyles, Hidden, Typography, Divider} from "@material-ui/core";
import {Link} from "mobx-router";
import {Routes} from "../../routes";
import {addLineBreak, trimString} from "../../utils/string-utils";
import {SmallEllipseIcon} from "../../icons/SmallEllipseIcon";
import prettyDate from "pretty-date";

const useStyles = makeStyles(() => ({
    commentHeader: {
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        width: "100%"
    }
}));

const _CommentListItem = ({comment, routerStore}) => {
    const classes = useStyles();

    return (
        <div style={{width: "100%"}}>
            <CardHeader className={classes.commentHeader}
                        avatar={<Avatar src={comment.author.avatar} className="avatar-mini"/>}
                        title={
                            <Link store={routerStore}
                                  view={Routes.userProfile}
                                  params={{username: comment.author.username}}
                                  style={{
                                      textDecoration: "underline",
                                      color: "inherit"
                                  }}
                            >
                                <Hidden xsDown>
                                    <Typography>
                                        <strong>{trimString(comment.author.display_name, 35)}</strong>
                                    </Typography>
                                </Hidden>
                                <Hidden smUp>
                                    <Typography>
                                        <strong>{addLineBreak(comment.author.display_name)}</strong>
                                    </Typography>
                                </Hidden>
                            </Link>
                        }
                        subheader={
                            <div style={{
                                display: "flex",
                                alignItems: "center"
                            }}>
                                <Hidden xsDown>
                                    <Typography>
                                        @{trimString(comment.author.username, 35)}
                                    </Typography>
                                </Hidden>
                                <Hidden smUp>
                                    <Typography style={{fontSize: 15}}>
                                        @{trimString(comment.author.username, 20)}
                                    </Typography>
                                </Hidden>
                                <Typography style={{marginLeft: 12, fontSize: 12}}>
                                    <SmallEllipseIcon/> {prettyDate.format(new Date(comment.created_at))}
                                </Typography>
                            </div>
                        }
            />
            <CardContent>
                <Typography>
                    {comment.text}
                </Typography>
            </CardContent>
            <Divider style={{
                width: "100%"
            }}/>
        </div>
    )
};

const mapMobxToProps = ({store}) => ({
    routerStore: store
});

export const CommentListItem = inject(mapMobxToProps)(observer(_CommentListItem));

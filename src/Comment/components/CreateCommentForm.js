import React from "react";
import {TextField, Button, CircularProgress, makeStyles} from "@material-ui/core";
import {localized} from "../../localization/components";

const useStyles = makeStyles(theme => ({
    createCommentButton: {
        borderRadius: 30,
        float: "right",
        width: "114px",
        marginTop: theme.spacing(2)
    },
    createCommentForm: {
        display: "inline-block",
        width: "100%"
    }
}));

const _CreateCommentForm = ({text, setText, pending, createComment, l}) => {
    const classes = useStyles();

    return (
        <div className={classes.createCommentForm}>
            <TextField placeholder={l("comment.write-comment")}
                       onChange={event => setText(event.target.value)}
                       value={text}
                       fullWidth
                       multiline
                       rows={4}
            />
            <Button variant="contained"
                    color="primary"
                    disabled={pending || text.length === 0 || text.length === 250}
                    onClick={createComment}
                    className={classes.createCommentButton}
            >
                {pending && <CircularProgress size={15} color="primary"/>}
                {l("status.send")}
            </Button>
        </div>
    )
};

export const CreateCommentForm = localized(_CreateCommentForm);

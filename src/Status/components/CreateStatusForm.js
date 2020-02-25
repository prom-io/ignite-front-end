import React, {useState} from "react";
import {inject, observer} from "mobx-react";
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CircularProgress,
    Grid,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    createStatusFormCard: {
        background: "#F1EBE8"
    },
    remainingCharactersCounter: {
        background: "#FBF7F6",
        justifyContent: "space-between",
        padding: "7px 10px"
    },
    createStatusButtonWrapper: {
        paddingTop: 15
    },
    createStatusButton: {
        borderRadius: 30,
        float: "right",
        width: "114px",
    }
}));

const _CreateStatusForm = ({
    charactersRemaining,
    submissionError,
    content,
    pending,
    currentUserAvatar,
    setContent,
    createStatus,
    hideSendButton = false
}) => {
    const classes = useStyles();

    const [inputFocused, setInputFocused] = useState(false);

    return (
        <Card className={classes.createStatusFormCard} className="create-status-form">
            <Grid container style={{
                padding: "25px 15px 25px 15px"
            }}>
                <Grid item xs={1}>
                    <Avatar src={currentUserAvatar} className="avatar-mini"/>
                </Grid>
                <Grid item xs={11}>
                    <TextField placeholder="What's on your mind?"
                               multiline
                               rows="4"
                               onFocus={event => {
                                   console.log(event);
                                   setInputFocused(true)
                               }}
                               onBlur={() => setInputFocused(false)}
                               onChange={event => setContent(event.target.value)}
                               fullWidth
                               value={content}
                               className="create-status-form-textfield"
                    />
                </Grid>
            </Grid>
            <CardActions style={{display: "flex"}}>
                <Grid container justify="flex-start">
                        <div className="create-status-form-pic">
                            <img src="/pic.png" />
                            <img src="/pic-gif-disabled.png" />
                            <img src="/pic-list-disabled.png" />
                            <img src="/pic-smile-disabled.png" />
                        </div>
                </Grid>
                <Grid container justify="flex-end">
                    <Grid item xs={12} className="create-status-form-counter-container">
                            <div className={classes.remainingCharactersCounter}>
                                <Typography variant="body1"
                                            color="textSecondary"
                                >
                                    {charactersRemaining}
                                </Typography>
                            </div>
                    </Grid>
                    <Grid item xs={12} className="create-status-form-button-container">
                        {!hideSendButton && (
                            <Button variant="contained"
                                    color="primary"
                                    className={classes.createStatusButton}
                                    onClick={createStatus}
                                    disabled={!(content.length > 0)}
                            >
                                {pending && <CircularProgress size={15}/>}
                                Send
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    )
};

const mapMobxToProps = ({createStatus, authorization}) => ({
    charactersRemaining: createStatus.charactersRemaining,
    submissionError: createStatus.submissionError,
    content: createStatus.content,
    pending: createStatus.pending,
    currentUserAvatar: authorization.currentUser
        ? authorization.currentUser.avatar || "http://localhost:3000/avatars/original/missing.png"
        : "http://localhost:3000/avatars/original/missing.png",
    setContent: createStatus.setContent,
    createStatus: createStatus.createStatus
});

export const CreateStatusForm = inject(mapMobxToProps)(observer(_CreateStatusForm));

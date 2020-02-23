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
        padding: 10
    },
    createStatusButtonWrapper: {
        paddingTop: 15
    },
    createStatusButton: {
        borderRadius: 30,
        float: "right"
    }
}));

const _CreateStatusForm = ({
    charactersRemaining,
    submissionError,
    content,
    pending,
    currentUserAvatar,
    setContent,
    createStatus
}) => {
    const classes = useStyles();

    const [inputFocused, setInputFocused] = useState(false);

    return (
        <Card className={classes.createStatusFormCard} className="create-status-form">
            <Grid container style={{
                padding: "25px 15px 25px 15px"
            }}>
                <Grid item xs={1}>
                    <Avatar src={currentUserAvatar} classname=""/>
                </Grid>
                <Grid item xs={11}>
                    <TextField placeholder="What's on your mind?"
                               multiline
                               rows={inputFocused || content.length > 0 ? 4 : 1}
                               onFocus={event => {
                                   console.log(event);
                                   setInputFocused(true)
                               }}
                               onBlur={() => setInputFocused(false)}
                               onChange={event => setContent(event.target.value)}
                               fullWidth
                               value={content}
                               className="create-status-counter"
                    />
                    <Grid item xs={12}>
                        {(inputFocused || content.length > 0) && (
                            <div className={classes.remainingCharactersCounter}>
                                <Typography variant="body1"
                                            color="textSecondary"
                                >
                                    {charactersRemaining}
                                </Typography>
                            </div>
                        )}
                    </Grid>
                </Grid>
            </Grid>
            <CardActions style={{display: "flex"}}>
                <Grid container justify="space-between">
                    <Grid item xs={12}>
                        {pending && <CircularProgress size={15}/>}
                        {inputFocused && (
                            <Button variant="contained"
                                    color="primary"
                                    disableElevation
                                    className={classes.createStatusButton}
                                    onClick={createStatus}
                                    disabled={pending}
                            >
                                Publish
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

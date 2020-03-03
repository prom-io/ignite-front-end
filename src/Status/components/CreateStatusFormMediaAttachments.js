import React from "react";
import {makeStyles} from "@material-ui/core";
import {CreateStatusFormMediaAttachment} from "./CreateStatusFormMediaAttachment";

const useStyles = makeStyles(() => ({
    mediaFilesContainer: {
        display: "flex"
    }
}));

export const CreateStatusFormMediaAttachments = ({mediaAttachmentsFiles, onDelete}) => {
    const classes = useStyles();

    return (
        <div className={classes.mediaFilesContainer}>
            {mediaAttachmentsFiles.map(fileContainer => (
                <CreateStatusFormMediaAttachment fileContainer={fileContainer}
                                                 onDelete={onDelete}
                />
            ))}
        </div>
    )
};

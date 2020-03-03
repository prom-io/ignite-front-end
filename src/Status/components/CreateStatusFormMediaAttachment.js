import React, {useState} from "react";
import {makeStyles, IconButton, CircularProgress} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(theme => ({
    centered: {
        marginLeft: "auto",
        marginRight: "auto",
        display: "table"
    },
    mediaFile: {
        width: 100,
        height: 100,
        marginRight: theme.spacing(2),
        backgroundSize: "cover"
    },
}));

export const CreateStatusFormMediaAttachment = ({fileContainer, onDelete}) => {
    const [hovered, setHovered] = useState(false);
    const classes = useStyles();

    const hoveredStyle = {
        backgroundImage: `url(${fileContainer.url})`,
        boxShadow: "inset 0 0 0 1000px rgba(255, 255, 255, 0.2)"
    };

    const notHoveredStyle = {
        backgroundImage: `url(${fileContainer.url})`
    };

    return (
        <div className={classes.mediaFile}
             style={hovered ? hoveredStyle : notHoveredStyle}
             onMouseOver={() => setHovered(true)}
             onMouseOut={() => setHovered(false)}
             key={fileContainer.fileId}
        >
            {!fileContainer.pending && (
                <IconButton onClick={() => onDelete(fileContainer.fileId)}
                            style={{float: "right"}}
                            color="primary"
                            size="small"
                >
                    <CloseIcon/>
                </IconButton>
            )}
            {fileContainer.pending && <CircularProgress size={15} className={classes.centered}/>}
        </div>
    )
};

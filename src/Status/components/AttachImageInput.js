import React, {useState} from "react";
import {IconButton, Tooltip, makeStyles} from "@material-ui/core";
import {AttachImageIcon} from "../../icons/AttachImageIcon";

const useStyles = makeStyles(() => ({
    attachImageInput: {
        width: 20,
        height: 20,
        padding: "0px !important"
    }
}));

export const AttachImageInput = ({onImageAttached, disabled, disabledLabel}) => {
    const [value, setValue] = useState("");

    const classes = useStyles();

    return (
        disabled
            ? (
                <Tooltip title={disabledLabel}>
                    <div>
                        <IconButton disabled
                                    disableRipple
                                    disableElevation
                                    variant="text"
                                    className={classes.attachImageInput}
                        >
                            <AttachImageIcon/>
                        </IconButton>
                    </div>
                </Tooltip>
            )
            : (
                <IconButton component="label"
                        disableRipple
                        variant="text"
                        className={classes.attachImageInput}
                >
                    <AttachImageIcon/>
                    <input type="file"
                           value={value}
                           style={{display: "none"}}
                           accept="image/png, image/jpg, image/jpeg"
                           onClick={() => setValue("")}
                           onChange={event => {
                               if (event.target.files && event.target.files.length !== 0) {
                                   onImageAttached(event.target.files[0]);
                               }
                           }}
                    />
                </IconButton>
            )
    );
};

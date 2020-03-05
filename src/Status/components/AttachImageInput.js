import React, {useState} from "react";
import {IconButton, Tooltip, makeStyles} from "@material-ui/core";
import {AttachImageIcon} from "../../icons/AttachImageIcon";
import {AttachImageDisabledIcon} from "../../icons/AttachImageDisabledIcon";

const useStyles = makeStyles(() => ({
    attachImageInput: {
        width: 20,
        height: 20,
        padding: "0px !important"
    },
    disabled: {
        background: "none !important"
    }
}));

export const AttachImageInput = ({onImagesAttached, disabled, disabledLabel}) => {
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
                                    classes={{
                                        disabled: classes.disabled
                                    }}
                        >
                            <AttachImageDisabledIcon/>
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
                           multiple
                           onChange={event => {
                               if (event.target.files && event.target.files.length !== 0) {
                                   let files = event.target.files;
                                   console.log(files);
                                   if (files.length > 10) {
                                       files = files.slice(0, 9)
                                   }
                                   onImagesAttached(files);
                               }
                           }}
                    />
                </IconButton>
            )
    );
};

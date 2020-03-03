import React, {useState} from "react";
import {IconButton, Tooltip} from "@material-ui/core";
import {AttachImageIcon} from "../../icons/AttachImageIcon";

export const AttachImageInput = ({onImageAttached, disabled, disabledLabel}) => {
    const [value, setValue] = useState("");

    return (
        disabled
            ? (
                <Tooltip title={disabledLabel}>
                    <IconButton disabled>
                        <AttachImageIcon/>
                    </IconButton>
                </Tooltip>
            )
            : (
                <IconButton component="label">
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

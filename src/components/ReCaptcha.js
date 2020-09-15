import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    captcha: {
        margin: "16px 0",
        [theme.breakpoints.down(340)]: {
            transform: "scale(0.82)",
            marginLeft: -25
        },
        [theme.breakpoints.down(321)]: {
            transform: "scale(0.7)",
            marginLeft: -32
        }
    }
}));

export const ReCaptcha = ({ onChange }) => {
    const classes = useStyles();

    return (
        <ReCAPTCHA
            className={classes.captcha}
            sitekey={process.env.REACT_APP_CAPTCHA_KEY}
            onChange={onChange}
            hl="en"
        />
    );
};

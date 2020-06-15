import React from "react";
import Gallery from "react-grid-gallery";
import { makeStyles } from "@material-ui/core";
import { ClickEventPropagationStopper } from "../../ClickEventProgatationStopper";

const useStyles = makeStyles(theme => ({
    isMobileStatusImage: {
        "& img": {
            maxWidth: "100%",
            marginLeft: "unset !important",

            [theme.breakpoints.down("450")]: {
                width: "100% !important",
                height: "100% !important",
                margin: "0 !important"
            }
        }
    }
}));

const tileViewportStyle = height => {
    return {
        width: height > 1000 ? "60%" : "100%",
        height: "100%",
        margin: "0 auto"
    };
};

const thumbnailStyle = () => {
    return {
        width: "100%",
        height: "100%"
    };
};

export const StatusMediaAttachments = ({ mediaAttachments, isOnlyImage }) => {
    const classes = useStyles();

    const gallery = mediaAttachments.map(mediaAttachment => ({
        src: mediaAttachment.url,
        thumbnail: mediaAttachment.url,
        thumbnailWidth: mediaAttachment.meta.width,
        thumbnailHeight: mediaAttachment.meta.height
    }));

    return (
        <div style={{ display: "flex" }}>
            <div style={{ flex: "auto" }} className={classes.isMobileStatusImage}>
                <ClickEventPropagationStopper>
                    <Gallery
                        images={gallery}
                        enableImageSelection={false}
                        thumbnailStyle={isOnlyImage && thumbnailStyle}
                        tileViewportStyle={() =>
                            tileViewportStyle(gallery[0].thumbnailHeight)
                        }
                        showLightboxThumbnails
                    />
                </ClickEventPropagationStopper>
            </div>
        </div>
    );
};

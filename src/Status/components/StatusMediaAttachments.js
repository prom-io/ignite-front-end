import React from "react";
import Gallery from "react-grid-gallery";
import { makeStyles } from "@material-ui/core";

import { ClickEventPropagationStopper } from "../../ClickEventProgatationStopper";

const useStyles = makeStyles(() => ({
    isMobileStatusImage: {
        "& img": {
            maxWidth: "100%",
            marginLeft: "unset !important",
            borderRadius: "4px"
        }
    }
}));

const thumbnailStyle = () => ({
    width: "100%",
    height: "100%"
});

export const StatusMediaAttachments = ({ mediaAttachments }) => {
    const classes = useStyles();

    const gallery = mediaAttachments.map(mediaAttachment => ({
        src: mediaAttachment.url,
        thumbnail: `${mediaAttachment.url}?size=${517}`,
        thumbnailWidth: mediaAttachments.length === 1 ? "100%" : mediaAttachment.meta.width,
        thumbnailHeight: mediaAttachment.meta.height
    }));

    return (
        <div style={{ display: "flex" }}>
            <div style={{ flex: "auto" }} className={classes.isMobileStatusImage}>
                <ClickEventPropagationStopper>
                    <Gallery
                        images={gallery}
                        enableImageSelection={false}
                        thumbnailStyle={
                            mediaAttachments.length === 1
                                ? thumbnailStyle
                                : undefined
                        }
                        showLightboxThumbnails
                        rowHeight={mediaAttachments.length === 1 ? "100%" : 180}
                    />
                </ClickEventPropagationStopper>
            </div>
        </div>
    );
};

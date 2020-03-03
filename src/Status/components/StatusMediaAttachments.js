import React from "react";
import Gallery from "react-grid-gallery";

export const StatusMediaAttachments = ({mediaAttachments}) => {
    const gallery = mediaAttachments.map(mediaAttachment => ({
        src: mediaAttachment.url,
        thumbnail: mediaAttachment.url,
        thumbnailWidth: mediaAttachment.meta.width,
        thumbnailHeight: mediaAttachment.meta.height
    }));

    return (
        <div style={{display: "flex"}}>
            <div style={{flex: "auto"}}>
                <Gallery images={gallery}
                         enableImageSelection={false}
                         backdropClosesModal={true}
                         showLightboxThumbnails={true}
                />
            </div>
        </div>
    )
};

import React from 'react';
import Gallery from 'react-grid-gallery';
import { ClickEventPropagationStopper } from '../../ClickEventProgatationStopper';

const statusOnlyImage = () => {
    return {
        width: "100%",
        height: "100%"
    };
}

export const StatusMediaAttachments = ({ mediaAttachments, isOnlyImage }) => {
    const gallery = mediaAttachments.map(mediaAttachment => ({
        src: mediaAttachment.url,
        thumbnail: mediaAttachment.url,
        thumbnailWidth: mediaAttachment.meta.width,
        thumbnailHeight: mediaAttachment.meta.height,
    }));

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 'auto' }}>
                <ClickEventPropagationStopper>
                    <Gallery
                        images={gallery}
                        enableImageSelection={false}
                        thumbnailStyle={isOnlyImage && statusOnlyImage}
                        tileViewportStyle={isOnlyImage && statusOnlyImage}
                        showLightboxThumbnails
                    />
                </ClickEventPropagationStopper>
            </div>
        </div>
    );
};

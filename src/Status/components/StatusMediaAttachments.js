import React from 'react';
import Gallery from 'react-grid-gallery';
import { ClickEventPropagationStopper } from '../../ClickEventProgatationStopper';

export const StatusMediaAttachments = ({ mediaAttachments }) => {
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
                        showLightboxThumbnails
                    />
                </ClickEventPropagationStopper>
            </div>
        </div>
    );
};

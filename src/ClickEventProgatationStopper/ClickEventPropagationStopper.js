import React from 'react';

export const ClickEventPropagationStopper = ({ children, className, style }) => (
    <div
        onClick={event => {
            event.stopPropagation();
            event.nativeEvent.stopImmediatePropagation();
            event.preventDefault();
            event.nativeEvent.preventDefault();
        }}
        className={className}
        style={style}
    >
        {children}
    </div>
);

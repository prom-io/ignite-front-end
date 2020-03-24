import React from "react";

export const ClickEventPropagationStopper = ({children, className}) => (
    <div onClick={event => {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        event.preventDefault();
        event.nativeEvent.preventDefault();
    }}
         className={className}
    >
        {children}
    </div>
);

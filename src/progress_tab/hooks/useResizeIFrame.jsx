import { useEffect } from 'react';

var lastHeight;
var lastWidth;

export const useResizeIFrame = () => {
    useEffect(() => {
        // Verify iframe
        if (window !== window.parent) {
            document.body.className += ' view-in-mfe';
            lastHeight = window.offsetHeight;
            lastWidth = window.offsetWidth;
            // Create an observer instance linked to the callback function
            const observer = new MutationObserver(dispatchResizeMessage);

            // Start observing the target node for configured mutations
            observer.observe(document.body, { attributes: true, childList: true, subtree: true });
            window.addEventListener('load', dispatchResizeMessage);
            window.addEventListener('resize', dispatchResizeMessage);
        }
        return () => {
            window.removeEventListener('load', dispatchResizeMessage);
            window.removeEventListener('resize', dispatchResizeMessage);
        }
    }, [ ]);
    
}


const dispatchResizeMessage = (event) => {
    // Note: event is actually an Array of MutationRecord objects
    // when fired from the MutationObserver
    var eventType = event.type || 'mutate';
    var newHeight = document.getElementById('content').offsetHeight;
    var newWidth = document.getElementById('content').offsetWidth;

    if (eventType !== 'load' && newWidth === lastWidth && newHeight === lastHeight) {
        return;
    }

    window.parent.postMessage({
        type: 'plugin.resize',
        payload: {
            width: newWidth,
            height: newHeight,
        }
        }, document.referrer
    );

    lastHeight = newHeight;
    lastWidth = newWidth;

    // Within the learning microfrontend the iframe resizes to match the
    // height of this document and it should never scroll. It does scroll
    // ocassionally when javascript is used to focus elements on the page
    // before the parent iframe has been resized to match the content
    // height. This window.scrollTo is an attempt to keep the content at the
    // top of the page. See TNL-7094
    window.scrollTo(0, 0);
}
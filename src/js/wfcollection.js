import { initWfCollections, wfCollections } from "@library/wfcollection.ts";

// Expose the functions to the global window object for the browser
window.initWfCollections = initWfCollections;
window.wfCollections = wfCollections;


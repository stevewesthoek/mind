"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_BRAIN_CONSOLE_SETTINGS = void 0;
exports.normalizeBrainCoreUrl = normalizeBrainCoreUrl;
exports.DEFAULT_BRAIN_CONSOLE_SETTINGS = {
    brainCoreUrl: 'http://127.0.0.1:4877',
};
function normalizeBrainCoreUrl(rawValue) {
    try {
        const url = new URL(rawValue);
        if (url.protocol !== 'http:' && url.protocol !== 'https:') {
            return { value: exports.DEFAULT_BRAIN_CONSOLE_SETTINGS.brainCoreUrl, error: 'Brain Core URL must use http or https.' };
        }
        const warning = isLikelyLocalhost(url.hostname)
            ? undefined
            : 'Brain Core URL is not localhost; this plugin is intended for local read-only use.';
        return { value: url.toString().replace(/\/+$/g, ''), warning };
    }
    catch {
        return { value: exports.DEFAULT_BRAIN_CONSOLE_SETTINGS.brainCoreUrl, error: 'Brain Core URL is invalid.' };
    }
}
function isLikelyLocalhost(hostname) {
    return ['localhost', '127.0.0.1', '::1'].includes(hostname);
}

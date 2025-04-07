// Suppress OSRM demo server warning
export function suppressOSRMSWarning() {
    const originalConsoleWarn = console.warn;
    console.warn = function (...args) {
        if (typeof args[0] === 'string' && args[0].includes("You are using OSRM's demo server")) {
            return; // Skip the warning
        }
        originalConsoleWarn.apply(console, args); // Let other warnings through
    };
}

// Debug utility for development logging
const DEBUG = {
    enabled: false,
    
    // Enable debug mode - should be called early in app initialization
    enable() {
        this.enabled = true;
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('debug_mode', 'true');
        }
    },

    // Disable debug mode
    disable() {
        this.enabled = false;
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem('debug_mode');
        }
    },

    // Initialize debug mode from localStorage
    init() {
        if (typeof localStorage !== 'undefined') {
            this.enabled = localStorage.getItem('debug_mode') === 'true';
        }
    },

    // Debug logging functions that only output when debug mode is enabled
    log(...args) {
        if (this.enabled) console.log('[DEBUG]', ...args);
    },

    warn(...args) {
        if (this.enabled) console.warn('[DEBUG]', ...args);
    },

    error(...args) {
        if (this.enabled) console.error('[DEBUG]', ...args);
    }
};

// Initialize debug mode
DEBUG.init();

export default DEBUG;

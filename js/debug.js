import { ENV } from './config.js';

// Debug utility for development logging
const DEBUG = {
    enabled: ENV.enableDebugLogging,
    performanceMarks: new Map(),
    errorCount: 0,
    warningCount: 0,

    // Enable debug mode - should be called early in app initialization
    enable() {
        if (ENV.isDevelopment) {
            this.enabled = true;
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('debug_mode', 'true');
            }
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

    // Performance monitoring
    startPerformanceMark(name) {
        if (!this.enabled) return;
        this.performanceMarks.set(name, performance.now());
        performance.mark(`start_${name}`);
    },

    endPerformanceMark(name) {
        if (!this.enabled) return;
        const startTime = this.performanceMarks.get(name);
        if (startTime) {
            const duration = performance.now() - startTime;
            performance.mark(`end_${name}`);
            performance.measure(name, `start_${name}`, `end_${name}`);
            this.log(`🕒 ${name} took ${duration.toFixed(2)}ms`);
            this.performanceMarks.delete(name);
            return duration;
        }
    },

    // Error tracking
    trackError(error, context = '') {
        this.errorCount++;
        this.error(`[${context}]`, error);
        if (error instanceof Error) {
            console.error(error.stack);
        }
    },

    trackWarning(message, context = '') {
        this.warningCount++;
        this.warn(`[${context}]`, message);
    },

    // Resource loading tracking
    trackResourceLoad(url) {
        if (!this.enabled) return;
        
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status} for ${url}`);
                }
                this.log(`✅ Loaded: ${url}`);
                return response;
            })
            .catch(error => {
                this.trackError(error, `Failed to load ${url}`);
                throw error;
            });
    },

    // Get debug summary
    getSummary() {
        return {
            errors: this.errorCount,
            warnings: this.warningCount,
            performanceMarks: Array.from(this.performanceMarks.keys()),
            debugEnabled: this.enabled
        };
    },

    // Debug logging functions with enhanced tracking
    log(...args) {
        if (this.enabled) console.log('[DEBUG]', ...args);
    },

    warn(...args) {
        if (this.enabled) {
            console.warn('[DEBUG]', ...args);
            this.warningCount++;
        }
    },

    error(...args) {
        if (this.enabled) {
            console.error('[DEBUG]', ...args);
            this.errorCount++;
        }
    }
};

// Initialize debug mode
DEBUG.init();

// Set up global error handling
if (typeof window !== 'undefined') {
    window.addEventListener('error', (event) => {
        DEBUG.trackError(event.error || event.message, 'UnhandledError');
    });

    window.addEventListener('unhandledrejection', (event) => {
        DEBUG.trackError(event.reason, 'UnhandledPromiseRejection');
    });
}

export default DEBUG;

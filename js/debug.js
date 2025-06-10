import { ENV } from './config.js';

class Debug {
    constructor() {
        this.enabled = ENV.enableDebugLogging;
        this.errorCount = 0;
        this.warningCount = 0;
        this.performanceMarks = new Map();
        this.init();
    }

    init() {
        if (typeof localStorage !== 'undefined') {
            this.enabled = localStorage.getItem('debug_mode') === 'true' || ENV.enableDebugLogging;
        }
        this.setupGlobalErrorHandler();
    }

    setupGlobalErrorHandler() {
        window.onerror = (msg, url, line, col, error) => {
            this.error('Global Error:', {
                message: msg,
                url,
                line,
                col,
                error: error?.stack || error
            });
            return false;
        };

        window.onunhandledrejection = (event) => {
            this.error('Unhandled Promise Rejection:', event.reason);
        };
    }

    enable() {
        if (ENV.isDevelopment) {
            this.enabled = true;
            localStorage?.setItem('debug_mode', 'true');
        }
    }

    disable() {
        this.enabled = false;
        localStorage?.removeItem('debug_mode');
    }

    startPerformanceMark(name) {
        if (!this.enabled) return;
        const start = performance.now();
        this.performanceMarks.set(name, start);
        this.log(`🔍 Starting ${name}...`);
    }

    endPerformanceMark(name) {
        if (!this.enabled) return 0;
        const start = this.performanceMarks.get(name);
        if (!start) return 0;
        
        const duration = performance.now() - start;
        this.performanceMarks.delete(name);
        this.log(`✓ Completed ${name} in ${duration.toFixed(2)}ms`);
        return duration;
    }

    log(...args) {
        if (!this.enabled) return;
        console.log('[DEBUG]', ...args);
    }

    warn(...args) {
        if (!this.enabled) return;
        this.warningCount++;
        console.warn('[DEBUG WARNING]', ...args);
    }

    error(...args) {
        this.errorCount++;
        console.error('[DEBUG ERROR]', ...args);
        // Log to file in development
        if (ENV.isDevelopment) {
            this.logToFile('error', ...args);
        }
    }

    trackError(error, context = '') {
        this.error(`${context}:`, error?.message || error);
        if (error?.stack) {
            this.error('Stack trace:', error.stack);
        }
    }

    async logToFile(level, ...args) {
        if (!ENV.isDevelopment) return;
        
        const timestamp = new Date().toISOString();
        const message = args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ');

        const logEntry = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;
        
        try {
            await fetch('/api/log', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ entry: logEntry })
            });
        } catch (err) {
            console.error('Failed to write to log file:', err);
        }
    }

    getStats() {
        return {
            errors: this.errorCount,
            warnings: this.warningCount,
            debugEnabled: this.enabled
        };
    }
}

const DEBUG = new Debug();
export default DEBUG;

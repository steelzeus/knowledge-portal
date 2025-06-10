// Environment configuration
export const ENV = {
    isDevelopment: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
    isProduction: window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1',
    
    // Development settings
    devPort: 5500,
    devServer: 'http://localhost:5500',
    
    // Production settings 
    prodServer: 'https://your-production-domain.com', // Update this with your actual domain
    
    // Feature flags
    enableDebugLogging: false, // Will be set to true in development
    enableHotReload: false     // Will be set to true in development
};

// Initialize environment-specific settings
if (ENV.isDevelopment) {
    ENV.enableDebugLogging = true;
    ENV.enableHotReload = true;
    console.log('[Development Mode]');
} else {
    // Remove any development tooling that might have been injected
    const liveReloadScript = document.querySelector('script[src*="livereload"]');
    const liveServerScript = document.querySelector('script[src*="live-server"]');
    if (liveReloadScript) liveReloadScript.remove();
    if (liveServerScript) liveServerScript.remove();
}

export default ENV;

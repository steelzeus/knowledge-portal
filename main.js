// main.js - Application entry point
import { ENV } from './js/config.js';
import DEBUG from './js/debug.js';
import { showScreen } from './js/navigation.js';

// Initialize core modules in correct order
async function initializeApp() {
    DEBUG.startPerformanceMark('app-init');
    
    try {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve));
        }

        // Initialize core features
        DEBUG.log('Initializing core features...');
        const modules = [
            import('./js/storage.js'),
            import('./js/subjectRouter.js'),
            import('./js/searchEngine.js')
        ];

        await Promise.all(modules);
        DEBUG.log('Core modules loaded');

        // Initialize UI components
        DEBUG.log('Initializing UI components...');
        const uiModules = [
            import('./js/subjectDetailHub.js'),
            import('./js/recommendationEngine.js'),
            import('./js/chatbotUI.js')
        ];

        await Promise.all(uiModules);
        DEBUG.log('UI modules loaded');

        // Remove loading screen
        document.body.classList.add('loaded');

        // Initialize extra features
        const extraModules = [
            import('./js/xp.js'),
            import('./js/shortcuts.js')
        ];

        Promise.all(extraModules).catch(err => {
            DEBUG.warn('Non-critical module failed to load:', err);
        });

        DEBUG.endPerformanceMark('app-init');
        DEBUG.log('Application initialized successfully');

    } catch (error) {
        DEBUG.error('Failed to initialize application:', error);
        showErrorScreen();
    }
}

function showErrorScreen() {
    const errorScreen = document.createElement('div');
    errorScreen.className = 'error-screen';
    errorScreen.innerHTML = `
        <div class="error-content">
            <h2>Oops! Something went wrong</h2>
            <p>We're having trouble loading some resources. Please try:</p>
            <ul>
                <li>Refreshing the page</li>
                <li>Clearing your browser cache</li>
                <li>Checking your internet connection</li>
            </ul>
            <button onclick="window.location.reload()" class="btn btn-primary">
                Reload Page
            </button>
        </div>
    `;
    document.body.appendChild(errorScreen);
}

// Start initialization
initializeApp();
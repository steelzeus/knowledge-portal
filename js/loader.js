// Loader utility to manage script dependencies
import { ENV } from './config.js';
import DEBUG from './debug.js';

const DEPENDENCIES = {
    // Core dependencies that must load first
    core: [
        { name: 'config', path: './config.js' },
        { name: 'debug', path: './debug.js' },
        { name: 'storage', path: './storage.js' },
        { name: 'navigation', path: './navigation.js' }
    ],
    
    // UI related modules
    ui: [
        { name: 'screen', path: './screen.js', requires: ['core'] },
        { name: 'subjectRouter', path: './subjectRouter.js', requires: ['core'] },
        { name: 'chatbotUI', path: './chatbotUI.js', requires: ['core'] }
    ],
    
    // Engine modules
    engines: [
        { name: 'mentorEngine', path: './mentorEngine.js', requires: ['core'] },
        { name: 'quizEngine', path: './quizEngine.js', requires: ['core'] },
        { name: 'recommendationEngine', path: './recommendationEngine.js', requires: ['core'] }
    ],
    
    // Feature modules that depend on engines
    features: [
        { name: 'quizUI', path: './quizUI.js', requires: ['engines'] },
        { name: 'roadmapUI', path: './roadmapUI.js', requires: ['engines'] },
        { name: 'mentorChatUI', path: './mentorChatUI.js', requires: ['engines'] }
    ]
};

const LOAD_TIMEOUT = 10000; // 10 seconds
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

class ModuleLoader {
    constructor() {
        this.loaded = new Set();
        this.loading = new Map();
        this.retryCount = new Map();
        this.totalModules = this.countTotalModules();
        this.createLoadingIndicator();
    }

    countTotalModules() {
        return Object.values(DEPENDENCIES).reduce((total, group) => total + group.length, 0);
    }

    createLoadingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'module-loading';
        indicator.innerHTML = `
            <div class="spinner"></div>
            <span class="loading-text">Loading modules...</span>
            <div class="loading-details"></div>
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
            <button class="retry-button">Retry Failed Modules</button>
        `;
        document.body.appendChild(indicator);
        this.indicator = indicator;
        this.setupRetryButton();
    }

    setupRetryButton() {
        const retryButton = this.indicator.querySelector('.retry-button');
        retryButton.addEventListener('click', () => {
            this.retryFailedModules();
        });
    }

    updateProgress() {
        const progress = (this.loaded.size / this.totalModules) * 100;
        const progressFill = this.indicator.querySelector('.progress-fill');
        progressFill.style.width = `${progress}%`;
    }

    showLoading(message, details = '') {
        if (this.indicator) {
            this.indicator.classList.remove('error');
            this.indicator.querySelector('.loading-text').textContent = message;
            this.indicator.querySelector('.loading-details').textContent = details;
            this.indicator.classList.add('visible');
            this.updateProgress();
        }
    }

    showError(message, details = '') {
        if (this.indicator) {
            this.indicator.classList.add('error');
            this.indicator.querySelector('.loading-text').textContent = message;
            this.indicator.querySelector('.loading-details').textContent = details;
            this.indicator.classList.add('visible');
        }
    }

    hideLoading() {
        if (this.indicator) {
            this.indicator.classList.remove('visible');
        }
    }

    async retryFailedModules() {
        const failedModules = Array.from(this.retryCount.entries())
            .filter(([_, retries]) => retries >= MAX_RETRIES)
            .map(([name]) => name);

        if (failedModules.length === 0) return;

        this.indicator.classList.remove('error');
        for (const moduleName of failedModules) {
            this.retryCount.set(moduleName, 0);
            this.loaded.delete(moduleName);
            this.loading.delete(moduleName);

            const moduleInfo = Object.values(DEPENDENCIES)
                .flat()
                .find(m => m.name === moduleName);

            if (moduleInfo) {
                await this.loadModule(moduleName, moduleInfo);
            }
        }
    }

    async loadModuleWithTimeout(moduleName, moduleInfo) {
        return Promise.race([
            import(moduleInfo.path),
            new Promise((_, reject) => {
                setTimeout(() => {
                    reject(new Error(`Timeout loading module: ${moduleName}`));
                }, LOAD_TIMEOUT);
            })
        ]);
    }

    async loadModuleWithRetry(moduleName, moduleInfo) {
        const retries = this.retryCount.get(moduleName) || 0;
        
        try {
            const module = await this.loadModuleWithTimeout(moduleName, moduleInfo);
            this.loaded.add(moduleName);
            this.retryCount.delete(moduleName);
            DEBUG.log(`Loaded module: ${moduleName}`);
            return module;
        } catch (error) {
            if (retries < MAX_RETRIES) {
                DEBUG.warn(`Retrying module load: ${moduleName} (attempt ${retries + 1}/${MAX_RETRIES})`);
                this.retryCount.set(moduleName, retries + 1);
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
                return this.loadModuleWithRetry(moduleName, moduleInfo);
            }
            
            DEBUG.error(`Failed to load module after ${MAX_RETRIES} retries: ${moduleName}`, error);
            throw error;
        }
    }

    async loadModule(moduleName, moduleInfo) {
        if (this.loaded.has(moduleName)) return;
        if (this.loading.has(moduleName)) return this.loading.get(moduleName);

        this.showLoading('Loading modules...', `Loading ${moduleName}...`);

        // Wait for required dependencies
        if (moduleInfo.requires) {
            for (const reqGroup of moduleInfo.requires) {
                await this.loadGroup(reqGroup);
            }
        }

        const loadPromise = this.loadModuleWithRetry(moduleName, moduleInfo)
            .catch(error => {
                this.showError('Module loading failed', `Failed to load ${moduleName}. Click retry to try again.`);
                throw error;
            });

        this.loading.set(moduleName, loadPromise);
        return loadPromise;
    }

    async loadGroup(groupName) {
        const group = DEPENDENCIES[groupName];
        if (!group) {
            DEBUG.error(`Unknown dependency group: ${groupName}`);
            return;
        }

        try {
            await Promise.all(
                group.map(moduleInfo => this.loadModule(moduleInfo.name, moduleInfo))
            );
            if (this.loaded.size === this.totalModules) {
                setTimeout(() => this.hideLoading(), 1000);
            }
        } catch (error) {
            this.showError('Module loading failed', 'One or more modules failed to load. Check console for details.');
            throw error;
        }
    }

    async initializeApp() {
        try {
            // Load core dependencies first
            await this.loadGroup('core');
            
            // Load UI and engines in parallel
            await Promise.all([
                this.loadGroup('ui'),
                this.loadGroup('engines')
            ]);
            
            // Load feature modules last
            await this.loadGroup('features');
            
            DEBUG.log('All modules loaded successfully');
            
            // Initialize AOS after all modules are loaded
            if (window.AOS) {
                window.AOS.init();
                DEBUG.log('AOS initialized');
            }
            
        } catch (error) {
            DEBUG.error('Failed to initialize app:', error);
            throw error;
        }
    }
}

// Export the loader instance
export default new ModuleLoader();

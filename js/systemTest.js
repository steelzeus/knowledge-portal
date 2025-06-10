import DEBUG from './debug.js';
import { ENV } from './config.js';

class SystemTest {
    constructor() {
        this.results = {
            components: new Map(),
            errors: [],
            warnings: []
        };
    }

    async testComponent(name, testFn) {
        DEBUG.startPerformanceMark(name);
        try {
            const element = document.querySelector(testFn.selector);
            if (!element) {
                throw new Error(`Component ${name} not found in DOM`);
            }
            
            const result = await testFn(element);
            this.results.components.set(name, {
                status: 'passed',
                time: DEBUG.endPerformanceMark(name),
                ...result
            });
        } catch (error) {
            DEBUG.trackError(error, `Component Test: ${name}`);
            this.results.components.set(name, {
                status: 'failed',
                error: error.message,
                time: DEBUG.endPerformanceMark(name)
            });
        }
    }

    async runAllTests() {
        console.log('🧪 Starting system tests...');
        
        // Test navbar
        await this.testComponent('navbar', async (el) => {
            const links = el.querySelectorAll('a');
            return { activeLinks: links.length };
        });

        // Test content area
        await this.testComponent('mainContent', async (el) => {
            const visible = el.offsetParent !== null;
            return { visible };
        });

        // Test subject router
        await this.testComponent('subjectRouter', async (el) => {
            const routes = el.querySelectorAll('[data-route]');
            return { routeCount: routes.length };
        });

        // Test recommendation engine
        await this.testComponent('recommendationContainer', async (el) => {
            const recommendations = el.querySelectorAll('.recommendation-card');
            return { recommendationCount: recommendations.length };
        });

        // Test search functionality
        await this.testComponent('searchContainer', async (el) => {
            const searchInput = el.querySelector('input[type="search"]');
            const working = searchInput && searchInput.disabled === false;
            return { working };
        });

        // Log results
        this.logResults();
    }

    logResults() {
        console.log('\n📊 System Test Results:');
        console.table(Array.from(this.results.components.entries()).map(([name, result]) => ({
            Component: name,
            Status: result.status,
            'Time (ms)': result.time?.toFixed(2) || 'N/A',
            Details: JSON.stringify(result)
        })));

        const summary = DEBUG.getSummary();
        console.log(`\n📝 Test Summary:
• Components Tested: ${this.results.components.size}
• Passed: ${Array.from(this.results.components.values()).filter(r => r.status === 'passed').length}
• Failed: ${Array.from(this.results.components.values()).filter(r => r.status === 'failed').length}
• Errors: ${summary.errors}
• Warnings: ${summary.warnings}
`);
    }
}

// Run tests when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const tester = new SystemTest();
    tester.runAllTests();
});

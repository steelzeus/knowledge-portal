import DEBUG from './debug.js';
import { ENV } from './config.js';

const REQUIRED_COMPONENTS = {
    'Navigation Bar': '#main-nav',
    'Main Content': '#main-content',
    'Subject Area': '#academic-subject-screen',
    'Recommendations': '#recommendation-container',
    'Search Container': '#search-container'
};

class SystemTest {
    constructor() {
        this.results = {
            components: new Map(),
            errors: [],
            warnings: [],
            summary: {
                total: 0,
                passed: 0,
                failed: 0,
                errors: 0,
                warnings: 0
            }
        };
    }

    async testComponent(name, selector, testFn = null) {
        console.log(`🔍 Testing ${name}...`);
        DEBUG.startPerformanceMark(name);
        
        try {
            const element = document.querySelector(selector);
            if (!element) {
                throw new Error(`Component not found: ${selector}`);
            }
            
            if (testFn) {
                await testFn(element);
            }
            
            this.results.components.set(name, {
                status: 'passed',
                selector,
                time: DEBUG.endPerformanceMark(name)
            });
            
            this.results.summary.passed++;
            console.log(`✅ ${name}: OK`);
            
        } catch (error) {
            this.results.components.set(name, {
                status: 'failed',
                selector,
                error: error.message,
                time: DEBUG.endPerformanceMark(name)
            });
            
            this.results.summary.failed++;
            this.results.summary.errors++;
            console.error(`❌ ${name}: ${error.message}`);
            DEBUG.error(`Component Test Failed: ${name}`, error);
        }
        
        this.results.summary.total++;
    }

    async runAllTests() {
        console.group('🧪 System Tests');
        
        for (const [name, selector] of Object.entries(REQUIRED_COMPONENTS)) {
            await this.testComponent(name, selector);
        }
        
        this.displayResults();
        console.groupEnd();
    }

    displayResults() {
        const { total, passed, failed, errors, warnings } = this.results.summary;
        
        console.group('📊 System Test Results');
        
        // Component Results Table
        console.table(
            Object.fromEntries(
                Array.from(this.results.components.entries()).map(([name, data]) => [
                    name,
                    {
                        Status: data.status === 'passed' ? '✅' : '❌',
                        Selector: data.selector,
                        'Load Time': `${data.time}ms`,
                        Error: data.error || '-'
                    }
                ])
            )
        );
        
        // Summary
        console.group('📝 Test Summary');
        console.log(`• Components Tested: ${total}`);
        console.log(`• Passed: ${passed}`);
        console.log(`• Failed: ${failed}`);
        console.log(`• Errors: ${errors}`);
        console.log(`• Warnings: ${warnings}`);
        console.groupEnd();
        
        console.groupEnd();
    }
}

// Initialize and run tests in development mode
if (ENV.isDevelopment) {
    const systemTest = new SystemTest();
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => systemTest.runAllTests());
    } else {
        systemTest.runAllTests();
    }
}

export default SystemTest;

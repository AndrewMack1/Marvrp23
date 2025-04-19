(function() {
    const botPatterns = [
        'phantomjs', 'selenium', 'headless', 'crawler', 'bot', 'spider',
        'wget', 'curl', 'puppeteer', 'chromium', 'automation'
    ];

    const userAgent = navigator.userAgent.toLowerCase();
    if (botPatterns.some(pattern => userAgent.includes(pattern))) {
        window.location.href = 'about:blank';
    }

    if (window.self !== window.top) {
        window.top.location.href = window.self.location.href;
    }

    document.onkeydown = function(e) {
        if (e.ctrlKey && 
            (e.keyCode === 85 || 
             e.keyCode === 123)) {
            return false;
        }
        if(e.keyCode === 123) {
            return false;
        }
    };

    const eventThrottler = {
        clicks: 0,
        lastCheck: Date.now(),
        checkThreshold: function() {
            const now = Date.now();
            if (now - this.lastCheck >= 1000) {
                this.clicks = 0;
                this.lastCheck = now;
            }
            this.clicks++;
            if (this.clicks > 30) {
                document.body.innerHTML = `
                    <div style="
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: #000;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        color: #ff3366;
                        font-family: 'Poppins', sans-serif;
                        z-index: 999999;
                    ">
                        <h1 style="font-size: 3rem; margin-bottom: 1rem;">⚠️ Atentie! ⚠️</h1>
                        <p style="font-size: 1.5rem; text-align: center; max-width: 600px;">
                            Activitate suspecta detectata.<br>
                            Te rog asteapta 5 secunde...
                        </p>
                    </div>
                `;
                setTimeout(() => window.location.reload(), 5000);
            }
        }
    };

    document.addEventListener('click', () => eventThrottler.checkThreshold());

    const consoleOutput = console.log;
    console.log = function() {
        if (typeof arguments[0] === 'string') {
            arguments[0] = arguments[0].replace(/(\\w+)\\(.*\\)/g, '[function]');
        }
        consoleOutput.apply(console, arguments);
    };

    setInterval(() => {
        const startTime = performance.now();
        debugger;
        const endTime = performance.now();
        
        if (endTime - startTime > 100) {
            window.location.href = 'about:blank';
        }
    }, 1000);

    const originalFetch = window.fetch;
    window.fetch = function() {
        if (arguments[0].includes('suspicious-endpoint')) {
            return Promise.reject('Blocked request');
        }
        return originalFetch.apply(this, arguments);
    };

    let tabHiddenCount = 0;
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            tabHiddenCount++;
            if (tabHiddenCount > 10) {
                window.location.reload();
            }
        }
    });

    const originalSetTimeout = window.setTimeout;
    window.setTimeout = function(fn, delay) {
        const jitter = Math.random() * 100;
        return originalSetTimeout(fn, delay + jitter);
    };
})();

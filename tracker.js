// iRAM Centralized Analytics Tracker
(function() {
    const API_ENDPOINT = 'https://iram-backend.tinnakornh.workers.dev/api/analytics/view';
    
    // Generate UUID v4 for session tracking
    function uuidv4() {
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    function initTracker() {
        // Use sessionStorage so it counts again if they close the tab/browser and come back later
        let sessionId = sessionStorage.getItem('iram_analytics_session');
        if (!sessionId) {
            sessionId = uuidv4();
            sessionStorage.setItem('iram_analytics_session', sessionId);
        }

        const payload = {
            domain: window.location.hostname,
            path: window.location.pathname,
            sessionId: sessionId,
            userAgent: navigator.userAgent
        };

        // Fire and forget
        fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).catch(err => {
            console.error('Analytics tracking failed:', err);
        });
    }

    // Run on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTracker);
    } else {
        initTracker();
    }
})();

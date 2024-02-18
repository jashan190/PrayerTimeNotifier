chrome.runtime.onInstalled.addListener(() => {
    // Setup alarms when the extension is installed/updated
    setupPrayerAlarms();
});

function setupPrayerAlarms() {
    // Placeholder: Fetch prayer times and set them as alarms
    const prayerTimes = getPrayerTimes(); // Replace with actual time fetching logic

    // Clear existing alarms
    chrome.alarms.clearAll(() => {
        for (const [prayer, time] of Object.entries(prayerTimes)) {
            // Create an alarm for each prayer
            chrome.alarms.create(prayer, { when: Date.parse(time) });
        }
    });
}

// Listener for alarm
chrome.alarms.onAlarm.addListener((alarm) => {
    // Show notification when alarm goes off
    chrome.notifications.create('', {
        type: 'basic',
        iconUrl: 'icon.png', // Replace with the path to your notification icon
        title: 'Prayer Time',
        message: `It's time for ${alarm.name}`,
        priority: 2
    });
});

// Placeholder function to simulate fetching prayer times
function getPrayerTimes() {
    // In a real scenario, this function would fetch prayer times from an API
    // Here we just return some static times for demonstration purposes
    const now = new Date();
    return {
        Fajr: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 5, 0).toString(),
        Dhuhr: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0).toString(),
        Asr: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 0).toString(),
        Maghrib: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 0).toString(),
        Isha: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 0).toString()
    };
}

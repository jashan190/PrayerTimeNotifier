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

function getUserLocation(){
    console.log("Please pick a location between San Francisco, Los Angeles, or Sacramento")

    

}
// Placeholder function to simulate fetching prayer times
function getPrayerTimes() {
    chrome.storage.local.get('userLocation', function(data) {
      if (data.userLocation) {
        fetch('https://api.example.com/prayertimes?location=' + encodeURIComponent(data.userLocation))
          .then(response => response.json())
          .then(prayerTimes => {
            // Logic to set alarms based on prayerTimes
          })
          .catch(error => console.error('Error fetching prayer times:', error));
      } else {
        console.log("User location not set");
        // Handle scenario where location is not set
      }
    });
  }
  

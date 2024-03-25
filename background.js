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
    return new Promise((resolve, reject) => {
      const city = prompt("Please enter your city:");
      const country = prompt("Please enter your country:");
      const state = prompt("Please enter your state (if applicable):");
      
      if (city && country) {
        const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&state=${encodeURIComponent(state)}&method=2`;
        fetch(url)
          .then(response => response.json())
          .then(data => {
            if(data.code === 200 && data.data) {
              const timings = data.data.timings;
              const prayerTimes = {
                Fajr: timings.Fajr,
                Dhuhr: timings.Dhuhr,
                Asr: timings.Asr,
                Maghrib: timings.Maghrib,
                Isha: timings.Isha
              };
              resolve(prayerTimes);
            } else {
              reject('Failed to fetch prayer times');
            }
          })
          .catch(error => {
            console.error('Error fetching prayer times:', error);
            reject(error);
          });
      } else {
        console.log("City and country are required.");
        reject("City and country are required.");
      }
    });
  }
  

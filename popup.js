// popup.js
document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('location-form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the value from the input
    var userLocation = document.getElementById('location').value;

    // Store the location in Chrome's local storage
    chrome.storage.local.set({ 'userLocation': userLocation }, function() {
      console.log('Location is stored.');
    });

    // Fetch prayer times for the user location
    fetchPrayerTimesForLocation(userLocation);
  });
});

function fetchPrayerTimesForLocation(location) {
  // Implement the API call to fetch prayer times
  // This is a placeholder URL, replace it with the actual API endpoint
  var apiURL = 'https://api.pray.zone/v2/times/today.json?city=' + encodeURIComponent(location);
  
  fetch(apiURL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      displayPrayerTimes(data);
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      // Handle the error
    });
}

function displayPrayerTimes(prayerData) {
  // Extract prayer times from the data object
  // This will depend on the structure of the response from your API
  // Below is a placeholder example assuming a certain data structure
  var times = prayerData.results.datetime[0].times;
  var prayerTimesElement = document.getElementById('prayerTimes');
  
  // Clear previous times
  prayerTimesElement.innerHTML = '';

  // Append each prayer time to the prayerTimes div
  Object.keys(times).forEach(prayer => {
    var time = times[prayer];
    var para = document.createElement('p');
    para.textContent = prayer + ': ' + time;
    prayerTimesElement.appendChild(para);
  });
}

form.addEventListener('submit', function(event) {
  event.preventDefault();
  var userLocation = document.getElementById('location').value;
  
  // Store the location in Chrome's local storage
  chrome.storage.local.set({ 'userLocation': userLocation }, function() {
    console.log('Location is stored.');
  });

  // Existing code to fetch prayer times
  fetchPrayerTimesForLocation(userLocation);
});
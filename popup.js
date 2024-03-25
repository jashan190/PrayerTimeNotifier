
// This event ensures that we manipulate the DOM only after it has been loaded
document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('location-form');
  
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    var city = document.getElementById('city').value;
    var country = document.getElementById('country').value;
    var state = document.getElementById('state').value; 

    var userLocation = { city, country, state };

    chrome.storage.local.set({ 'userLocation': userLocation }, function() {
      console.log('Location is stored in Chrome local storage.');
      fetchPrayerTimesForLocation(userLocation);
    });
  });
});

function fetchPrayerTimesForLocation(location) {
  var apiURL = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(location.city)}&country=${encodeURIComponent(location.country)}&state=${encodeURIComponent(location.state)}&method=2`;

  fetch(apiURL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log("API response data:", data);
      if (data.code === 200) {
        displayPrayerTimes(data); // Pass the whole data object to the display function
      } else {
        // Handle API errors, such as invalid location, server error, etc.
        document.getElementById('prayerTimes').textContent = 'Error fetching prayer times: ' + data.status;
      }
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      document.getElementById('prayerTimes').textContent = 'Error fetching prayer times. Please try again later.';
    });
}

function displayPrayerTimes(prayerData) {
  // Check if the necessary data is present
  if (!prayerData || !prayerData.data || !prayerData.data.timings) {
    console.error('Invalid prayer data:', prayerData);
    return;
  }

  // Access the timings directly from the data object
  const timings = prayerData.data.timings;
  var prayerTimesElement = document.getElementById('prayerTimes');

  // Clear previous times
  prayerTimesElement.innerHTML = '';

  // Append each prayer time to the prayerTimes div
  Object.keys(timings).forEach(prayer => {
    var time = timings[prayer];
    var para = document.createElement('p');
    para.textContent = `${prayer}: ${time}`;
    prayerTimesElement.appendChild(para);
  });
}


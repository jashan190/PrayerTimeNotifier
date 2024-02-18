// When the popup HTML has loaded
window.addEventListener('DOMContentLoaded', (event) => {
    displayPrayerTimes();
});

// Function to update the prayer times in the popup
function displayPrayerTimes() {
    // Placeholder for where you would get actual prayer times
    const prayerTimes = getPrayerTimes(); 

    const timesList = document.getElementById('prayerTimes');
    timesList.innerHTML = ''; // Clear existing times

    // Add each prayer time to the list in the popup
    for (const [prayer, time] of Object.entries(prayerTimes)) {
        const timeItem = document.createElement('li');
        timeItem.textContent = `${prayer}: ${time}`;
        timesList.appendChild(timeItem);
    }
}

// Placeholder function to simulate fetching prayer times
function getPrayerTimes() {
    // In a real scenario, you would fetch this from an API or calculate it
    return {
        Fajr: '05:00',
        Dhuhr: '12:00',
        Asr: '15:00',
        Maghrib: '18:00',
        Isha: '20:00'
    };
}

// Get the current year and set it in the footer
const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;

// Get the last modified date and set it in the footer
document.getElementById('lastModified').textContent = document.lastModified;

// Wind Chill Calculation Function
function calculateWindChill(temperature, windSpeed) {
    // Formula for wind chill in Celsius: 13.12 + 0.6215*T - 11.37*V^0.16 + 0.3965*T*V^0.16
    // Where T is temperature in Celsius and V is wind speed in km/h
    return 13.12 + (0.6215 * temperature) - (11.37 * Math.pow(windSpeed, 0.16)) + (0.3965 * temperature * Math.pow(windSpeed, 0.16));
}

// Function to calculate and display wind chill
function updateWindChill() {
    // Get static values from the page
    const temperature = parseFloat(document.getElementById('temperature').textContent);
    const windSpeed = parseFloat(document.getElementById('wind-speed').textContent);
    const windChillElement = document.getElementById('wind-chill');
    
    // Check conditions for viable wind chill calculation
    // Metric conditions: Temperature <= 10°C and Wind speed > 4.8 km/h
    if (temperature <= 10 && windSpeed > 4.8) {
        const windChill = calculateWindChill(temperature, windSpeed);
        // Round to one decimal place
        windChillElement.textContent = windChill.toFixed(1) + '°C';
    } else {
        windChillElement.textContent = 'N/A';
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    updateWindChill();
});
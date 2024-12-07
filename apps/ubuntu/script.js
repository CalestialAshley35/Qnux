// Function to toggle visibility of apps
function toggleApps() {
  alert("Apps Menu clicked!");
}

// Open specific app window
function openApp(appName) {
  const appWindow = document.getElementById(`${appName}Window`);
  appWindow.style.display = 'block'; // Show the app window
}

// Close specific app window
function closeApp(appName) {
  const appWindow = document.getElementById(`${appName}Window`);
  appWindow.style.display = 'none'; // Hide the app window
}

// Open the System Settings App
function openSystemSettings() {
  const settingsWindow = document.getElementById('settingsWindow');
  settingsWindow.style.display = 'block'; // Open System Settings window
}

// Change theme between dark and light
function changeTheme(theme) {
  if (theme === 'dark') {
    document.body.style.backgroundColor = '#333';
    document.body.style.color = '#fff';
  } else if (theme === 'light') {
    document.body.style.backgroundColor = '#fff';
    document.body.style.color = '#333';
  }
}

// Toggle Wi-Fi status (simulated)
function toggleWiFi() {
  const status = Math.random() > 0.5 ? 'connected' : 'disconnected';
  alert(`Wi-Fi is now ${status}`);
}

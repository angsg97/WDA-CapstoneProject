let deferredInstallPrompt = null;
const installButton = document.getElementById('installButton');
installButton.addEventListener('click', installPWA);

const installNotification = document.getElementById('install_notification');

// Add event listener for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);

// Add event listener for deleteButton
document.getElementById('deleteButton').addEventListener('click', () => {
  installNotification.classList.remove('show');
})

function saveBeforeInstallPromptEvent(evt) {
  // Let the prompt only show once during a user session
  if (deferredInstallPrompt !== "no"){
    deferredInstallPrompt = evt;
    installNotification.classList.add('show');
  }
}

function installPWA() {
  // Show the install prompt and hide the button
  deferredInstallPrompt.prompt();
  installNotification.classList.remove('show');

  // Get the promise of whether the user accepted or denied the popup
  deferredInstallPrompt.userChoice
    .then((choice) => {
      if (choice.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt', choice);
      } else {
        console.log('User dismissed the A2HS prompt', choice);
      }
      deferredInstallPrompt = "no";
    });


}

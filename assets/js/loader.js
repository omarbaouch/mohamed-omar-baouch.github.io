(function () {
  function hideLoader() {
    var loadingScreen = document.getElementById('loadingScreen');
    var mainContainer = document.getElementById('mainContainer');
    if (loadingScreen) {
      loadingScreen.style.opacity = '0';
      setTimeout(function () {
        loadingScreen.style.display = 'none';
        if (mainContainer) mainContainer.classList.add('show');
      }, 300);
    } else if (mainContainer) {
      mainContainer.classList.add('show');
    }
  }

  // Disparition normale quand tout est chargé
  window.addEventListener('load', hideLoader);
  // Filet de sécurité (si d’autres scripts plantent)
  setTimeout(hideLoader, 3000);
})();

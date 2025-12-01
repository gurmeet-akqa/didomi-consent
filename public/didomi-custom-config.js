/**
 * Didomi Custom HTML Configuration
 * This script loads custom HTML from a JSON file and injects it into the Didomi notice
 * 
 * To customize: Edit src/config/didomi-custom.json
 */

(function() {
  let customConfig = null;

  // Load custom configuration from JSON file
  function loadCustomConfig() {
    return fetch('/didomi-custom.json')
      .then(response => response.json())
      .then(config => {
        customConfig = config;
        return config;
      })
      .catch(error => {
        console.warn('Could not load custom Didomi config, using fallback:', error);
        // Fallback configuration
        customConfig = {
          "notice": {
            "content": {
              "html": {
                "en": "<div class=\"custom-notice-wrapper\"><div class=\"custom-notice-header\"><h2 class=\"custom-notice-title\">Cookie Preferences</h2></div><div class=\"custom-notice-body\"><p class=\"custom-notice-description\">We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking \"Accept All\", you consent to our use of cookies.</p></div><div class=\"custom-notice-footer\"><button class=\"didomi-button-highlight\" data-didomi-action=\"accept\">Accept All</button><button class=\"didomi-button-regular\" data-didomi-action=\"reject\">Reject All</button><button class=\"didomi-button-link\" data-didomi-action=\"customize\">Customize</button></div></div>"
              }
            }
          }
        };
        return customConfig;
      });
  }

  // Function to inject custom HTML
  function injectCustomHTML() {
    if (!customConfig) {
      console.warn('Custom config not loaded yet');
      return false;
    }

    const noticeView = document.querySelector('.didomi-notice-view, .didomi-popup-view, .didomi-banner-view');
    const noticeContent = document.querySelector('.didomi-notice-content, .didomi-popup-content, .didomi-banner-content');
    
    if (!noticeView) {
      return false;
    }

    const language = 'en'; // You can detect language from browser or Didomi
    const customHTML = customConfig.notice?.content?.html?.[language] || customConfig.notice?.content?.html?.['en'];
    
    if (!customHTML) {
      return false;
    }

    // Replace content
    if (noticeContent) {
      noticeContent.innerHTML = customHTML;
    } else {
      // Find the first child that contains content and replace it
      const contentWrapper = noticeView.querySelector('.didomi-notice-body, .didomi-popup-body');
      if (contentWrapper) {
        contentWrapper.innerHTML = customHTML;
      } else {
        // Last resort: replace inner content but keep structure
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = customHTML;
        const existingContent = noticeView.querySelector('*');
        if (existingContent && existingContent.parentNode) {
          existingContent.parentNode.replaceChild(tempDiv.firstChild, existingContent);
        }
      }
    }

    // Re-attach event handlers
    attachDidomiHandlers();
    return true;
  }

  // Attach Didomi event handlers to custom buttons
  function attachDidomiHandlers() {
    const acceptButton = document.querySelector('[data-didomi-action="accept"]');
    const rejectButton = document.querySelector('[data-didomi-action="reject"]');
    const customizeButton = document.querySelector('[data-didomi-action="customize"]');

    if (acceptButton && window.Didomi) {
      acceptButton.addEventListener('click', function(e) {
        e.preventDefault();
        if (window.Didomi.setUserAgreeToAll) {
          window.Didomi.setUserAgreeToAll();
        }
      });
    }

    if (rejectButton && window.Didomi) {
      rejectButton.addEventListener('click', function(e) {
        e.preventDefault();
        if (window.Didomi.setUserDisagreeToAll) {
          window.Didomi.setUserDisagreeToAll();
        }
      });
    }

    if (customizeButton && window.Didomi) {
      customizeButton.addEventListener('click', function(e) {
        e.preventDefault();
        if (window.Didomi.showPreferences) {
          window.Didomi.showPreferences();
        }
      });
    }
  }

  // Wait for Didomi to be ready and notice to be shown
  function waitForDidomi() {
    // First load the custom config
    loadCustomConfig().then(function() {
      if (window.Didomi) {
        // Didomi is loaded, wait for notice to appear
        const checkInterval = setInterval(function() {
          if (document.querySelector('.didomi-notice-view, .didomi-popup-view, .didomi-banner-view')) {
            clearInterval(checkInterval);
            setTimeout(injectCustomHTML, 100); // Small delay to ensure rendering is complete
          }
        }, 100);

        // Stop checking after 10 seconds
        setTimeout(function() {
          clearInterval(checkInterval);
        }, 10000);
      } else {
        // Wait for Didomi to load
        setTimeout(waitForDidomi, 100);
      }
    });
  }

  // Start waiting when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForDidomi);
  } else {
    waitForDidomi();
  }

  // Also listen for Didomi events
  window.addEventListener('didomi:notice:shown', function() {
    setTimeout(injectCustomHTML, 200);
  });

  // Listen for custom events
  document.addEventListener('didomi:ready', function() {
    loadCustomConfig().then(function() {
      setTimeout(injectCustomHTML, 300);
    });
  });
})();


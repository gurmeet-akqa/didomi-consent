/**
 * Didomi Custom HTML Injection Utility
 * 
 * This utility loads custom HTML from a local JSON file and injects it
 * into the Didomi notice after it loads.
 * 
 * Usage: Import and call injectCustomHTML() in your App.jsx when notice is shown
 */

import customConfig from '../config/didomi-custom.json'

/**
 * Injects custom HTML into the Didomi notice
 * @param {string} language - Language code (default: 'en')
 */
export function injectCustomHTML(language = 'en') {
  // Wait a bit for Didomi to render the notice
  setTimeout(() => {
    // Find the notice content container
    const noticeView = document.querySelector('.didomi-notice-view, .didomi-popup-view, .didomi-banner-view')
    const noticeContent = document.querySelector('.didomi-notice-content, .didomi-popup-content, .didomi-banner-content')
    
    if (!noticeView || !customConfig?.notice?.content?.html) {
      console.warn('Didomi notice container or custom HTML not found')
      return
    }

    // Get custom HTML for the current language
    const customHTML = customConfig.notice.content.html[language] || customConfig.notice.content.html['en']
    
    if (!customHTML) {
      console.warn('Custom HTML not found for language:', language)
      return
    }

    // Create a temporary container to parse the HTML
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = customHTML

    // If there's a content container, replace its content
    if (noticeContent) {
      noticeContent.innerHTML = tempDiv.innerHTML
    } else {
      // Otherwise, replace the entire notice view content
      noticeView.innerHTML = tempDiv.innerHTML
    }

    // Re-attach Didomi event handlers to buttons
    attachDidomiHandlers()

    console.log('Custom HTML injected into Didomi notice')
  }, 300) // Small delay to ensure Didomi has rendered
}

/**
 * Attaches Didomi event handlers to custom buttons
 */
function attachDidomiHandlers() {
  // Find all buttons with data-didomi-action attributes
  const acceptButton = document.querySelector('[data-didomi-action="accept"]')
  const rejectButton = document.querySelector('[data-didomi-action="reject"]')
  const customizeButton = document.querySelector('[data-didomi-action="customize"]')

  // Attach click handlers
  if (acceptButton && window.Didomi) {
    acceptButton.addEventListener('click', () => {
      if (window.Didomi.setUserAgreeToAll) {
        window.Didomi.setUserAgreeToAll()
      } else if (window.Didomi.notice && window.Didomi.notice.hide) {
        window.Didomi.notice.hide()
      }
    })
  }

  if (rejectButton && window.Didomi) {
    rejectButton.addEventListener('click', () => {
      if (window.Didomi.setUserDisagreeToAll) {
        window.Didomi.setUserDisagreeToAll()
      } else if (window.Didomi.notice && window.Didomi.notice.hide) {
        window.Didomi.notice.hide()
      }
    })
  }

  if (customizeButton && window.Didomi) {
    customizeButton.addEventListener('click', () => {
      if (window.Didomi.showPreferences) {
        window.Didomi.showPreferences()
      }
    })
  }
}

/**
 * Gets the custom HTML content for a specific language
 * @param {string} language - Language code
 * @returns {string|null} Custom HTML string or null
 */
export function getCustomHTML(language = 'en') {
  if (!customConfig?.notice?.content?.html) {
    return null
  }
  return customConfig.notice.content.html[language] || customConfig.notice.content.html['en'] || null
}

/**
 * Gets button labels from custom config
 * @param {string} language - Language code
 * @returns {object} Button labels object
 */
export function getButtonLabels(language = 'en') {
  if (!customConfig?.notice?.buttons) {
    return {}
  }
  
  return {
    accept: customConfig.notice.buttons.accept?.label?.[language] || customConfig.notice.buttons.accept?.label?.['en'] || 'Accept',
    reject: customConfig.notice.buttons.reject?.label?.[language] || customConfig.notice.buttons.reject?.label?.['en'] || 'Reject',
    customize: customConfig.notice.buttons.customize?.label?.[language] || customConfig.notice.buttons.customize?.label?.['en'] || 'Customize'
  }
}


import { useState } from 'react'
import { DidomiSDK } from '@didomi/react'
import { didomiConfig } from './config/didomi.config'
import './App.css'
// import './styles/didomi-custom.css'

function App() {
  const [count, setCount] = useState(0)

  const didomiConfig2 = {
    apiKey: didomiConfig.apiKey,
    notice: {
      title: 'Cookie Preferences',
      description: 'We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.',
      position: 'popup',
      denyOptions: {
        button: 'primary',
      }
      //,
      // content: {
      //   html: {
      //     en: `<div class="custom-notice-wrapper">
      //           <div class="custom-notice-header">
      //           <h2 class="custom-notice-title">Cookie Preferences</h2>
      //           </div>
      //           <div class="custom-notice-body">
      //             <p class="custom-notice-description">
      //               We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
      //             </p>
      //           </div>
      //           <div class="custom-notice-footer">
      //             <button class="didomi-button-highlight" data-didomi-action="accept">
      //               Accept All
      //             </button>
      //             <button class="didomi-button-regular" data-didomi-action="reject">
      //               Reject All
      //             </button>
      //             <button class="didomi-button-link" data-didomi-action="customize">
      //               Customize
      //             </button>
      //           </div>
      //         </div>`
      //   }
      // }
    }
  }

  // Check if API key is valid
  const isValidApiKey = didomiConfig.apiKey && 
    didomiConfig.apiKey !== 'YOUR_API_KEY' && 
    didomiConfig.apiKey.trim() !== ''

  // Didomi event handlers
  const handleDidomiReady = (didomi) => {

    console.log('Didomi SDK is loaded and ready', didomi)
    
    // Expose Didomi to window for easy access in console
    window.Didomi = didomi
    
    // Force show notice in development if configured
    if (didomiConfig.forceShowNotice) {
      // Clear any existing consent by resetting
      try {
        didomi.reset()
      } catch (e) {
        console.log('Reset not available, clearing localStorage instead')
      }
      
      // Clear localStorage
      localStorage.removeItem('didomi_token')
      
      // Show the notice
      setTimeout(() => {
        if (didomi.notice && didomi.notice.show) {
          didomi.notice.show()
          console.log('Notice forced to show (development mode)')
        }
      }, 500)
    }
  }
  
  // Helper function to manually show notice (for testing)
  const showNoticeManually = () => {
    if (window.Didomi && window.Didomi.notice) {
      // Clear consent by resetting
      try {
        if (window.Didomi.reset) {
          window.Didomi.reset()
        }
      } catch (e) {
        console.log('Reset not available')
      }
      
      // Clear localStorage
      localStorage.removeItem('didomi_token')
      
      // Show the notice
      if (window.Didomi.notice.show) {
        window.Didomi.notice.show()
        console.log('Notice shown manually')
      } else {
        console.warn('Notice.show() method not available')
      }
    } else {
      console.warn('Didomi SDK not ready yet. Wait for onReady callback.')
    }
  }
  
  // Helper function to clear consent (for testing)
  const clearConsent = () => {
    // Clear localStorage
    localStorage.removeItem('didomi_token')
    localStorage.removeItem('didomi_user_id')
    
    // Try to reset Didomi if available
    if (window.Didomi && window.Didomi.reset) {
      try {
        window.Didomi.reset()
      } catch (e) {
        console.log('Reset method not available')
      }
    }
    
    console.log('Consent cleared. Refresh page to see notice.')
    window.location.reload()
  }

  const handleConsentChanged = (cwtToken) => {
    console.log('Consent has been given/withdrawn', cwtToken)
    // You can add custom logic here when consent changes
  }

  const handleNoticeShown = () => {
    console.log('Didomi Notice Shown')
  }

  const handleNoticeHidden = () => {
    console.log('Didomi Notice Hidden')
  }

  const handleDidomiError = (error) => {
    console.error('Didomi SDK Error:', error)
    // Handle error gracefully - don't break the app
  }

  return (
    <div className="app">
      {/* Didomi Consent Management Platform */}
      {/* {isValidApiKey ? ( */}
        <>
          <DidomiSDK
            config={didomiConfig2}
            apiKey={didomiConfig.apiKey}
            gdprAppliesGlobally={didomiConfig.gdprAppliesGlobally}
            sdkPath="https://sdk.privacy-center.org/"
            onReady={handleDidomiReady}
            onConsentChanged={handleConsentChanged}
            onNoticeShown={handleNoticeShown}
            onNoticeHidden={handleNoticeHidden}
            onError={handleDidomiError}
          />
          <button onClick={() => window.Didomi && window.Didomi.preferences && window.Didomi.preferences.show()}>Consent preferences</button>
          {/* Development helper buttons - only show in dev mode */}
          {import.meta.env.DEV && (
            <div style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              background: '#4CAF50',
              color: 'white',
              padding: '10px 15px',
              borderRadius: '8px',
              fontSize: '12px',
              zIndex: 10000,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              display: 'flex',
              gap: '10px',
              alignItems: 'center'
            }}>
              <span>🧪 Dev Tools:</span>
              <button
                onClick={showNoticeManually}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: '1px solid white',
                  color: 'white',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '11px'
                }}
              >
                Show Notice
              </button>
              <button
                onClick={clearConsent}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: '1px solid white',
                  color: 'white',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '11px'
                }}
              >
                Clear Consent
              </button>
            </div>
          )}
        </>
      {/* ) : ( */}
        {/* <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#ff6b6b',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '8px',
          fontSize: '14px',
          zIndex: 9999,
          maxWidth: '300px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
          ⚠️ Didomi API Key not configured. Please set VITE_DIDOMI_API_KEY in .env file
        </div>
      )} */}
      <header className="header">
        <div className="container">
          <h1 className="logo">Modern App</h1>
          <nav className="nav">
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main className="main">
        <section id="home" className="hero">
          <div className="container">
            <div className="hero-content">
              <h2 className="hero-title">Welcome to Modern React App</h2>
              <p className="hero-subtitle">
                A beautiful, responsive single-page application built with React and Vite
              </p>
              <div className="hero-buttons">
                <button className="btn btn-primary">Get Started</button>
                <button className="btn btn-secondary">Learn More</button>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="features">
          <div className="container">
            <h2 className="section-title">Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3>Fast & Lightweight</h3>
                <p>Built with Vite for lightning-fast development and optimized production builds.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎨</div>
                <h3>Modern Design</h3>
                <p>Beautiful, responsive UI with a clean and modern aesthetic that works on all devices.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🚀</div>
                <h3>Easy Deployment</h3>
                <p>Ready to deploy on Vercel with zero configuration needed.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="about">
          <div className="container">
            <h2 className="section-title">About</h2>
            <div className="about-content">
              <p>
                This is a modern single-page application built with React.js and Vite. 
                It features a clean, responsive design and is optimized for performance. 
                The application is ready to be deployed on Vercel with minimal configuration.
              </p>
              <div className="counter-section">
                <h3>Interactive Counter</h3>
                <div className="counter">
                  <button 
                    className="btn-counter" 
                    onClick={() => setCount(count - 1)}
                  >
                    −
                  </button>
                  <span className="count-value">{count}</span>
                  <button 
                    className="btn-counter" 
                    onClick={() => setCount(count + 1)}
                  >
                    +
                  </button>
                </div>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => setCount(0)}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="container">
            <h2 className="section-title">Get in Touch</h2>
            <div className="contact-content">
              <p>Have questions or want to learn more? Feel free to reach out!</p>
              <form 
                className="contact-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you for your message! (This is a demo form)');
                }}
              >
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="form-input"
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="form-input"
                />
                <textarea 
                  placeholder="Your Message" 
                  rows="5"
                  className="form-input"
                ></textarea>
                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Modern React App. Built with ❤️ using React & Vite.</p>
        </div>
      </footer>
    </div>
  )
}

export default App


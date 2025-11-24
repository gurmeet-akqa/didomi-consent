import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
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


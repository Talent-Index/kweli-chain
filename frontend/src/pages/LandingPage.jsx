import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Navbar from '../components/Navbar.jsx'

const LandingPage = () => {
  const navigate = useNavigate()

  const handleVerifyClick = () => {
    navigate('/verify')
  }

  const handleLoginClick = () => {
    navigate('/dashboard')
  }

  return (
    <div className="landing-page">
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Blockchain-Powered<br />
              <span className="text-gradient">Certificate Verification</span>
            </h1>
            <p className="hero-description">
              Secure, transparent, and tamper-proof certificate verification 
              powered by blockchain technology. Trust the future of credentials.
            </p>
            <div className="hero-actions">
              <button className="btn btn-success btn-large" onClick={handleVerifyClick}>
                <FontAwesomeIcon icon="search" />
                Verify Certificate
              </button>
              <button className="btn btn-primary btn-large" onClick={handleLoginClick}>
                <FontAwesomeIcon icon="building" />
                Institution Login
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="certificate-card">
              <div className="certificate-header">
                <div className="cert-logo">
                  <FontAwesomeIcon icon="graduation-cap" />
                </div>
                <div className="cert-title">Blockchain Developer Certificate</div>
              </div>
              <div className="cert-content">
                <div className="cert-student">Caleb Baraka</div>
                <div className="cert-issuer">Curvegrid Academy</div>
                <div className="cert-date">Issued: September 2025</div>
                <div className="cert-verification">
                  <FontAwesomeIcon icon="check-circle" />
                  Verified by Kwelichain
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Kwelichain?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FontAwesomeIcon icon="shield-alt" />
              </div>
              <h3>Secure Verification</h3>
              <p>Blockchain technology ensures certificates cannot be forged or tampered with, providing ultimate security.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FontAwesomeIcon icon="link" />
              </div>
              <h3>Blockchain-backed</h3>
              <p>Every certificate is permanently recorded on the blockchain, creating an immutable record of achievement.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FontAwesomeIcon icon="share-alt" />
              </div>
              <h3>Easy Sharing</h3>
              <p>Share verified certificates instantly with employers, institutions, or anyone who needs to verify credentials.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage




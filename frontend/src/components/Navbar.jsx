import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Navbar = () => {
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleNavigation = (path) => {
    navigate(path)
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <div className="logo-icon">
            <FontAwesomeIcon icon="certificate" />
          </div>
          <span className="logo-text">Kwelichain</span>
        </div>
        
        <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <button 
            className="nav-link" 
            onClick={() => handleNavigation('/verify')}
          >
            Verify
          </button>
          <button 
            className="nav-link" 
            onClick={() => handleNavigation('/student')}
          >
            Students
          </button>
          <button 
            className="nav-link" 
            onClick={() => handleNavigation('/dashboard')}
          >
            Institutions
          </button>
        </div>
        
        <div className="nav-actions">
          <button className="btn btn-outline">Login</button>
          <button 
            className="btn btn-primary" 
            onClick={() => handleNavigation('/dashboard')}
          >
            Get Started
          </button>
        </div>
        
        <div 
          className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`} 
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

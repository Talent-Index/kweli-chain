import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StudentPage = () => {
  const handleQRCode = (certificate) => {
    console.log('Show QR code for:', certificate)
  }

  const handleShare = (certificate) => {
    if (navigator.share) {
      navigator.share({
        title: 'My Certificate',
        text: 'Check out my verified certificate on Kwelichain',
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Certificate link copied to clipboard!')
      })
    }
  }

  const certificates = [
    {
      id: 1,
      title: 'Blockchain Development',
      issuer: 'Kwelichain Academy',
      date: 'March 15, 2024',
      icon: 'code'
    },
    {
      id: 2,
      title: 'Web3 Security',
      issuer: 'Crypto University',
      date: 'February 28, 2024',
      icon: 'shield-alt'
    },
    {
      id: 3,
      title: 'Smart Contract Development',
      issuer: 'Blockchain Institute',
      date: 'January 20, 2024',
      icon: 'database'
    }
  ]

  return (
    <div className="student-page">
      <div className="container">
        <div className="student-header">
          <div className="student-profile">
            <img src="https://via.placeholder.com/80" alt="Student" className="student-avatar-large" />
            <div className="student-info">
              <h1>John Doe</h1>
              <p>Computer Science Student</p>
              <div className="student-stats">
                <span className="stat">
                  <strong>5</strong> Certificates
                </span>
                <span className="stat">
                  <strong>3</strong> Institutions
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="certificates-grid">
          {certificates.map((cert) => (
            <div key={cert.id} className="certificate-card">
              <div className="cert-header">
                <div className="cert-icon">
                  <FontAwesomeIcon icon={cert.icon} />
                </div>
                <div className="cert-status">
                  <FontAwesomeIcon icon="check-circle" />
                </div>
              </div>
              <div className="cert-content">
                <h3>{cert.title}</h3>
                <p className="cert-issuer">{cert.issuer}</p>
                <p className="cert-date">Issued: {cert.date}</p>
              </div>
              <div className="cert-actions">
                <button 
                  className="btn btn-outline"
                  onClick={() => handleQRCode(cert)}
                >
                  <FontAwesomeIcon icon="qrcode" />
                  View QR
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => handleShare(cert)}
                >
                  <FontAwesomeIcon icon="share" />
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StudentPage

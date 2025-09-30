import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import api from '../api'

const StudentPage = () => {
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await api.get('/certificates')
        setCertificates(res.data)
      } catch (err) {
        console.error('Error fetching certificates:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchCertificates()
  }, [])

  const handleQRCode = (certificate) => {
    alert(`QR Code for: ${certificate.id}`)
  }

  const handleShare = (certificate) => {
    const certLink = `${window.location.origin}/verify?hash=${certificate.hash}`
    if (navigator.share) {
      navigator.share({
        title: 'My Certificate',
        text: 'Check out my verified certificate on Kwelichain',
        url: certLink,
      })
    } else {
      navigator.clipboard.writeText(certLink).then(() => {
        alert('Certificate link copied to clipboard!')
      })
    }
  }

  if (loading) return <p>Loading certificates...</p>

  return (
    <div className="student-page">
      <div className="container">
        <div className="student-header">
          <div className="student-profile">
            <img src="https://via.placeholder.com/80" alt="Student" className="student-avatar-large" />
            <div className="student-info">
              <h1>Caleb Baraka</h1>
              <p>Computer Science Graduate</p>
              <div className="student-stats">
                <span className="stat">
                  <strong>{certificates.length}</strong> Certificates
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
                  <FontAwesomeIcon icon={cert.icon || 'certificate'} />
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
                <button className="btn btn-outline" onClick={() => handleQRCode(cert)}>
                  <FontAwesomeIcon icon="qrcode" /> View QR
                </button>
                <button className="btn btn-primary" onClick={() => handleShare(cert)}>
                  <FontAwesomeIcon icon="share" /> Share
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

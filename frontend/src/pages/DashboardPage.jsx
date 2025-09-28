import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const DashboardPage = () => {
  const [isRevoking, setIsRevoking] = useState(null)

  const handleFileUpload = (event) => {
    const files = event.target.files
    if (files && files.length > 0) {
      console.log('File uploaded:', files[0].name)
      // Handle file upload logic here
    }
  }

  const handleRevoke = (index) => {
    if (window.confirm('Are you sure you want to revoke this certificate? This action cannot be undone.')) {
      setIsRevoking(index)
      // Simulate revocation
      setTimeout(() => {
        setIsRevoking(null)
      }, 1000)
    }
  }

  const handleQRCode = (certificate) => {
    // Handle QR code display
    console.log('Show QR code for:', certificate)
  }

  const certificates = [
    {
      id: 1,
      student: { name: 'John Doe', avatar: 'https://via.placeholder.com/32' },
      course: 'Blockchain Development',
      date: 'Mar 15, 2024',
      status: 'Active'
    },
    {
      id: 2,
      student: { name: 'Jane Smith', avatar: 'https://via.placeholder.com/32' },
      course: 'Web3 Security',
      date: 'Mar 10, 2024',
      status: 'Active'
    }
  ]

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <div className="logo-icon">
              <FontAwesomeIcon icon="certificate" />
            </div>
            <span className="logo-text">Kwelichain</span>
          </div>
          <nav className="sidebar-nav">
            <a href="#" className="nav-item active">
              <FontAwesomeIcon icon="tachometer-alt" />
              Dashboard
            </a>
            <a href="#" className="nav-item">
              <FontAwesomeIcon icon="upload" />
              Upload Certificate
            </a>
            <a href="#" className="nav-item">
              <FontAwesomeIcon icon="list" />
              Manage Certificates
            </a>
            <a href="#" className="nav-item">
              <FontAwesomeIcon icon="ban" />
              Revoked Certificates
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          <div className="dashboard-header">
            <h1>Institution Dashboard</h1>
            <div className="user-info">
              <img src="https://via.placeholder.com/40" alt="User" className="user-avatar" />
              <span>Admin User</span>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <FontAwesomeIcon icon="certificate" />
              </div>
              <div className="stat-content">
                <h3>1,247</h3>
                <p>Total Issued</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <FontAwesomeIcon icon="check-circle" />
              </div>
              <div className="stat-content">
                <h3>1,189</h3>
                <p>Active</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <FontAwesomeIcon icon="ban" />
              </div>
              <div className="stat-content">
                <h3>58</h3>
                <p>Revoked</p>
              </div>
            </div>
          </div>

          {/* Upload Certificate Card */}
          <div className="upload-card">
            <h2>Upload Certificate</h2>
            <div className="upload-area">
              <div className="upload-content">
                <FontAwesomeIcon icon="cloud-upload-alt" />
                <h3>Drag & Drop Certificate</h3>
                <p>or click to browse files</p>
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={handleFileUpload}
                />
                <label htmlFor="file-upload" className="btn btn-primary">
                  Choose File
                </label>
              </div>
            </div>
          </div>

          {/* Certificates Table */}
          <div className="certificates-table">
            <div className="table-header">
              <h2>Issued Certificates</h2>
              <div className="table-actions">
                <button className="btn btn-outline">
                  <FontAwesomeIcon icon="download" />
                  Export
                </button>
                <button className="btn btn-primary">
                  <FontAwesomeIcon icon="plus" />
                  Add Certificate
                </button>
              </div>
            </div>
            <div className="table-container">
              <table className="certificates-table-content">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Course</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {certificates.map((cert, index) => (
                    <tr key={cert.id} style={{ opacity: isRevoking === index ? 0.5 : 1 }}>
                      <td>
                        <div className="student-info">
                          <img src={cert.student.avatar} alt="Student" className="student-avatar" />
                          <span>{cert.student.name}</span>
                        </div>
                      </td>
                      <td>{cert.course}</td>
                      <td>{cert.date}</td>
                      <td>
                        <span className="status-badge status-active">{cert.status}</span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="btn btn-sm btn-outline btn-danger"
                            onClick={() => handleRevoke(index)}
                            disabled={isRevoking === index}
                          >
                            <FontAwesomeIcon icon="ban" />
                            {isRevoking === index ? 'Revoking...' : 'Revoke'}
                          </button>
                          <button 
                            className="btn btn-sm btn-primary"
                            onClick={() => handleQRCode(cert)}
                          >
                            <FontAwesomeIcon icon="qrcode" />
                            QR
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardPage

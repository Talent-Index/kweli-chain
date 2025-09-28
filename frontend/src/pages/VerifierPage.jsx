import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const VerifierPage = () => {
  const [hash, setHash] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState(null)

  const handleFileUpload = (event) => {
    const files = event.target.files
    if (files && files.length > 0) {
      console.log('File uploaded:', files[0].name)
      setIsVerifying(true)
      
      // Simulate verification
      setTimeout(() => {
        setIsVerifying(false)
        setVerificationResult({
          isValid: true,
          student: 'John Doe',
          course: 'Blockchain Development',
          issuer: 'Kwelichain Academy',
          date: 'March 15, 2024',
          status: 'Active'
        })
      }, 2000)
    }
  }

  const handleHashVerification = () => {
    if (!hash.trim()) {
      alert('Please enter a certificate hash')
      return
    }

    setIsVerifying(true)
    
    // Simulate verification
    setTimeout(() => {
      setIsVerifying(false)
      setVerificationResult({
        isValid: true,
        student: 'John Doe',
        course: 'Blockchain Development',
        issuer: 'Kwelichain Academy',
        date: 'March 15, 2024',
        status: 'Active'
      })
    }, 1500)
  }

  const handleScanQR = () => {
    alert('QR scanner would open here')
  }

  return (
    <div className="verifier-page">
      <div className="container">
        <div className="verifier-header">
          <h1>Certificate Verification</h1>
          <p>Upload a certificate or enter a hash to verify authenticity</p>
        </div>

        <div className="verification-area">
          <div className="verification-input">
            <div className="upload-zone">
              <div className="upload-content">
                <FontAwesomeIcon icon="cloud-upload-alt" />
                <h3>Upload Certificate</h3>
                <p>Drag and drop your certificate file here</p>
                <input
                  type="file"
                  id="verification-upload"
                  className="hidden"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={handleFileUpload}
                />
                <label htmlFor="verification-upload" className="btn btn-primary">
                  Choose File
                </label>
              </div>
            </div>
            <div className="or-divider">
              <span>OR</span>
            </div>
            <div className="hash-input">
              <input
                type="text"
                placeholder="Enter certificate hash..."
                className="hash-field"
                value={hash}
                onChange={(e) => setHash(e.target.value)}
              />
              <button 
                className="btn btn-success"
                onClick={handleHashVerification}
                disabled={isVerifying}
              >
                <FontAwesomeIcon icon="search" />
                {isVerifying ? 'Verifying...' : 'Verify Hash'}
              </button>
            </div>
          </div>

          <div className="quick-actions">
            <button className="btn btn-outline" onClick={handleScanQR}>
              <FontAwesomeIcon icon="qrcode" />
              Scan QR Code
            </button>
          </div>
        </div>

        {/* Verification Results */}
        {verificationResult && (
          <div className="verification-result">
            <div className={`result-card ${verificationResult.isValid ? 'result-success' : 'result-error'}`}>
              <div className="result-icon">
                <FontAwesomeIcon icon={verificationResult.isValid ? 'check-circle' : 'times-circle'} />
              </div>
              <div className="result-content">
                <h3>
                  Certificate {verificationResult.isValid ? 'Verified' : 'Invalid'} 
                  {verificationResult.isValid ? ' ✅' : ' ❌'}
                </h3>
                <div className="result-details">
                  <div className="detail-row">
                    <span className="label">Student:</span>
                    <span className="value">{verificationResult.student}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Course:</span>
                    <span className="value">{verificationResult.course}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Issuer:</span>
                    <span className="value">{verificationResult.issuer}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Date:</span>
                    <span className="value">{verificationResult.date}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Status:</span>
                    <span className={`value ${verificationResult.isValid ? 'status-verified' : ''}`}>
                      {verificationResult.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {isVerifying && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl text-center shadow-xl">
              <div className="animate-spin w-10 h-10 border-4 border-gray-300 border-t-primary-blue rounded-full mx-auto mb-4"></div>
              <p>Processing...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default VerifierPage

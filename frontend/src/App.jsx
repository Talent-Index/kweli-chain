import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faCertificate, 
  faGraduationCap, 
  faShieldAlt, 
  faLink, 
  faShareAlt,
  faTachometerAlt,
  faUpload,
  faList,
  faBan,
  faCheckCircle,
  faCloudUploadAlt,
  faDownload,
  faPlus,
  faQrcode,
  faShare,
  faSearch,
  faCode,
  faDatabase,
  faTimesCircle,
  faBuilding
} from '@fortawesome/free-solid-svg-icons'

// Add icons to library
library.add(
  faCertificate,
  faGraduationCap,
  faShieldAlt,
  faLink,
  faShareAlt,
  faTachometerAlt,
  faUpload,
  faList,
  faBan,
  faCheckCircle,
  faCloudUploadAlt,
  faDownload,
  faPlus,
  faQrcode,
  faShare,
  faSearch,
  faCode,
  faDatabase,
  faTimesCircle,
  faBuilding
)

import LandingPage from './pages/LandingPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import StudentPage from './pages/StudentPage.jsx'
import VerifierPage from './pages/VerifierPage.jsx'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/student" element={<StudentPage />} />
          <Route path="/verify" element={<VerifierPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

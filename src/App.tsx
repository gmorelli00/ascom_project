import PatientsListPage from './pages/PatientsListPage.tsx'
import PatientPage from './pages/PatientPage.tsx'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'
import Logo from './components/Logo.tsx'
import EditPatient from './components/EditPatient.tsx'

function App() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <Fragment>
      <Logo />
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<PatientsListPage />} />    
        <Route path="/:id" element={<PatientPage />} />
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/:id/edit" element={<EditPatient />} />
        </Routes>
      )}
    </Fragment>    
  )
}

export default App

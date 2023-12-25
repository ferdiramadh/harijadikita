import React from 'react'
import LoginPage from './pages/LoginPage'
import RegisPage from './pages/RegisPage'
import VerificationPage from './pages/VerificationPage'
import RinPer1NamaUndanganPage from './pages/RinPer1NamaUndanganPage'
import RinPer2NamaPengantinPage from './pages/RinPer2NamaPengantinPage'
import RinPer3UsernameInstagramPage from './pages/RinPer3UsernameInstagramPage'
import RinPer4KeluargaPengantinPriaPage from './pages/RinPer4KeluargaPengantinPriaPage'
import RinPer5KeluargaPengantinWanitaPage from './pages/RinPer5KeluargaPengantinWanitaPage'
import RinPer6TanggalWaktuPage from './pages/RinPer6TanggalWaktuPage'
import RinPer7LokasiPage from './pages/RinPer7LokasiPage'
import RinPer8TambahRekPage from './pages/RinPer8TambahRekPage'
import RinPer9JumlahTamuPage from './pages/RinPer9JumlahTamuPage'
import RinPer10TahuDariManaPage from './pages/RinPer10TahuDariManaPage'
import AccountPage from './pages/AccountPage'
import NotificationPage from './pages/NotificationPage'
import MenuPage from './pages/MenuPage'
import { createBrowserRouter, createRoutesFromElements, Route, Routes, RouterProvider } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import { AuthContextProvider } from './context/AuthContext'
import TemporerHomePage from './pages/TemporerHomePage'
import PrivateRoutes from './utils/PrivateRoutes'
import ForgetPasswordPage from './pages/ForgetPasswordPage'
import { Provider } from 'react-redux'
import { store } from './redux'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<LandingPage />} />
      <Route path='/signin' element={<LoginPage />} />
      <Route path='/regis' element={<RegisPage />} />
      <Route path='/resetpassword' element={<ForgetPasswordPage />} />
      <Route element={<PrivateRoutes />}>
        <Route path='/home' element={<TemporerHomePage />} />
        {/* <Route path='/verification' element={<VerificationPage />} /> */}
      </Route>
    </Route>
  )
)
function App() {
  return (
    <Provider store={store}>
      <AuthContextProvider>
        <main>
          <RouterProvider router={router} />
        </main>
      </AuthContextProvider>
    </Provider>

    // <React.Fragment>
    //   <main>
    //     <LoginPage />
    //     <Routes>
    //       <Route index element={<HomePage />} />
    //       <Route path='/signin' element={<LoginPage />} />
    //       <Route path='/regis' element={<RegisPage />} />
    //     </Routes>
    //     <RegisPage />
    //     <VerificationPage />
    //     <RinPer1NamaUndanganPage />
    //     <RinPer2NamaPengantinPage />
    //     <RinPer3UsernameInstagramPage />
    //     <RinPer4KeluargaPengantinPriaPage />
    //     <RinPer5KeluargaPengantinWanitaPage />
    //     <RinPer6TanggalWaktuPage />
    //     <RinPer7LokasiPage />
    //     <RinPer8TambahRekPage />
    //     <RinPer9JumlahTamuPage />
    //     <RinPer10TahuDariManaPage />
    //     <AccountPage />
    //     <NotificationPage />
    //     <MenuPage />
    //   </main>
    // </React.Fragment>
  )
}

export default App

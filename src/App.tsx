import React from 'react'
import LoginPage from './pages/LoginPage'
import RegisPage from './pages/RegisPage'
import VerificationPage from './pages/VerificationPage'
import RinPer2NamaPengantinPage from './components/join/RinPer2NamaPengantinPage'
import RinPer3UsernameInstagramPage from './components/join/RinPer3UsernameInstagramPage'
import RinPer4KeluargaPengantinPriaPage from './components/join/RinPer4KeluargaPengantinPriaPage'
import RinPer5KeluargaPengantinWanitaPage from './components/join/RinPer5KeluargaPengantinWanitaPage'
import RinPer6TanggalWaktuPage from './components/join/RinPer6TanggalWaktuPage'
import RinPer7LokasiPage from './components/join/RinPer7LokasiPage'
import RinPer8TambahRekPage from './components/join/RinPer8TambahRekPage'
import RinPer9JumlahTamuPage from './components/join/RinPer9JumlahTamuPage'
import RinPer10TahuDariManaPage from './components/join/RinPer10TahuDariManaPage'
import AccountPage from './pages/AccountPage'
import NotificationPage from './pages/NotificationPage'
import MenuPage from './pages/MenuPage'
import { createBrowserRouter, createRoutesFromElements, Route, Routes, RouterProvider } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import { AuthContextProvider } from './context/AuthContext'
import TemporerHomePage from './pages/TemporerHomePage'
import PrivateRoutes from './utils/PrivateRoutes'
import ForgetPasswordPage from './pages/ForgetPasswordPage'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { store } from './redux'
import { AppDispatch, RootState } from './redux/store'
import { decrement, increment } from './redux/state/counter/counterSlice'
import JoinPage from './pages/JoinPage'
import RincianDesainEditPage from './pages/RincianDesainEditPage'
import { DesainUndanganContextProvider } from './context/DesainUndanganContext'
import Layout from './components/Layout'

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div>
      <h2>{count}</h2>
      <div>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
      </div>
    </div>
  )
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<LandingPage />} />
      <Route path='/signin' element={<LoginPage />} />
      <Route path='/regis' element={<RegisPage />} />
      <Route path='/resetpassword' element={<ForgetPasswordPage />} />
      <Route element={<PrivateRoutes />}>
        <Route path='/home' element={<Layout>
          <TemporerHomePage />
        </Layout>} />
        <Route path='/join' element={<JoinPage />} />
        <Route path='/rinciandesain' element={<Layout><RincianDesainEditPage /></Layout>} />
         <Route path='/akun' element={<Layout><AccountPage /></Layout>} />
        {/* <Route path='/verification' element={<VerificationPage />} /> */}
      </Route>
    </Route>
  )
)

function App() {
  return (
    <Provider store={store}>
      <AuthContextProvider>
        <DesainUndanganContextProvider>
          <main>
            <RouterProvider router={router} />
            {/* <Counter /> */}
          </main>
        </DesainUndanganContextProvider>
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

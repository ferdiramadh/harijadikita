import React from 'react';
import LoginPage from './pages/LoginPage';
import RegisPage from './pages/RegisPage';
import VerificationPage from './pages/VerificationPage';
import RinPer1NamaUndanganPage from './pages/RinPer1NamaUndanganPage';
import RinPer2NamaPengantinPage from './pages/RinPer2NamaPengantinPage';
import RinPer3UsernameInstagramPage from './pages/RinPer3UsernameInstagramPage';
import RinPer4KeluargaPengantinPriaPage from './pages/RinPer4KeluargaPengantinPriaPage';
import RinPer5KeluargaPengantinWanitaPage from './pages/RinPer5KeluargaPengantinWanitaPage';
import RinPer6TanggalWaktuPage from './pages/RinPer6TanggalWaktuPage';
import RinPer7LokasiPage from './pages/RinPer7LokasiPage';
import RinPer8TambahRekPage from './pages/RinPer8TambahRekPage';
import RinPer9JumlahTamuPage from './pages/RinPer9JumlahTamuPage';
import RinPer10TahuDariManaPage from './pages/RinPer10TahuDariManaPage';
import AccountPage from './pages/AccountPage';
import NotificationPage from './pages/NotificationPage';
import MenuPage from './pages/MenuPage';

function App() {
  return (
    <React.Fragment>
      <main>
        <LoginPage />
        <RegisPage />
        <VerificationPage />
        <RinPer1NamaUndanganPage />
        <RinPer2NamaPengantinPage />
        <RinPer3UsernameInstagramPage />
        <RinPer4KeluargaPengantinPriaPage />
        <RinPer5KeluargaPengantinWanitaPage />
        <RinPer6TanggalWaktuPage />
        <RinPer7LokasiPage />
        <RinPer8TambahRekPage />
        <RinPer9JumlahTamuPage />
        <RinPer10TahuDariManaPage />
        <AccountPage />
        <NotificationPage />
        <MenuPage />
      </main>
    </React.Fragment>
  );
}

export default App;

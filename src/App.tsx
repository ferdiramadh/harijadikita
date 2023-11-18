import React from 'react';
import LoginPage from './pages/LoginPage';
import RegisPage from './pages/RegisPage';
import VerificationPage from './pages/VerificationPage';

function App() {
  return (
    <React.Fragment>
      <main>
        <LoginPage />
        <RegisPage />
        <VerificationPage />
      </main>
    </React.Fragment>
  );
}

export default App;

import React from 'react'
import { Link } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const LandingPage = () => {
  const { user } = UserAuth()
  const checkSignIn = () => {
    if(user == null) return '/signin'
    return '/home'
  }
  return (
    <div className="grid-container">

      <header>
        <img
          src="https://ik.imagekit.io/herlambangdes/Asset/Harijadikita/harijadikita%20logo%20combination.svg?updatedAt=1751369135547"
          className="logo"
        />
      </header>

      <section className="left">
        <div className="hero-container">
          <div className="copywriting">
            <h1 className="headline text-focus-in">
              Buat undangan nikah digital cuma
              <ul className="underline">
                <li className="li-1">5 menit.</li>
                <li className="li-2">Rp199K.</li>
              </ul>
            </h1>
            <p className="description text-focus-in">
              Undang banyak tamu ke hari jadi pernikahan kamu lebih mudah,
              cepat, dan modern dengan berbagai tema undangan nikah digital yang
              cantik.
            </p>
          </div>
          <div className="cta">
            {/* <button href="#" className="btn-buat-undangan fade-in-heartbeat">
              Buat undangan sekarang
            </button>
            <button href="#" className="btn-tema-undangan">
              Lihat tema undangan
            </button> */}
          </div>
        </div>


      </section>
      <section className="right">
        <div className="parent">
          <div className="photo-container">
            <div className="item-1">
              <img
                src="https://ik.imagekit.io/herlambangdes/Asset/Harijadikita/Couple-1.jpg?updatedAt=1750670881163"
              />
            </div>
            <div className="item-2">
              <img
                src="https://ik.imagekit.io/herlambangdes/Asset/Harijadikita/Couple-2.jpg?updatedAt=1750671082686"
              />
            </div>
            <div className="item-3">
              <img
                src="https://ik.imagekit.io/herlambangdes/Asset/Harijadikita/Couple-3.jpg?updatedAt=1750671209086"
              />
            </div>
            <div className="item-4">
              <img
                src="https://ik.imagekit.io/herlambangdes/Asset/Harijadikita/Couple-4.jpg?updatedAt=1750671287768"
              />
            </div>
          </div>
        </div>
      </section>
    </div>

  )
}

export default LandingPage
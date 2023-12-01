import logoImage from '../assets/logo/harijadikita_logo.png'
import { CiBellOn } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";

type NotifProp = {
    id: number
    text: string
}

const NotificationPage = () => {
    const listNotif = [
        { id: 1, notif: 'Ferdi akan hadir' },
        { id: 2, notif: 'Dzaki tidak bisa hadir' },
        { id: 3, notif: 'Putih memberikan ucapan, “Selamat ya atas pernikahannya.”' },
        { id: 4, notif: 'Ceca memberikan hadiah uang Rp100.000' },
    ]
    return (
        <section className='notif_page'>
            <nav>
                <img className='logo_image' src={logoImage} alt='logo' />
                <div className='btn_wrapper'>
                    <CiBellOn size={30} />
                    <RxHamburgerMenu size={30} />
                </div>
            </nav>
            <div className='acc_title_sec'>
                <h1>Notifikasi</h1>
            </div>
            <div className="notif_item_wrapper">
                {
                    listNotif.map((item, i) => {
                        return (
                            <ItemNotification id={item.id} text={item.notif} key={i} />
                        )
                    })
                }
            </div>
        </section>
    )
}

const ItemNotification = ({ id, text }: NotifProp) => {
    return (
        <div className="noti_item" id={id.toString()}>
            <h1>{text}</h1>
        </div>
    )
}

export default NotificationPage
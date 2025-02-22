import { memo } from "react"
import "./style.scss"
import { Link } from "react-router-dom"
const Footer = () => {
    return (<footer className="footer" >
        <div className="container">
            <div className="row">

                <div className="col-lg-3">
                    <div className="footer__about">
                        <h1 className="footer__about__logo"> ten shop</h1>
                        <ul>
                            <li>dia chi: 12 nguyen van bao gv tphcm</li>
                            <li>phone: 09999999</li>
                            <li>email:iuh@edu.vn</li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="footer__widget">
                        <h3>Thong Tin</h3>
                        <ul>
                            <li><Link>Lien he</Link></li>
                            <li><Link>Thong tin ve chung toi</Link></li>
                            <li><Link>San pham kinh doanh</Link></li>
                        </ul>
                        <ul>
                            <li><Link>Tuyen dung</Link></li>
                            <li><Link>gui gop y, khieu nai</Link></li>
                            {/* <li><Link>San pham kinh doanh</Link></li> */}
                        </ul>
                    </div>
                </div>
                <div className="col-lg-3">
                    <h3>Vị trí của chúng tôi</h3>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.857631308865!2d106.68492447481876!3d10.822205289329377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528e5496d03cf%3A0xa5b8e7395ec636b9!2zMTIgTmd1eeG7hW4gVsSDbiBC4bqjbywgUGjGsOG7nW5nIDQsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1736844511982!5m2!1svi!2s"
                        title="maps"
                        width="300"
                        height="300"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    >
                    </iframe>
                </div>
            </div>
        </div>

    </footer>
    )
}

export default memo(Footer)
import React, { useEffect } from 'react'

import '../assets/scss/flaticon.scss';
import '../assets/scss/font-awesome.scss';
import "../assets/scss/color-1.scss"
import '../assets/scss/themify.scss';
import "../assets/scss/slick.scss";
import "../assets/scss/slick-theme.scss";
import '../assets/scss/landing.scss'

// import Custom Components
import HeaderSection from './wedding/header'
import AboutSection from './wedding/about'
import Features from './wedding/features'
import CounterSection from './wedding/counter'
import SubscribeSection from './wedding/subscribe'
import FooterSection from './wedding/footer'


const Wedding = () => {

    useEffect(() => {
        document.body.style.setProperty('--primary', '#c0882f')
        document.body.style.setProperty('--light', '#BF862D')
        document.body.style.setProperty('--dark', '#ECC878')
    })

    return (
        <div style={{backgroundColor:"#191f3c"}}>

            <HeaderSection />

            <CounterSection />

            <Features />

            <AboutSection />

            <SubscribeSection /> 

            <FooterSection />

        </div>
    )
}

export default Wedding;
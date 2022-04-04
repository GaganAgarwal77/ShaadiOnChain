import React, {useState} from 'react';

const HeaderSection = () => {
    const [isPlaying, setIsPlaying] = useState(true)
    const handleMusicPlay = (event) => {
        var myMusic= document.getElementById("my_audio");
        if(isPlaying){
            myMusic.pause();
            setIsPlaying(false)
        }
        else{
            myMusic.play();
            setIsPlaying(true)
        }
    }
    return(
    <section className="wedding header " id="header">
        <div className="app2 header overflow-unset app2-animation animated-bg"  ><i></i><i></i><i></i></div>
            <div className="decore">
                <img alt=""  className="img-fluid" src="/assets/images/wedding-img/wedding-ring.png" />
                <img alt=""  className="img-fluid" src="/assets/images/wedding-img/indian-couple.png" />
                <img alt=""  className="img-fluid" src="/assets/images/wedding-img/bottom.png" />
                <img alt=""  className="img-fluid" src="/assets/images/wedding-img/bottom.png" />
                <img alt=""  className="img-fluid" src="/assets/images/wedding-img/bottom.png" />
                <img alt=""  className="img-fluid" src="/assets/images/wedding-img/bottom.png" />
                <img alt=""  className="img-fluid" src="/assets/images/wedding-img/bottom.png" />
                <img alt=""  className="img-fluid" src="/assets/images/wedding-img/bottom.png" />
                <img alt=""  className="img-fluid" src="/assets/images/wedding-img/bottom.png" />
                <img alt=""  className="img-fluid" src="/assets/images/wedding-img/bottom.png" />
                <img alt="sound" style={{width:"40px",postion:"absolute", top:"6vh", marginLeft:"51vw"}} id="music_button" onClick={handleMusicPlay} src={ isPlaying ? "/assets/images/sound.png" : "/assets/images/mute.png" } />
            </div>
        <div className="wedding-content">
            
            <div className="wedding bg slider-bg">
                {/* <div className="bottom-0 set-abs girl"><img alt="" className="img-fluid"
                    id="girl" src="/assets/images/wedding-img/slider/girl.png" /></div> */}
                        
                         {/* <Col lg="6" className="offset-lg-6"> */}
                             <div className="shaadi">
                             <img  alt="" src='/assets/images/wedding-img/circle-dark.png'></img>
                            <div  className="centered">
                                <h1 className="logo" >ShaadiOnChain
                                <br/>
                                <h3 style={{color: "#f2c96a",textAlign:"center",fontSize:"1rem"}}>The one-stop destination for all your blockchain wedding needs! </h3>
                                </h1>
                                <a href="/#/login-register">
                                <img  alt=""  className="img-fluid" src="/assets/images/wedding-img/golden-plaque.png" />
                                <h1 className='start-button'>Get Started</h1>
                                </a>
                                {/* <p  style={{color: "gold",textAlign:"center"}}>Welcome to OnChainShaadi! The one-stop destination for all your blockchain wedding needs! </p> */}
                            </div>
                             {/*    <h1>Hello</h1> */}
                             </div>
                         {/* <div className="item center-text m-t-50">
                            <div className="testimonial-container bg-white p-5">
                                <div className="border-around">
                                    <img alt="" className="img-fluid m-auto"
                                        src="/assets/images/wedding-img/testimonial/quote.png" />
                                    <div className="text-center testimonial-info">
                                        <p className="testimonial-para">
                                           Welcome to OnChainShaadi! The one-stop destination for all your blockchain wedding needs!
                                    </p>
                                        <h4>Alan Lakor</h4>
                                        <h6>CEO OF SC.</h6>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                            {/* <div className="center-text m-t-50">
                                <div className="simple-text">
                                    <div className="set-relative rightFadeInOut header-text">
                                        <h1 style={{color: "white", fontSize:"5rem"}}>ShaadiOnChain</h1>
                                    </div>
                                    <p  style={{color: "white",textAlign:"center"}} className="header-sub-text">Welcome to OnChainShaadi! The one-stop destination for all your blockchain wedding needs! </p>
                                    {/* <div className="rightfadediv">
                                        <div>
                                            <img alt="" className="img-fluid bottom-img"
                                                src="/assets/images/wedding-img/bottom.png" />
                                        </div>
                                    </div> */}
                                {/* </div>
                            </div> */} 
                        {/* </Col>  */}
            </div>
        </div>
    </section>
    
    )
}

export default HeaderSection;
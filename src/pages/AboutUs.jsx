import React, { useEffect, useRef } from 'react';
import { FaFacebook, FaInstagramSquare, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Slide } from '@mui/material';
import useScrollAnimation from '../components/common/ScrollAnimation'
import { useTheme } from "@mui/system";

const AboutUs = () => {
    const logoRef = useRef();
    const moreImgRef = useRef();
    const valueCardRef = useRef();
    const teamOnwerCard = useRef();
    const teamMemberCard = useRef();
    const testomonialsRef = useRef();
    const theme = useTheme();
    const isDarkTheme = theme.palette.mode === 'dark';

    useEffect(() => {
        document.body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
    }, [isDarkTheme])


    // Use the custom hook for logo and moreImg elements
    const isLogoVisible = useScrollAnimation(logoRef, 250);
    const isMoreImgVisible = useScrollAnimation(moreImgRef, 200);
    const isValueCardVisible = useScrollAnimation(valueCardRef);
    const isOwnerCardVisible = useScrollAnimation(teamOnwerCard);
    const isTeamMemberCardVisible = useScrollAnimation(teamMemberCard);
    const isTestomonialsVisible = useScrollAnimation(testomonialsRef, 200)

    return (
        <div >
            <div className='aboutUs-intro'>
                <div className="aboutBgImg">

                    <div className="companyLogo" ref={logoRef}>
                        <Slide direction="top" in={isLogoVisible} timeout={2000}>
                            <img src="/images/mainlogo.png" alt="logo" className='compnayLogoImg' />
                        </Slide>

                    </div>
                    <div className="companyIntro">
                        <p>Step into the vibrant world of Webensi Music, where every note is a brushstroke, and each song is a canvas painted with the hues of creativity. We are not just a music streaming platform; we are architects of melodies, craftsmen of lyrics, and storytellers through sound. In the symphony of our journey, discover the alchemy of inspiration, dedication, and the boundless love for crafting original songs. From the spark of an idea to the final crescendo, Webensi Music is a testament to the art of songwriting and the magic that happens when lyrics and rhythm entwine. <br /> Join us in this musical odyssey, where each song is a chapter, and you, our cherished audience, are the co-creators of every verse. Welcome to a place where the soul of music is not just heard but felt, where every song is a journey, and every beat is an invitation to embark on an unforgettable adventure. Tune in, listen closely, and become part of our melody. This is more than a channel; it's a celebration of the songs that define us, and we can't wait to share them with you. Welcome to Webensi Music. Let the songs begin.</p>

                    </div>

                </div>

            </div>
            <div className="aboutUsMoreDetails" >
                <div className="aboutUsMoreDetailsContent">
                    <div className="aboutUsMoreImg" >
                        <Slide direction="right" in={isMoreImgVisible} timeout={1000}>
                            <img src="/images/sampleImgAboutUs.jpg" alt="sample_img" ref={moreImgRef} />
                        </Slide>

                    </div>
                    <div className="aboutUsMoreContentDetails">
                        <h2>About Our Studio</h2>
                        <p>At Webensi Music, our mission is to inspire, connect, and elevate the global community through the universal language of music. We believe in the transformative power of a well-crafted song and its ability to evoke emotions, bridge cultures, and ignite creativity. Our channel is committed to providing a platform for emerging artists, celebrating diversity in musical expression, and fostering a community where passion for music knows no bounds. Through curated playlists, original compositions, and collaborative endeavors, we aim to create an immersive space where every listener finds resonance, connection, and a soundtrack to their moments of joy, reflection, and inspiration.</p>

                        <h2 style={{ color: "black", marginTop: "30px" }}>Our Values</h2>
                    </div>
                </div>
            </div>
            <div className="ourValues" ref={valueCardRef}>
                <Slide direction="right" in={isValueCardVisible} timeout={1000}>
                    <div id="valueOne" className='ourValueCard'>
                        <h2>Diversity:</h2>
                        <p>Diversity is the soul of Webensi Music. We celebrate the myriad colors of music, weaving together genres, languages, and cultures. Our playlists transcend borders, offering a rich tapestry of emotions and stories. From traditional tunes to cutting-edge beats, we amplify voices from all walks of life, ensuring that every listener finds a home for their unique musical journey.</p>
                    </div>
                </Slide>
                <Slide direction="right" in={isValueCardVisible} timeout={2000}>
                    <div id="valueTwo" className='ourValueCard'>
                        <h2>Innovation: </h2>
                        <p>Innovation is our heartbeat at Webensi Music. Our studio is a playground for creative exploration, where we reimagine the possibilities of sound. From groundbreaking production techniques to genre-bending collaborations, we stay on the cutting edge. Webensi Music is not just a music destination; it's a hub for those who seek fresh, inventive sounds and want to be at the forefront of the ever-evolving music scene.</p>
                    </div>
                </Slide>
                <Slide direction="right" in={isValueCardVisible} timeout={3000}>
                    <div id="valueThree" className='ourValueCard'>
                        <h2>Community:</h2>
                        <p>Welcome to Webensi Music, where we're more than a channel; we're a musical family. In our dynamic community, every listener and artist is a vital part of the rhythm. Engage in dialogue, join live events, and contribute to interactive playlists. Shape our content and be part of a global family that speaks the universal language of melody. Join us in building a community resonating with inclusivity, support, and the limitless joy of shared musical experiences.</p>
                    </div>
                </Slide>
            </div>
            <div className="ourServices">
                <div className='experties'>
                    <div className='expertiesIntro'>
                        <h2>Expertise Refined, Experience Defined</h2>
                        <p>Webensi Music where success is an art form. With refined expertise and defined experience, we craft a unique journey tailored for excellence. Explore a space where skill meets wisdom, ensuring a harmonious blend of proficiency and seasoned know-how. Join us in crafting your success story, where every detail is carefully curated, and every experience is defined with purpose</p>
                    </div>
                    <div className="expertiesContent">
                        <div className="expertiesCard" id="expertieOne">
                            <h1>800K +</h1>
                            <p>Number Of Subscribers</p>

                        </div>
                        <div className="expertiesCard" id="expertieTwo">
                            <h1>785K +</h1>
                            <p>Number of Viewers</p>

                        </div>
                        <div className="expertiesCard" id="expertieThree">
                            <h1>100 +</h1>
                            <p>Number of Songs</p>

                        </div>
                        <div className="expertiesCard" id="expertieFour">
                            <h1>12 +</h1>
                            <p>Years of Experience</p>

                        </div>

                    </div>
                </div>
            </div>
            <div className="ourServices-services">
                <h2 style={{ color: "white" }}>Our Services</h2>

                <div className="ourServices-servicesContent">
                    <div className="servicesContentCard" id="servicesContentCardOne">
                        <h2>Music Production</h2>
                        <p>From concept to completion, our skilled producers collaborate with you to bring your musical ideas to life. Explore creative possibilities and craft unique compositions.</p>

                    </div>
                    <div className="servicesContentCard" id="servicesContentCardTwo">
                        <h2>Collaborative Projects</h2>
                        <p>Connect with a network of talented musicians and producers for collaborative projects. Our studio fosters a creative community where artists come together to produce something truly exceptional.</p>


                    </div>
                    <div className="servicesContentCard" id="servicesContentCardThree">
                        <h2>Live Session Recording</h2>
                        <p>Capture the energy of your live performances in our dedicated recording space. Create professional recordings of your gigs for lasting memories.</p>
                    </div>
                    <div className="servicesContentCard" id="servicesContentCardFour">
                        <h2> Mixing and Mastering</h2>
                        <p>Polish your tracks to perfection with our expert mixing and mastering services. Elevate the quality of your music for a crisp and balanced sound.</p>

                    </div>
                    <div className="servicesContentCard" id="servicesContentCardFive">
                        <h2>Instrumental Arrangement</h2>
                        <p>Enhance your music with expertly crafted instrumental arrangements. Our skilled arrangers work closely with you to bring depth and richness to your compositions.

                        </p>
                    </div>
                    <div className="servicesContentCard" id="servicesContentCardSix">
                        <h2>Digital Distribution Assistance</h2>
                        <p>Once your masterpiece is ready, let us assist you in navigating the digital landscape. We provide guidance on distributing your music across various platforms, helping you reach a wider audience and gain recognition in the music industry.</p>
                    </div>


                </div>
            </div>
            <div className="ourTeam">
                <h1 className='OurTeamMainHeading'>Meet Our Team</h1>
                <Slide direction="left" in={isOwnerCardVisible} timeout={1000} ref={teamOnwerCard}>
                    <div className="teamOnwerCard">
                        <div className='teamOnwerCardImg'>

                            <img src="/images/sampleImgAboutusTwo.jpg" alt="OwnerImg" />

                        </div>

                        <div className="ownerCardDetails">
                            <h1>Abhishek Narwade</h1>
                            <h3>Founder and Owner</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae nobis eius tempore molestias reiciendis, modi laborum quaerat assumenda culpa doloremque rerum. Enim beatae eveniet rem repellendus? Nostrum quidem tempora modi.</p>
                            <div className="ownerCardSocial">
                                <FaFacebook />
                                <FaInstagramSquare />
                                <FaTwitter />
                                <FaLinkedin />

                            </div>
                        </div>


                    </div>
                </Slide>

                <div className="teamMembers" ref={teamMemberCard}>
                    <Slide direction="bottom" in={isTeamMemberCardVisible} timeout={2000}>
                        <div className="teamMembersCard" id="teamMemberCardOne">
                            <img src="/images/sampleImgAboutusTwo.jpg" alt="" />
                            <div className="teamMemberCardDetails">
                                <h3>Avinash Kumar</h3>
                                <h4>Editor</h4>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis totam dolore, distinctio Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, explicabo aliquid. Repellendus est nisi aspernatur quaerat animi sunt, dignissimos facere.</p>
                                <div className="teamMemberCardSocial">
                                    <FaFacebook />
                                    <FaInstagramSquare />
                                    <FaTwitter />
                                    <FaLinkedin />
                                </div>
                            </div>

                        </div>
                    </Slide>
                    <Slide direction="bottom" in={isTeamMemberCardVisible} timeout={3000}>
                        <div className="teamMembersCard" id="teamMemberCardTwo">
                            <img src="/images/sampleImgAboutusTwo.jpg" alt="" />
                            <div className="teamMemberCardDetails">
                                <h3>Avinash Kumar</h3>
                                <h4>Editor</h4>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis totam dolore, distinctio Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, explicabo aliquid. Repellendus est nisi aspernatur quaerat animi sunt, dignissimos facere.</p>
                                <div className="teamMemberCardSocial">
                                    <FaFacebook />
                                    <FaInstagramSquare />
                                    <FaTwitter />
                                    <FaLinkedin />
                                </div>
                            </div>

                        </div>
                    </Slide>
                    <Slide direction="bottom" in={isTeamMemberCardVisible} timeout={4000}>
                        <div className="teamMembersCard" id="teamMemberCardThree">
                            <img src="/images/sampleImgAboutusTwo.jpg" alt="" />
                            <div className="teamMemberCardDetails">
                                <h3>Avinash Kumar</h3>
                                <h4>Editor</h4>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis totam dolore, distinctio Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, explicabo aliquid. Repellendus est nisi aspernatur quaerat animi sunt, dignissimos facere.</p>
                                <div className="teamMemberCardSocial">
                                    <FaFacebook />
                                    <FaInstagramSquare />
                                    <FaTwitter />
                                    <FaLinkedin />
                                </div>
                            </div>

                        </div>
                    </Slide>

                </div>

            </div>
            <div className="testonomials">
                <h1>Testimonials</h1>

                <div className="testonomialsContent" ref={testomonialsRef}>

                    <div className="testonomailsCard">
                        <img src="/images/sampleImgAboutusTwo.jpg" alt="" />
                        <div className="testonomailsCardDetails">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse minima eius voluptatem rerum libero et sunt. Quas culpa ducimus optio ullam atque itaque vero eaque officia nulla neque, ad illo.</p>
                            <Slide direction="left" in={isTestomonialsVisible} timeout={1000}>
                                <h4>- Abhijeet Shah</h4>
                            </Slide>
                        </div>
                    </div>
                    <div className="testonomailsCard">
                        <img src="/images/sampleImgAboutusTwo.jpg" alt="" />
                        <div className="testonomailsCardDetails">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse minima eius voluptatem rerum libero et sunt. Quas culpa ducimus optio ullam atque itaque vero eaque officia nulla neque, ad illo.</p>
                            <Slide direction="left" in={isTestomonialsVisible} timeout={1000}>
                                <h4>- Abhijeet Shah</h4>
                            </Slide>
                        </div>
                    </div>
                    <div className="testonomailsCard">
                        <img src="/images/sampleImgAboutusTwo.jpg" alt="" />
                        <div className="testonomailsCardDetails">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse minima eius voluptatem rerum libero et sunt. Quas culpa ducimus optio ullam atque itaque vero eaque officia nulla neque, ad illo.</p>
                            <Slide direction="left" in={isTestomonialsVisible} timeout={1000}>
                                <h4>- Abhijeet Shah</h4>
                            </Slide>
                        </div>
                    </div>
                    <div className="testonomailsCard">
                        <img src="/images/sampleImgAboutusTwo.jpg" alt="" />
                        <div className="testonomailsCardDetails">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse minima eius voluptatem rerum libero et sunt. Quas culpa ducimus optio ullam atque itaque vero eaque officia nulla neque, ad illo.</p>
                            <Slide direction="left" in={isTestomonialsVisible} timeout={1000}>
                                <h4>- Abhijeet Shah</h4>
                            </Slide>
                        </div>
                    </div>
                    <div className="testonomailsCard">
                        <img src="/images/sampleImgAboutusTwo.jpg" alt="" />
                        <div className="testonomailsCardDetails">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse minima eius voluptatem rerum libero et sunt. Quas culpa ducimus optio ullam atque itaque vero eaque officia nulla neque, ad illo.</p>
                            <Slide direction="left" in={isTestomonialsVisible} timeout={1000}>
                                <h4>- Abhijeet Shah</h4>
                            </Slide>
                        </div>
                    </div>
                    <div className="testonomailsCard">
                        <img src="/images/sampleImgAboutusTwo.jpg" alt="" />
                        <div className="testonomailsCardDetails">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse minima eius voluptatem rerum libero et sunt. Quas culpa ducimus optio ullam atque itaque vero eaque officia nulla neque, ad illo.</p>
                            <Slide direction="left" in={isTestomonialsVisible} timeout={1000}>
                                <h4>- Abhijeet Shah</h4>
                            </Slide>
                        </div>
                    </div>


                </div>
            </div>


        </div >
    )
}

export default AboutUs

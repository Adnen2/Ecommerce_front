"use client"
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useState } from 'react';

function VideoPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlayback = () => {
        const video = document.querySelector("#videoPlayer");

        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    return (
        <div className="relative w-full h-0" style={{ paddingBottom: "56.25%" }}>
            <video id="videoPlayer" className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop>
                <source src="/Nike_Volume_2-Hero_Loop.mp4" type="video/mp4" />
            </video>
            <div className="absolute right-5 bottom-5">
                <button className="bg-black text-white px-4 py-2 rounded-full shadow" onClick={togglePlayback}>
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
            </div>
        </div>
    );
}

export default function About() {
    return (
        <div>
            <Header />
            <div className="bg-black text-white pt-20 pb-3">
                <span className="text-2xl text-center flex flex-col font-serif">Volume 2 — Fall 2022</span>
                <h1 className="text-9xl font-bold leading-tight text-center flex flex-col tracking-tighter">
                    <span>A CULTURE OF</span>
                    <span>INNOVATION</span>
                </h1>
                <br />
            </div>
            <VideoPlayer />
            <div className="bg-black text-white pt-20 pb-3">
                <p className="text-[15px] md:text-[30px] mb-8 mt-7 mr-7 ml-7 text-center flex flex-col Helvetica Neue">
                    <span>We ve spent 50 years shifting big ideas into scaled,</span>
                    <span>sustainable platforms that have changed our products</span>
                    <span>and manufacturing process,fueled our design ethos,</span>
                    <span> and championed our athlete community.</span>
                    <br />
                </p>
            </div>
            <div className="bg-white text-black pt-20 pb-3">
                <h5 className="text-[15px] md:text-[25px] ml-8 mb-5 font-semibold">Behind the Scenes</h5>
                <div class="flex flex-col md:flex-row items-center mt-10 mb-10">
                    <video class="ml-8 w-3/5" controls>
                        <source src="/Nike-Forward.mp4" type="video/mp4" />
                    </video>
                    <div class="md:ml-8 mt-7 md:mt-0">
                        <h5 class="text-[15px] md:text-[25px] mb-5 font-bold">How We Totally Reimagined the Hoodie</h5>
                        <p class="text-[15px] md:text-[20px] mb-7 text-gray-600 Helvetica Neue">
                            Introducing Nike Forward, our most significant apparel innovation since Dri-FIT. The platform revolutionizes apparel creation by hacking punch-needle machines for the purpose of making premium sustainability-minded product. Can't picture this? We'll talk you through it.
                        </p>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

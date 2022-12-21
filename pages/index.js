import '../styles/Home.module.css'
import Head from 'next/head'
import Image from 'next/image'
import { gsap } from "gsap/dist/gsap"
import React, { useLayoutEffect, useEffect, useState } from 'react'
import moment from 'moment';

const hbd = moment("12-25-2022 01:00:00", "MM-DD-YYYY HH:mm:ss");

const stringArray = ['belum waktunya', 'dibilangin batu', 'coba aja klik sekali lagi']

export default function Home() {

  const [isValid, setIsValid] = useState(false)
  const [counter, setCounter] = useState(0)

  let open = gsap.timeline({ paused: true, reversed: true });
  let zoom = gsap.timeline({ paused: true, reversed: true });

  useEffect(()=>{
    const valid = moment() < hbd
    setIsValid(!valid);
  }, [])

  useLayoutEffect(() => {
    open
      .to(
        ".top-cover",
        {
          duration: 0.5,
          ease: "power1.out",
          transformOrigin: "top",
          boxShadow: 0,
          rotateX: 180
        },
        0
      )
      .to(
        ".top",
        {
          zIndex: 1
        },
        0.05
      )
      .to(
        ".top",
        {
          filter: "drop-shadow(0px 2px 3px rgba(50, 0, 50, 0)"
        },
        0
      );

    zoom
      .to(".paper", { zIndex: 1 }, 0.3)
      .to(".paper", { duration: 0.5, y: -120, zIndex: 2 }, 0.5)
      .to(
        ".paper",
        { duration: 0.5, y: 0, scale: 2, zIndex: 3, ease: "power1.out" },
        1
      )
      .to(".shadow", { scaleX: 1.5 }, 1);

  }, [counter, isValid])


  const handleOpen = () => {
    const now = moment();
    if (!isValid && counter <= 3) {
      setCounter(counter+1)
    }

    console.log(isValid || counter === 3)
    
    if(isValid || counter === 3) {
      open.play();
      zoom.play();
      setCounter(counter+1)
      setTimeout(() => {
        handleClose()
      }, 2000);
    }

    if(counter === 4 ) setCounter(0)
    console.log(counter)
  }

  const handleClose = () => {
    zoom.reverse();
    gsap.delayedCall(1, () => {
      open.reverse();
    });
  }

  return (
    <>
      <Head>
        <title>Wait for it</title>
        <meta name="description" content="Wait for it" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div 
      className="textContainer" 
      style={{
        top: '10rem',
        justifyContent: 'center',
        display: 'grid',
        position: 'relative',
      }}>
        <span className='message' style={{fontSize: '50px', fontFamily: "Helvetica Neue", textShadow: '2px 2px rgba(121, 121, 170, 0.5)'}}> May be opened {hbd.fromNow(false)}</span>
        <h1 className='message' style={{fontSize: '12px', textAlign: 'center', fontFamily: "Helvetica Neue",}}> {stringArray[counter-1]}</h1>
      </div>
      <main className="main">
        <div className="envelope">
          <div className="cover">
            <div className="bottom"> </div>
            <div className="side">
              <div className="left"></div>
              <div className="right"></div>
            </div>
            <div className="top" onClick={handleOpen}>
              <div className="top-cover"></div>
            </div>
          </div>
          {isValid ?
            <div className="paper">
              <div className="message">hbd y.</div>
              <div className="close"> <i className="fa fa-times" onClick={handleClose}> X </i></div>
            </div>
            :
            <div className="paper">
              <div className="message" style={{fontSize:"12px", fontFamily: "'Open Sans', sans-serif"}} >siapa yang suruh buka sebelum tanggal 25 :/</div>
              <div className="close"> <i className="fa fa-times" onClick={handleClose}> X </i></div>
            </div>
          }


          <div className="shadow"></div>
        </div>
      </main>

    </>
  )
}

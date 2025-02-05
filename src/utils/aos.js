"use client"
import React, { useEffect } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";


export default function AOSInit() {
    useEffect(() => {
        AOS.init()
    },[])

  return null
}

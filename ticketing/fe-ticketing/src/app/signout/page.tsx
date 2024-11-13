"use client";
import { axiosInstance } from "@refinedev/simple-rest";
import { useForm } from "@refinedev/react-hook-form";
import { useState, useEffect } from "react";
import { useNotification } from "@refinedev/core";
import { useRouter } from "next/navigation"; // for Next.js 13+ (App Router)
import { cookies } from 'next/headers';

export default function Signout(){
    const router = useRouter();
    const fetchLogedUser = async () => {
        try {
            const response = await axiosInstance.post('/api/users/signout');

            console.log("in the signout form", response)
            if (response.data.message){
                document.cookie = '';
                router.push('/landingpage')
                
            }
            
        } catch (error) {
            console.log('error in fetch loged user', error)
        }

    }

    fetchLogedUser();
}
'use client'
import React from 'react';
import {useSearchParams}  from 'next/navigation';
import OrderList  from "@/components/OrderList";


export default function Orders() {

    const searchParams = useSearchParams();
    const userId = searchParams.get('userId');

    console.log("Orders page userId: ", userId);

    return (
        <OrderList theUserId={userId}/>

    );
};

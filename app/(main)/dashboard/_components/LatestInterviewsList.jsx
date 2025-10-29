"use client"
import React, { useState } from 'react'
import CreateOptions from './CreateOptions';
import { Camera, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'; // <-- import router
import Image from 'next/image';

function LatestInterviewsList() {
    const [interviewList, setInterviewList] = useState([]);
    const router = useRouter(); // <-- initialize router

    return (
        <div className='my-5'>
            <h2 className='font-bold text-2xl'>Previously Created Interviews</h2> 

            {interviewList?.length === 0 &&
                <div className='p-5 flex flex-col gap-3 items-center mt-5'>
                    <Image src="/write.png" alt="Start writing" width={140} height={140} className="opacity-90" />
                    <h2>You don't have any interview created</h2>
                    <Button onClick={() => router.push('/dashboard/create-interview')}>
                        Create New Interview
                    </Button>
                </div>
            }
        </div>
    )
}

export default LatestInterviewsList

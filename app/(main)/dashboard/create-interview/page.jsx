"use client";

import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import FormContainer from './_components/FormContainer';
import QuestionList from './_components/QuestionList';
import { toast } from 'sonner';
import InterviewLink from './_components/InterviewLink';

function CreateInterview() {
  const router = useRouter();
  const [step,setStep]=useState(1);
  const[formData,setFormData]=useState();
  const [interviewId,setInterviewId]=useState();
  const onHandleInputChange=(field,value)=>{
    setFormData(prev=>({
      ...prev,
      [field]:value
    }))

    console.log("form data",formData)
  }

  const onGoToNext=()=>{
    if(!formData?.jobPosition||!formData?.jobDescription||!formData?.duration||!formData.type)
    {
      toast('please enter all details')
      return;
    }
    setStep(step+1);
  }

  const onCreateLink=(interview_id)=>{
    setInterviewId(interview_id);
    setStep(step+1);
  }
  
  return (
    <div className='mt-10 px-10 md:px-24 lg:px-44 xl:px-56'>
      <div className='flex gap-5 items-center'>
       <div
  onClick={() => router.back()}
  className="
    cursor-pointer 
    w-8 h-10
    flex items-center justify-center 
    rounded-full 
    bg-blue-200 
    hover:bg-blue-500 
    active:bg-red-400 
    transition 
    transform 
    duration-400
    ease-in-out
    hover:scale-150 
    active:scale-100
  "
>
  <ArrowLeft className="w-6 h-6 text-gray-700 animate-bounce-left" />
</div>

        <h2 className='font-bold text-2xl'>Create New Interview</h2>
        
      </div>
      <Progress value={step*33.33} className={'my-5'} />
      {step==1?<FormContainer onHandleInputChange={onHandleInputChange}
      GoToNext={()=>onGoToNext()}/>
      :step==2?<QuestionList formData={formData} onCreateLink={(interview_id)=>onCreateLink(interview_id)}/>:
      step==3?<InterviewLink interview_id={interviewId} 
      formData={formData}
      />:null}
    </div>
  );
}

export default CreateInterview;

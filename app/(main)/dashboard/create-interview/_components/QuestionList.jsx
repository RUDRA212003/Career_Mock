import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Loader2, Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import QuestionListContainer from './QuestionListContainer';
import { supabase } from '@/services/supabaseClient';
import { useUser } from '@/app/provider';
import { v4 as uuidv4 } from 'uuid';

function QuestionList({ formData,onCreateLink }) {
  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState([]);
  const {user}=useUser();
  const [saveLoading,setSaveLoading]=useState(false);
  useEffect(() => {
    if (formData) GenerateQuestionList();
  }, [formData]);

  const GenerateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post('/api/ai-model', { ...formData });
      const content = result?.data?.content;
      console.log("RAW AI Content:", content);

      if (!content || typeof content !== "string") {
        toast("No valid content received from AI.");
        setQuestionList([]);
        return;
      }

      // --- Extract JSON safely ---
      const match = content.match(/```json([\s\S]*?)```/);
      const jsonText = match ? match[1] : content;

      let parsed;
      try {
        parsed = JSON.parse(jsonText.trim());
      } catch (err) {
        console.error("JSON Parse Error:", err);
        toast("AI response was not valid JSON.");
        setQuestionList([]);
        return;
      }

      // --- Update question list safely ---
      setQuestionList(parsed?.interviewQuestions || parsed?.questions || []);
    } catch (e) {
      console.error("Error fetching questions:", e);
      toast("Server error, try again!");
      setQuestionList([]);
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async () => {
    setSaveLoading(true)
    const interview_id=uuidv4();
    
const { data, error } = await supabase
  .from('interviews')
  .insert([
    { 
      ...formData,
      questionList:questionList,
      userEmail:user?.email,
      interview_id:interview_id
     },
  ])
  .select()
       setSaveLoading(false);

       onCreateLink(interview_id)

  };

  return (
    <div className="w-full">
      {/* --- Loader --- */}
      {loading && (
        <div className="p-5 bg-blue-50 rounded-xl border border-blue-200 flex gap-4 items-center">
          <Loader2Icon className="animate-spin text-blue-500" />
          <div>
            <h2 className="font-semibold text-blue-800">Generating Interview Questions</h2>
            <p className="text-sm text-blue-600">Our AI is working for you...</p>
          </div>
        </div>
      )}

      {/* --- No Questions --- */}
      {!loading && questionList.length === 0 && (
        <div className="p-5 border border-gray-200 rounded-xl text-gray-500 text-center mt-5">
          No questions generated. Try again!
        </div>
      )}

      {/* --- Question List --- */}
      {!loading && questionList.length > 0 && (
        <div className="mt-5">
          <QuestionListContainer questionList={questionList} />
        </div>
      )}

      {/* --- Finish Button --- */}
      <div className="flex justify-end mt-10">
        <Button onClick={()=>onFinish()} disabled={saveLoading}>
          {saveLoading&&<Loader2 className='animate-spin'/>}
          Create Interview Link and Finish</Button>
      </div>
    </div>
  );
}

export default QuestionList;

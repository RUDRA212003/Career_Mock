import { BriefcaseBusinessIcon, Calendar, Code2Icon, LayoutDashboardIcon, List, Puzzle, Settings, User2Icon, WalletCards } from "lucide-react";

export const SideBarOptions=[
    {
        name:'Dashboard',
        icon:LayoutDashboardIcon,
        path:'/dashboard'
    },
    {
        name:'Scheduled Interview',
        icon:Calendar,
        path:'/scheduled-interview'
    },
    {
        name:'All Interview',
        icon:List,
        path:'/all-interview'
    },
    {
        name:'Billing',
        icon:WalletCards,
        path:'/billing'
    },
    {
        name:'Settings',
        icon:Settings,
        path:'/settings'
    },
]

export const InterviewType=[
    {
        title:'Technical',
        icon:Code2Icon
    },
    {
        title:'Behavioral',
        icon:User2Icon
    },
    {
        title:'Experience',
        icon:BriefcaseBusinessIcon
    },
    {
        title:'Problem Solving',
        icon:Puzzle
    },
    {
        title:'Leadership',
        icon:Code2Icon
    },
]

export const QUESTION_PROMPT = `
Generate a list of interview questions in JSON format only.
Each question should have:
- "question": the text of the question
- "type": a category such as "Technical", "Behavioral", "Experience", etc.

Respond strictly in this JSON format:
\`\`\`json
{
  "interviewQuestions": [
    { "question": "...", "type": "..." }
  ]
}
\`\`\`

Job Title: {{jobTitle}}
Job Description: {{jobDescription}}
Interview Type: {{type}}
Duration: {{duration}} minutes
`;

export const FEEDBACK_PROMPT= `{{conversation}}

Depends on this Interview Conversation between assitant and user, 

Give me feedback for user interview. Give me rating out of 10 for technical Skills, 

Communication, Problem Solving, Experince. Also give me summery in 3 lines 

about the interview and one line to let me know whether is recommanded 

for hire or not with msg. Give me response in JSON format

{

    feedback:{

        rating:{

            techicalSkills:5,

            communication:6,

            problemSolving:4,

            experince:7

        },

        summery:<in 3 Line>,

        Recommendation:'',

        RecommendationMsg:''



    }

}

`

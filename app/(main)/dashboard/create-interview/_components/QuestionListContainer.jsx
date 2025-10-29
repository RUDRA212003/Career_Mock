import React from 'react';

function QuestionListContainer({ questionList = [] }) {
  return (
    <div className="p-6 border border-gray-200 rounded-xl bg-gray-50 mt-4 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Generated Questions</h2>

      {questionList.length === 0 ? (
        <p className="text-gray-500 text-sm">No questions to show.</p>
      ) : (
        questionList.map((item, index) => (
          <div
            key={index}
            className="relative group p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between">
              <h3 className="font-medium text-gray-900 text-base pr-10">
                {index + 1}. {item.question}
              </h3>

              {/* --- Type Badge --- */}
              <span
                className={`
                  absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full
                  ${item?.type?.toLowerCase().includes('technical')
                    ? 'bg-blue-100 text-blue-700'
                    : item?.type?.toLowerCase().includes('behavior')
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600'}
                `}
              >
                {item?.type || 'General'}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default QuestionListContainer;

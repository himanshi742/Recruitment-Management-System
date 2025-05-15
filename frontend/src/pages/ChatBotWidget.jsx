import { useState } from "react";
import { FaComments } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Bot } from 'lucide-react';

const predefinedQA = [
  {
    question: "How do I apply for a job?",
    answer: "To apply, click on a job listing and then press the 'Apply Now' button.",
  },
  {
    question: "Can I track my application?",
    answer: "Yes, go to 'My Jobs' to view all your applications and statuses.",
  },
  {
    question: "How can I update my resume?",
    answer: "Go to your profile settings and update your resume URL.",
  },
  {
    question: "How will I know if I'm selected?",
    answer: "You’ll receive an email if your status changes to 'Accepted' or 'Rejected'.",
  },
  {
    question: "Can I withdraw my application?",
    answer: "Currently, you’ll need to contact the recruiter directly to withdraw.",
  },
];

const ChatBotWidget = () => {
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState([]);
  const [showQuestions, setShowQuestions] = useState(true);

  const handleQuestionClick = (qa) => {
    const newChat = [
      ...chat,
      { type: "user", text: qa.question },
      { type: "bot", text: qa.answer },
      { type: "bot", text: "Do you want to ask another question or exit?" },
    ];
    setChat(newChat);
    setShowQuestions(false);
  };

  const handleExit = () => {
    setChat([...chat, { type: "user", text: "Exit" }, { type: "bot", text: "Thanks for chatting. Have a great day!" }]);
    setShowQuestions(false);
    var timeout =2000;
    setTimeout(() => {
        setOpen(false);
        setChat([]);
        setShowQuestions(true);

    }, timeout);
  };

  const handleRestart = () => {
    setChat([]);
    setShowQuestions(true);
  };

  return (
    <div className="relative z-20">
      <div
        className="fixed bottom-4 right-4 bg-[#8AB2A6] hover:bg-[#66847b] text-white p-4 rounded-full shadow-lg cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <Bot size={32} />
      </div>

      {open && (
        <div className="fixed bottom-20 right-4 bg-white w-80 max-h-[70vh] rounded-lg shadow-lg p-4 flex flex-col gap-2 overflow-hidden border">
          <h3 className="text-lg font-semibold text-center text-[#3E3F5B] mb-2">🤖 Quick Help</h3>

          <div className="overflow-y-auto flex-1 border rounded p-2">
            {chat.map((msg, idx) => (
              <div
                key={idx}
                className={`my-1 p-2 rounded text-sm ${
                  msg.type === "user" ? "bg-[#e0f7fa] text-right" : "bg-gray-100 text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {showQuestions && (
              <div className="space-y-2 mt-2">
                {predefinedQA.map((qa, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    className="w-full text-left"
                    onClick={() => handleQuestionClick(qa)}
                  >
                    {qa.question}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {!showQuestions && (
            <div className="mt-2 flex gap-2 justify-between">
              <Button size="sm" variant="secondary" onClick={handleRestart}>
                Ask another
              </Button>
              <Button className={"text-black"} size="sm" variant="destructive" onClick={handleExit}>
                Exit
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBotWidget;

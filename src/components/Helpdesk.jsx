import React, { useState, useRef, useEffect } from 'react';
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { MessageCircle, X, Send, MinusCircle, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_BASE_URL = "http://127.0.0.1:8000";

const Helpdesk = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'system', content: 'Hi there! I can help you find information about courses, instructors, and reviews. How can I assist you today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, isOpen]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    // Add user message to chat history
    const userMessage = { role: 'user', content: message };
    setChatHistory(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    // Clear input field
    setMessage('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status === 'success') {
        // Add assistant response to chat history
        setChatHistory(prev => [...prev, { role: 'system', content: data.message }]);
      } else {
        // Handle error from backend
        console.error('API error:', data.message);
        setChatHistory(prev => [...prev, { 
          role: 'system', 
          content: 'Sorry, I encountered an error. Please try again later.' 
        }]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setChatHistory(prev => [...prev, { 
        role: 'system', 
        content: 'Sorry, I encountered an error connecting to the server. Please try again later.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedQuestion = (question) => {
    setMessage(question);
    // Auto-send suggested questions
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 z-40' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 rounded-full p-4 shadow-lg transition-all duration-300 hover:shadow-xl z-50
          bg-teal-600 hover:bg-teal-700 text-white`}
      >
        {isOpen ? (
          <X className="h-6 w-6 stroke-[2] text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 stroke-[2] text-white" />
        )}
      </Button>

      {/* Helpdesk Panel */}
      <div
        className={`fixed bottom-24 right-6 transition-all duration-300 transform z-50
          ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
      >
        <Card className="w-[350px] shadow-xl bg-white">
          <CardHeader className="bg-teal-50/95 backdrop-blur-sm rounded-t-lg border-b border-teal-100">
            <CardTitle className="text-teal-700">Course Assistant</CardTitle>
            <CardDescription className="text-teal-600/90">Ask me anything about our courses</CardDescription>
          </CardHeader>
          <CardContent className="p-4 bg-white/95 backdrop-blur-sm">
            <div className="space-y-4">
              {/* Chat Messages */}
              <div className="h-[300px] overflow-y-auto p-3 bg-gray-50 rounded-lg">
                {chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-3 ${
                      msg.role === 'user' ? 'text-right' : ''
                    }`}
                  >
                    <div
                      className={`inline-block max-w-[80%] rounded-lg px-4 py-2 ${
                        msg.role === 'user'
                          ? 'bg-teal-600 text-white'
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="mb-3">
                    <div className="inline-block max-w-[80%] rounded-lg px-4 py-2 bg-gray-200 text-gray-800">
                      <div className="flex space-x-2">
                        <div className="animate-bounce h-2 w-2 rounded-full bg-gray-500"></div>
                        <div className="animate-bounce h-2 w-2 rounded-full bg-gray-500" style={{ animationDelay: '0.2s' }}></div>
                        <div className="animate-bounce h-2 w-2 rounded-full bg-gray-500" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Textarea
                    placeholder="Type your message here..."
                    className="min-h-[80px] resize-none bg-white"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 bg-white/80 hover:bg-white"
                    onClick={() => setMessage('')}
                  >
                    <MinusCircle className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                  <Button
                    size="sm"
                    className="bg-teal-600 hover:bg-teal-700 text-white"
                    onClick={handleSendMessage}
                    disabled={!message.trim() || isLoading}
                  >
                    <Send className="h-4 w-4 mr-1" />
                    Send
                  </Button>
                </div>
              </div>

              {/* Quick Links */}
              <div className="pt-2 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Suggested Questions</h4>
                <div className="space-y-1">
                  {[
                    'What are the prerequisites for Web Development?',
                    'Tell me about the Mobile App Development course',
                    'Which courses have the highest ratings?'
                  ].map((question) => (
                    <button
                      key={question}
                      className="w-full text-left px-2 py-1.5 text-sm text-gray-600 hover:bg-teal-50 rounded-md transition-colors bg-white/80 hover:bg-white"
                      onClick={() => handleSuggestedQuestion(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Helpdesk;

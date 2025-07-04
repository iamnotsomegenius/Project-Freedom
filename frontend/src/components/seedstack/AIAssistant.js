import React, { useState, useEffect, useRef } from 'react';
import SeedStackLayout from './SeedStackLayout';
import {
  PaperAirplaneIcon,
  ChatBubbleLeftRightIcon,
  DocumentChartBarIcon,
  MagnifyingGlassIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import Button from '../ui/Button';

const AIAssistant = ({ user, onLogout }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState('');
  const [messageType, setMessageType] = useState('general');
  const messagesEndRef = useRef(null);

  const messageTypes = [
    { id: 'general', name: 'General', icon: ChatBubbleLeftRightIcon },
    { id: 'deal_analysis', name: 'Deal Analysis', icon: DocumentChartBarIcon },
    { id: 'market_research', name: 'Market Research', icon: MagnifyingGlassIcon },
    { id: 'loi_help', name: 'LOI Help', icon: DocumentTextIcon },
  ];

  const quickPrompts = [
    "Analyze the financial health of this business",
    "What are key due diligence areas I should focus on?",
    "Help me understand industry valuation multiples",
    "Draft an LOI for this acquisition",
    "What questions should I ask the seller?",
    "Identify potential red flags in this deal"
  ];

  useEffect(() => {
    // Load initial welcome message
    setMessages([
      {
        id: 1,
        type: 'ai',
        content: "Hello! I'm your AI assistant for deal analysis and acquisition guidance. I can help you with:\n\n• Financial analysis and red flag identification\n• Market research and industry insights\n• LOI drafting and negotiation strategies\n• Due diligence planning\n• General acquisition advice\n\nHow can I assist you today?",
        timestamp: new Date()
      }
    ]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(newMessage, messageType);
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (message, type) => {
    // Mock AI responses based on message type and content
    const lowerMessage = message.toLowerCase();

    if (type === 'deal_analysis') {
      if (lowerMessage.includes('financial') || lowerMessage.includes('p&l')) {
        return "Based on your financial analysis request, here are key areas to examine:\n\n📊 **Revenue Analysis:**\n• Revenue growth trends (3-5 years)\n• Customer concentration risk\n• Recurring vs. one-time revenue\n\n💰 **Profitability Metrics:**\n• Gross margin stability\n• EBITDA trends and adjustments\n• Working capital requirements\n\n🚩 **Red Flags to Watch:**\n• Declining margins\n• Increasing AR/inventory\n• Customer concentration >20%\n\nWould you like me to dive deeper into any specific area?";
      } else if (lowerMessage.includes('valuation') || lowerMessage.includes('multiple')) {
        return "For valuation analysis, I recommend focusing on:\n\n📈 **Market Multiples:**\n• Industry median: 4-8x EBITDA\n• Size premium adjustments\n• Growth rate considerations\n\n🎯 **Value Drivers:**\n• Management quality\n• Market position\n• Growth potential\n• Defensive characteristics\n\n💡 **Negotiation Strategy:**\n• Start with comparable multiples\n• Adjust for specific risks/opportunities\n• Consider earnout structures\n\nWhat's the business size and industry for more specific guidance?";
      }
      return "I can help analyze this deal from multiple angles. Could you share more details about the specific aspect you'd like me to focus on? For example:\n\n• Financial performance review\n• Market position analysis\n• Risk assessment\n• Valuation methodology\n• Strategic fit evaluation";
    }

    if (type === 'market_research') {
      return "For comprehensive market research, I'll help you analyze:\n\n🏢 **Industry Overview:**\n• Market size and growth trends\n• Key competitive dynamics\n• Regulatory environment\n\n📊 **Benchmarking:**\n• Comparable company analysis\n• Transaction multiples\n• Performance metrics\n\n🎯 **Market Position:**\n• Competitive advantages\n• Market share analysis\n• Customer base evaluation\n\nWhat industry and geographic market should we research?";
    }

    if (type === 'loi_help') {
      return "I'll help you craft an effective LOI. Key components to include:\n\n📋 **Essential Terms:**\n• Purchase price and structure\n• Due diligence timeline (30-60 days)\n• Financing contingencies\n• Exclusivity period (30-45 days)\n\n⚖️ **Negotiation Elements:**\n• Earnout provisions if applicable\n• Key employee retention\n• Non-compete agreements\n• Asset vs. stock purchase\n\n✅ **Next Steps:**\n• Timeline for definitive agreement\n• Key conditions precedent\n• Break-up fee provisions\n\nWhat specific terms would you like help structuring?";
    }

    // General responses
    if (lowerMessage.includes('due diligence')) {
      return "Here's a comprehensive due diligence checklist:\n\n📊 **Financial DD:**\n• 3-5 years audited financials\n• Monthly P&L and cash flow\n• Customer contracts and concentration\n• Vendor relationships\n\n⚖️ **Legal DD:**\n• Corporate structure and compliance\n• Material contracts review\n• Litigation and regulatory matters\n• IP and asset ownership\n\n🏢 **Operational DD:**\n• Management team assessment\n• Systems and processes\n• Market position and competition\n• Growth opportunities and risks\n\nWhich area would you like me to elaborate on?";
    }

    // Default response
    return `I understand you're asking about: "${message}"\n\nBased on my experience with SMB acquisitions, here are some key considerations:\n\n• Focus on sustainable cash flow and customer relationships\n• Understand the management team's role in operations\n• Identify key growth drivers and potential risks\n• Consider market dynamics and competitive position\n\nWould you like me to dive deeper into any specific aspect of this deal or provide more targeted analysis?`;
  };

  const handleQuickPrompt = (prompt) => {
    setNewMessage(prompt);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <SeedStackLayout user={user} onLogout={onLogout}>
      <div className="h-screen flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Assistant</h1>
              <p className="text-gray-600">Get intelligent guidance for your acquisitions</p>
            </div>
            
            <div className="flex space-x-4">
              <select
                value={messageType}
                onChange={(e) => setMessageType(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                {messageTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Quick Prompts */}
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Quick prompts:</p>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.slice(0, 3).map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickPrompt(prompt)}
                  className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-3xl p-4 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-900 border border-gray-200'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  <div className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-green-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                    <span className="text-gray-600">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="p-6 bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <div className="flex space-x-4">
              <div className="flex-1">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about deal analysis, market research, or acquisition strategy..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows="2"
                />
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || isLoading}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <PaperAirplaneIcon className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Additional Quick Prompts */}
            <div className="mt-3">
              <div className="flex flex-wrap gap-2">
                {quickPrompts.slice(3).map((prompt, index) => (
                  <button
                    key={index + 3}
                    onClick={() => handleQuickPrompt(prompt)}
                    className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SeedStackLayout>
  );
};

export default AIAssistant;

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle } from 'lucide-react';
import { ChatMessage } from '@/types/expense';

interface AIChatProps {
  chatMessages: ChatMessage[];
  chatInput: string;
  setChatInput: (input: string) => void;
  onSendMessage: () => void;
}

const AIChat: React.FC<AIChatProps> = ({ chatMessages, chatInput, setChatInput, onSendMessage }) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSendMessage();
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Financial Assistant
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-64 overflow-y-auto space-y-3 p-3 bg-gray-50 rounded-lg">
            {chatMessages.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Ask me anything about budgeting and expenses!</p>
              </div>
            ) : (
              chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-blue-500 text-white'
                        : 'bg-white border border-gray-200'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Ask about budgeting, savings, or expenses..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button onClick={onSendMessage} className="bg-gradient-to-r from-blue-500 to-purple-600">
              Send
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChat;

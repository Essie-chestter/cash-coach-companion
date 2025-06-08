
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award } from 'lucide-react';

interface BadgeDisplayProps {
  badges: string[];
}

const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ badges }) => {
  if (badges.length === 0) return null;

  return (
    <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-yellow-500" />
          Your Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {badges.map((badge, index) => (
            <Badge key={index} variant="secondary" className="bg-yellow-100 text-yellow-800">
              🏆 {badge.replace('-', ' ').toUpperCase()}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BadgeDisplay;

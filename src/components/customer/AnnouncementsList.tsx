import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Megaphone, Clock } from 'lucide-react';
import { Announcement } from '../../types';

interface AnnouncementsListProps {
  announcements: Announcement[];
}

export function AnnouncementsList({ announcements }: AnnouncementsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Megaphone className="h-5 w-5 text-orange-500" />
          Announcements & Updates
        </CardTitle>
      </CardHeader>
      <CardContent>
        {announcements.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            No announcements at this time.
          </div>
        ) : (
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="p-5 bg-orange-50 border border-orange-100 rounded-xl">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h4 className="font-semibold text-slate-900">{announcement.title}</h4>
                  <div className="flex items-center gap-1 text-xs text-slate-500 whitespace-nowrap">
                    <Clock className="h-3 w-3" />
                    {new Date(announcement.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{announcement.message}</p>
                <p className="text-xs text-slate-400 mt-3">Posted by {announcement.createdBy}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
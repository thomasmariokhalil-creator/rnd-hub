import React from "react";
import { MobileHeader } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SCHEDULE = [
  { period: "Period 1", time: "8:30 - 9:45" },
  { period: "Period 2", time: "9:50 - 11:05" },
  { period: "Lunch", time: "11:05 - 11:50" },
  { period: "Period 3", time: "11:55 - 1:10" },
  { period: "Period 4", time: "1:15 - 2:30" },
];

const HOLIDAYS = [
  { event: "First Day of School", date: "Sept 3, 2025" },
  { event: "Thanksgiving", date: "Oct 13, 2025" },
  { event: "Christmas Break", date: "Dec 22, 2025 - Jan 2, 2026" },
  { event: "Family Day", date: "Feb 16, 2026" },
  { event: "March Break", date: "Mar 9 - 13, 2026" },
  { event: "Good Friday", date: "Apr 3, 2026" },
  { event: "Easter Monday", date: "Apr 6, 2026" },
  { event: "Victoria Day", date: "May 18, 2026" },
];

const PA_DAYS = [
  { date: "Sept 2, 2025" },
  { date: "Oct 24, 2025" },
  { date: "Nov 21, 2025" },
  { date: "Jan 30, 2026" },
  { date: "Apr 17, 2026" },
  { date: "June 5, 2026" },
  { date: "June 26, 2026" },
];

const EXAMS = [
  { date: "Jan 22, 2026", details: "Exam Day 1" },
  { date: "Jan 23, 2026", details: "Exam Day 2" },
  { date: "Jan 26, 2026", details: "Exam Day 3" },
  { date: "Jan 27, 2026", details: "Exam Day 4" },
];

export default function Dates() {
  return (
    <div className="pb-24 md:pb-10">
      <MobileHeader title="School Dates" />
      <main className="md:pt-28 max-w-4xl mx-auto px-4 md:px-6">
        <SectionHeader title="Dates & Schedules" description="Daily schedule, holidays, and important dates." />

        <Tabs defaultValue="schedule" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="exams">Exams</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Daily Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Period</TableHead>
                      <TableHead>Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {SCHEDULE.map((item) => (
                      <TableRow key={item.period}>
                        <TableCell className="font-medium">{item.period}</TableCell>
                        <TableCell>{item.time}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">Holidays</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {HOLIDAYS.map((h) => (
                      <li key={h.event} className="flex flex-col">
                        <span className="font-bold text-foreground">{h.event}</span>
                        <span className="text-sm text-muted-foreground">{h.date}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">PA Days</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {PA_DAYS.map((p) => (
                      <li key={p.date} className="text-foreground font-medium">
                        {p.date}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="exams">
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">January Exams</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {EXAMS.map((e) => (
                    <li key={e.date} className="flex justify-between items-center border-b pb-2">
                      <span className="font-bold">{e.date}</span>
                      <span className="text-sm text-muted-foreground">{e.details}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
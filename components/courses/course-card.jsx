import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, PlayCircle } from 'lucide-react';
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";


export default function CourseCard({ course }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="overflow-hidden border-muted/20">
        <div className="aspect-video relative bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
          <BookOpen className="w-12 h-12 text-primary" />
        </div>
        <CardHeader>
          <CardTitle className="text-xl">{course.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Continue your learning journey with this course
          </p>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="w-full" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <PlayCircle className="w-4 h-4" />
              12 Lessons
            </span>
            <Button size="sm">
              {course.progress > 0 ? "Continue" : "Start"} Learning
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}


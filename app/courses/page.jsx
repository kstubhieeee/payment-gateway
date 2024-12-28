"use client";

import { motion } from "framer-motion";
import { BookOpen, Search } from 'lucide-react';
import CourseCard from "@/components/courses/course-card";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CoursesPage() {
  const searchParams = useSearchParams();
  const isNewPurchase = searchParams.get("new");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  useEffect(() => {
    if (isNewPurchase) {
      toast.success("You have successfully purchased the course!");
    }
  }, [isNewPurchase]);

  // Placeholder for course data
  const courses = [
    { id: 1, title: "Introduction to React", progress: 30 },
    { id: 2, title: "Advanced JavaScript Concepts", progress: 70 },
    { id: 3, title: "Building RESTful APIs", progress: 0 },
    // Add more courses as needed
  ];

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === "title") return a.title.localeCompare(b.title);
    if (sortBy === "progress") return b.progress - a.progress;
    return 0; // Default to no sorting
  });

  return (
    <div className="container py-12 p-12 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text">
          Your Learning Journey
        </h1>
        <p className="text-muted-foreground">
          Explore and continue your courses below
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 items-center justify-between"
      >
        <div className="relative w-full sm:w-64">
          <Input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="progress">Progress</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {sortedCourses.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {sortedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center py-12"
        >
          <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No courses found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter to find what you're looking for.
          </p>
          <div className="mt-6">
            <Button onClick={() => setSearchTerm("")}>Clear search</Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}


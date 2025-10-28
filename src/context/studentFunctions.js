import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import firebaseapp from './firebase';

import courseFunctions from './courseFunction';
const firestore = getFirestore(firebaseapp)

const enrollInCourse = async (courseId, studentId) => {
    const courseRef = doc(firestore, "courses", courseId);
    const studentRef = doc(firestore, "users", studentId);

    const studentSnap = await getDoc(studentRef);
    const studentData = studentSnap.data();
    const currentStudentEnrollments = Array.isArray(studentData.enrollments) ? studentData.enrollments : [];
    // Get current enrollments
    const courseSnap = await getDoc(courseRef);
    const courseData = courseSnap.data();
    const currentCourseEnrollments = Array.isArray(courseData.enrollments) ? courseData.enrollments : [];

    // Only add if not already enrolled
    if (!currentCourseEnrollments.includes(studentId)) {
        const updatedEnrollments = [...currentCourseEnrollments, studentId];
        await setDoc(courseRef, { enrollments: updatedEnrollments }, { merge: true });
    }
    if (!currentStudentEnrollments.includes(courseId)) {
        const updatedEnrollments = [...currentStudentEnrollments, courseId];
        await setDoc(studentRef, { enrollments: updatedEnrollments }, { merge: true });
    }
    return courseId;
}

const getEnrolledCourses = async (studentId) => {
    try {
        const studentSnap = await getDoc(doc(firestore, "users", studentId));
        
        if (!studentSnap.exists()) {
            console.error("Student document not found");
            return [];
        }
        
        const studentData = studentSnap.data();
        const studentEnrollments = studentData.enrollments || [];
        
        if (studentEnrollments.length === 0) {
            return [];
        }
        
        const allCourses = await courseFunctions.getAllCourses();
        const enrolledCourses = [];
        
        allCourses.forEach(course => {
            if (studentEnrollments.includes(course.id)) {
                enrolledCourses.push(course);
            }
        });
        
        return enrolledCourses;
    } catch (error) {
        console.error("Error fetching enrolled courses:", error);
        return [];
    }
}

const generateEnrolledCoursesList = async (studentId) => {
    try {
        const enrolledCourses = await getEnrolledCourses(studentId);
        
        // Enhance the enrolled courses with additional information
        const enhancedEnrolledCourses = enrolledCourses.map(course => ({
            ...course,
            enrollmentDate: course.enrollmentDate || new Date().toISOString(),
            progress: course.progress || 0, // Percentage completed
            lastAccessed: course.lastAccessed || null,
            completedLectures: course.completedLectures || [],
            totalLectures: course.chapters?.reduce((total, chapter) => 
                total + (chapter.chapterContent?.length || 0), 0) || 0,
            estimatedTimeRemaining: calculateEstimatedTimeRemaining(course),
            isCompleted: course.progress >= 100 || false
        }));
        
        // Sort by last accessed date (most recent first), then by enrollment date
        enhancedEnrolledCourses.sort((a, b) => {
            if (a.lastAccessed && b.lastAccessed) {
                return new Date(b.lastAccessed) - new Date(a.lastAccessed);
            }
            return new Date(b.enrollmentDate) - new Date(a.enrollmentDate);
        });
        
        return enhancedEnrolledCourses;
    } catch (error) {
        console.error("Error generating enrolled courses list:", error);
        return [];
    }
}

const calculateEstimatedTimeRemaining = (course) => {
    if (!course.chapters) return "Unknown";
    
    const totalMinutes = course.chapters.reduce((total, chapter) => {
        return total + (chapter.chapterContent?.reduce((chapterTotal, lecture) => 
            chapterTotal + (lecture.lectureDuration || 0), 0) || 0);
    }, 0);
    
    const completedMinutes = totalMinutes * (course.progress || 0) / 100;
    const remainingMinutes = totalMinutes - completedMinutes;
    
    if (remainingMinutes <= 0) return "Completed";
    
    const hours = Math.floor(remainingMinutes / 60);
    const minutes = remainingMinutes % 60;
    
    if (hours > 0) {
        return `${hours}h ${minutes}m remaining`;
    } else {
        return `${minutes}m remaining`;
    }
}

const updateCourseProgress = async (studentId, courseId, lectureId) => {
    try {
        const studentRef = doc(firestore, "users", studentId);
        const studentSnap = await getDoc(studentRef);
        
        if (!studentSnap.exists()) {
            throw new Error("Student document not found");
        }
        
        const studentData = studentSnap.data();
        const enrollments = studentData.enrollments || [];
        
        if (!enrollments.includes(courseId)) {
            throw new Error("Student is not enrolled in this course");
        }
        
        // Get course data to calculate progress
        const course = await courseFunctions.getCourseById(courseId);
        if (!course) {
            throw new Error("Course not found");
        }
        
        const totalLectures = course.chapters?.reduce((total, chapter) => 
            total + (chapter.chapterContent?.length || 0), 0) || 0;
        
        const completedLectures = studentData.completedLectures?.[courseId] || [];
        
        if (!completedLectures.includes(lectureId)) {
            completedLectures.push(lectureId);
        }
        
        const progress = Math.round((completedLectures.length / totalLectures) * 100);
        
        // Update student document
        await setDoc(studentRef, {
            completedLectures: {
                ...studentData.completedLectures,
                [courseId]: completedLectures
            },
            lastAccessed: new Date().toISOString()
        }, { merge: true });
        
        return {
            progress,
            completedLectures: completedLectures.length,
            totalLectures,
            isCompleted: progress >= 100
        };
    } catch (error) {
        console.error("Error updating course progress:", error);
        throw error;
    }
}

const rateCourse = async (studentId, courseId, rating) => {
    const courseRef = doc(firestore, "courses", courseId);
    const courseSnap = await getDoc(courseRef);
    const courseData = courseSnap.data();
    const ratings = courseData.ratings || [];
    const ratingData = {
        studentId: studentId,
        rating: rating,
        date: new Date().toISOString()
    }
    ratings.push(ratingData);
    await setDoc(courseRef, { ratings }, { merge: true });
    return true;
}
const studentFunctions = {
    enrollInCourse,
    getEnrolledCourses,
    generateEnrolledCoursesList,
    updateCourseProgress,
    calculateEstimatedTimeRemaining,
    rateCourse
}
export default studentFunctions;

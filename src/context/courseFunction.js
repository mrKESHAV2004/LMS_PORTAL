import { addDoc, collection, doc, getDoc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import firebaseapp from './firebase';
import { where } from 'firebase/firestore';

const firestore = getFirestore(firebaseapp)

const getAllCourses = async () => {
    const querySnapshot = await getDocs(collection(firestore, "courses"));
    const courses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return courses;
}

const createCourse = async (course) => {
    const docRef = await addDoc(collection(firestore, "courses"), course);
    return docRef.id;
}

const getCourse = async (id) => {
    const docRef = doc(firestore, "courses", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    } else {
        return null;
    }
}

const getUserCourses = async (userId) => {
    const querySnapshot = await getDocs(collection(firestore, "courses"), where("educatorId", "==", userId));
    const courses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return courses;
}

const getEnrolledStudents = async (userId) => {
    const courseData = await getUserCourses(userId);

    if (!courseData || !Array.isArray(courseData) || courseData.length === 0) {
        return [];
    }
    
    // Collect all enrolled student and course relations
    const enrolledData = [];
    for (const course of courseData) {
        if (!course.enrollments || !Array.isArray(course.enrollments)) {
            continue;
        }
        for (const studentId of course.enrollments) {
            // Fetch student name from the students collection
            const studentDocRef = doc(firestore, "users", studentId);
            const studentSnap = await getDoc(studentDocRef);
            let studentData = null;
            if (studentSnap.exists()) {
                studentData = studentSnap.data();
            }
            enrolledData.push({
                student: {
                    id: studentId,
                    name: studentData.email,
                    imageUrl: studentData && studentData.imageUrl ? studentData.imageUrl : null,
                },
                courseTitle: course.courseTitle,
            });
        }
    }

    return enrolledData;
}

const calculateUserEarning = async (userId) => {
    const courseData = await getUserCourses(userId);
    let totalEarning = 0;
    for (const course of courseData) {
        totalEarning += course.enrollments.length * (course.coursePrice - course.discount * course.coursePrice / 100);
    }
    return totalEarning;
}

const courseFunctions = {
    getAllCourses,
    createCourse,
    getCourse,
    getUserCourses,
    getEnrolledStudents,
    calculateUserEarning
}

export default courseFunctions;
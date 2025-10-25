import React, { useRef, useState, useEffect } from 'react';
import Quill from 'quill';
import {assets} from '../../assets/assets';

const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState('');
  const [coursePrice, setCoursePrice] = useState(0);
  const [courseDescription, setCourseDescription] = useState('');
  const [image, setImage] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [chapters, setChapters] = useState([]);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: false
  });
  const [showPopUp, setShowPopUp] = useState(false);

  const handleChapter = (action, chapterId) => {
    if (action === 'add') {
      const title = prompt('Enter Chapter Name:');
      if (title) {
        const newChapter = {
          chapterId: Date.now(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === 'remove') {
      setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId));
    } else if (action === 'toggle') {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId
            ? { ...chapter, collapsed: !chapter.collapsed }
            : chapter
        )
      );
    }
  };

  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === 'add') {
      setCurrentChapterId(chapterId);
      setShowPopUp(true);
    } else if (action === 'remove') {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            return {
              ...chapter,
              chapterContent: chapter.chapterContent.filter((_, index) => index !== lectureIndex)
            };
          }
          return chapter;
        })
      );
    }
  };

  const addLectureToChapter = () => {
    if (!lectureDetails.lectureTitle || !lectureDetails.lectureDuration || !lectureDetails.lectureUrl) {
      alert('Please fill all lecture fields');
      return;
    }

    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          return {
            ...chapter,
            chapterContent: [...chapter.chapterContent, { ...lectureDetails }]
          };
        }
        return chapter;
      })
    );

    // Reset lecture details and close popup
    setLectureDetails({
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false
    });
    setShowPopUp(false);
    setCurrentChapterId(null);
  };

  const handleSubmitCourse = () => {
    if (!courseTitle) {
      alert('Please enter course title');
      return;
    }

    const courseData = {
      courseTitle,
      coursePrice,
      courseDescription: quillRef.current ? quillRef.current.root.innerHTML : '',
      image,
      discount,
      chapters
    };

    console.log('Course Data:', courseData);
    alert('Course added successfully! Check console for details.');
  };

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow'
      });
    }
  }, []);

  return (
    <div className='min-h-screen bg-gray-50 overflow-auto'>
      <div className='max-w-4xl p-4 md:p-6'>
        <h1 className='text-2xl font-bold text-gray-900 mb-6'>Add New Course</h1>
        
        <div className='space-y-4'>
          {/* Course Title */}
          <div className='bg-white p-4 rounded-lg shadow-sm'>
            <label htmlFor='courseTitle' className='block text-sm font-semibold text-gray-700 mb-2'>
              Course Title *
            </label>
            <input
              type='text'
              placeholder='Enter course title...'
              id='courseTitle'
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>

          {/* Course Description */}
          <div className='bg-white p-4 rounded-lg shadow-sm'>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
              Course Description
            </label>
            <div ref={editorRef} className='bg-white min-h-[150px]'></div>
          </div>

          {/* Price and Thumbnail */}
          <div className='grid md:grid-cols-2 gap-4'>
            <div className='bg-white p-4 rounded-lg shadow-sm'>
              <label htmlFor='coursePrice' className='block text-sm font-semibold text-gray-700 mb-2'>
                Course Price ($)
              </label>
              <input
                type='number'
                id='coursePrice'
                placeholder='0'
                value={coursePrice}
                onChange={(e) => setCoursePrice(e.target.value)}
                className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                min='0'
              />
            </div>

            <div className='bg-white p-4 rounded-lg shadow-sm'>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Course Thumbnail
              </label>
              <label htmlFor='thumbnailImage' className='flex items-center gap-3 cursor-pointer'>
                <div className='p-2 bg-blue-500 rounded hover:bg-blue-600 transition-colors'>
                  <img src={assets.file_upload_icon} className='w-5 h-5' alt='Upload' />
                </div>
                {image ? (
                  <div className='flex items-center gap-3'>
                    <img src={URL.createObjectURL(image)} className='h-10 w-10 object-cover rounded' alt='Thumbnail preview' />
                    <span className='text-sm text-gray-600'>{image.name}</span>
                  </div>
                ) : (
                  <span className='text-gray-500 text-sm'>Upload thumbnail image</span>
                )}
                <input
                  type='file'
                  id='thumbnailImage'
                  onChange={(e) => setImage(e.target.files[0])}
                  accept='image/*'
                  hidden
                />
              </label>
            </div>
          </div>

          {/* Discount */}
          <div className='bg-white p-4 rounded-lg shadow-sm'>
            <label htmlFor='courseDiscount' className='block text-sm font-semibold text-gray-700 mb-2'>
              Discount (%)
            </label>
            <input
              type='number'
              id='courseDiscount'
              placeholder='0'
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              min={0}
              max={100}
              className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>

          {/* Chapters Section */}
          <div className='bg-white p-4 rounded-lg shadow-sm'>
            <h2 className='text-lg font-semibold text-gray-900 mb-3'>Course Curriculum</h2>
            
            <div className='space-y-3'>
              {chapters.map((chapter, index) => (
                <div key={chapter.chapterId} className='border border-gray-200 rounded-lg overflow-hidden'>
                  <div className='flex justify-between items-center p-3 bg-gray-50 border-b border-gray-200'>
                    <div className='flex items-center gap-2 flex-1'>
                      <img
                        src={assets.dropdown_icon}
                        alt='Toggle'
                        width= {14}
                        className={`cursor-pointer transition-transform duration-300 ${
                          chapter.collapsed ? '-rotate-90' : ''
                        }`}
                        onClick={() => handleChapter('toggle', chapter.chapterId)}
                      />
                      <span className='font-semibold text-gray-900'>
                        Chapter {index + 1}: {chapter.chapterTitle}
                      </span>
                    </div>
                    <div className='flex items-center gap-3'>
                      <span className='text-sm text-gray-500'>
                        {chapter.chapterContent.length} Lecture{chapter.chapterContent.length !== 1 ? 's' : ''}
                      </span>
                      <img
                        src={assets.cross_icon}
                        className='cursor-pointer hover:opacity-70 transition-opacity'
                        alt='Remove'
                        onClick={() => handleChapter('remove', chapter.chapterId)}
                      />
                    </div>
                  </div>

                  {!chapter.collapsed && (
                    <div className='p-3 bg-white'>
                      {chapter.chapterContent.length > 0 ? (
                        <div className='space-y-2 mb-3'>
                          {chapter.chapterContent.map((lecture, lectureIndex) => (
                            <div
                              key={lectureIndex}
                              className='flex justify-between items-center p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors'
                            >
                              <div className='flex-1'>
                                <span className='font-medium text-gray-900'>
                                  {lectureIndex + 1}. {lecture.lectureTitle}
                                </span>
                                <div className='text-sm text-gray-600 mt-1 flex items-center gap-3'>
                                  <span>{lecture.lectureDuration} mins</span>
                                  <a
                                    href={lecture.lectureUrl}
                                    target='_blank'
                                    rel='noreferrer'
                                    className='text-blue-500 hover:text-blue-700 hover:underline'
                                  >
                                    View Link
                                  </a>
                                  <span className={`px-2 py-0.5 rounded text-xs ${
                                    lecture.isPreviewFree ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-800'
                                  }`}>
                                    {lecture.isPreviewFree ? 'Free Preview' : 'Paid'}
                                  </span>
                                </div>
                              </div>
                              <img
                                src={assets.cross_icon}
                                className='cursor-pointer hover:opacity-70 transition-opacity ml-3'
                                onClick={() => handleLecture('remove', chapter.chapterId, lectureIndex)}
                                alt='Remove'
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className='text-gray-500 text-sm mb-3'>No lectures added yet</p>
                      )}
                      
                      <button
                        type='button'
                        className='w-full flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 p-2 rounded-md transition-colors font-medium'
                        onClick={() => handleLecture('add', chapter.chapterId, chapter.chapterContent.length)}
                      >
                        + Add Lecture
                      </button>
                    </div>
                  )}
                </div>
              ))}

              <button
                type='button'
                className='w-full flex items-center justify-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 p-3 rounded-lg transition-colors font-semibold'
                onClick={() => handleChapter('add')}
              >
                + Add Chapter
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className='flex justify-end'>
            <button
              type='button'
              className='bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-md font-semibold transition-colors'
              onClick={handleSubmitCourse}
            >
              Create Course
            </button>
          </div>
        </div>

        {/* Add Lecture Popup */}
        {showPopUp && (
          <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4'>
            <div className='bg-white rounded-lg p-5 w-full max-w-sm relative shadow-xl'>
              <h2 className='text-lg font-semibold text-gray-900 mb-4'>Add Lecture</h2>
              
              <div className='space-y-3'>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Lecture Title *
                  </label>
                  <input
                    type='text'
                    className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='Enter lecture title...'
                    value={lectureDetails.lectureTitle}
                    onChange={(e) => setLectureDetails({ ...lectureDetails, lectureTitle: e.target.value })}
                  />
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Duration (minutes) *
                  </label>
                  <input
                    type='number'
                    className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='0'
                    value={lectureDetails.lectureDuration}
                    onChange={(e) => setLectureDetails({ ...lectureDetails, lectureDuration: e.target.value })}
                    min='0'
                  />
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Lecture URL *
                  </label>
                  <input
                    type='url'
                    className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='https://...'
                    value={lectureDetails.lectureUrl}
                    onChange={(e) => setLectureDetails({ ...lectureDetails, lectureUrl: e.target.value })}
                  />
                </div>

                <div className='flex items-center gap-2 pt-2'>
            <input type='checkbox' className='w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500' checked={lectureDetails.isPreviewFree} onChange={(e) => setLectureDetails({ ...lectureDetails, isPreviewFree: e.target.checked }) }
                  />
                  <label htmlFor='isPreviewFree' className='text-sm font-medium text-gray-700'>
                    Allow free preview
                  </label>
                </div>
              </div>

              <div className='flex gap-3 mt-4'>
                <button  type='button'  className='flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md font-semibold transition-colors'  onClick={addLectureToChapter}> Add Lecture</button>
                <button type='button' className='px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors' onClick={() => { setShowPopUp(false); setLectureDetails({
                      lectureTitle: '',
                      lectureDuration: '',
                      lectureUrl: '',
                      isPreviewFree: false
                    });
                  }}
                >
                  Cancel
                </button>
              </div>

              <img src={assets.cross_icon} className='absolute top-3 right-3 cursor-pointer hover:opacity-70 transition-opacity' onClick={() => setShowPopUp(false)} alt='Close'/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCourse;
import React, { useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'

const Rating = ({initialRating,onRate}) => {
    const {user,studentFunctions} = useContext(AppContext)
    const {courseId} = useParams()
    const [rating,setRating] = useState(initialRating || 0)
    const handleRating = (value) =>{
        setRating(value)
        if(onRate) onRate(value)
        studentFunctions.rateCourse(user.uid,courseId,value)
    }
    useEffect(()=>{
        if(initialRating) handleRating(initialRating)
    },[initialRating])
  return (
    <div>
        {Array.from({length:5},(_,index)=>{
            const starValue = index+1
            return(
                <span key={index} className={`text-xl sm:text-2xl cursor-pointer transition-colors ${starValue <= rating ? 'text-yellow-500' : 'text-gray-400'}`} onClick={()=>handleRating(starValue)}>
                    &#9733;
                </span>
            )
        })}
    </div>
  )
}

export default Rating
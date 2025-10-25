import React from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
const SearchBar = ({data}) => {
    const navigate = useNavigate()
    const [input,setInput] = useState(data ? data: '')
    const onSearchHandle = (e) => {
        e.preventDefault()
        navigate(`/courses/${input}`)
    }
  return (
        <form onSubmit={onSearchHandle} action="" className='max-w-xl md:h-14 h-12 bg-white border border-gray-500/20 rounded flex items-center justify-center w-full'>
            <img src={assets.search_icon} alt="" className='md:w-auto w-10 px-3 ' />
            <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Search for courses' className='w-full h-full outline-none text-gray-500/80' />
            <button type='submit' className='bg-blue-600 rounded text-white md:px-10 px-7 md:py-3 py-2 mx-1'>Search</button>
        </form>
  )
}

export default SearchBar
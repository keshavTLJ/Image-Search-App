import React, {useEffect, useRef, useState} from 'react';
import { IoSearch } from "react-icons/io5";

export const SearchField = ({ searchItem, setSearchItem }) => {
    
  const [text, setText] = useState('');
  const inputRef = useRef();

  function onSubmit(e) {
    e.preventDefault();
    setSearchItem(text);
    inputRef.current.blur();
  }

  function handleKeyup(e) {
    if(e.key === "Escape") {
      e.preventDefault();
      e.target.blur();
    }
  }

  useEffect(() => {
    if(searchItem === '')
      setText('');
  }, [searchItem])
  
  return (
    <form className="basis-3/5 md:basis-1/3 max-w-md flex-initial" onSubmit={onSubmit}> 
      <div className="relative mx-auto my-5 md:my-4 mt-3">
        <input 
          ref={inputRef}
          value={text}
          onKeyDown={handleKeyup} 
          type="search" 
          id="default-search" 
          className="block w-full p-2 pl-4 md:p-3 md:pl-6 text-sm rounded-full bg-[#e1ecff] placeholder:text-gray-500 text-black outline-none" 
          placeholder="Search Images . . ." 
          onChange={(e) => setText(e.target.value)}
          ></input>
        <button 
          type="submit" 
          className="absolute right-[5px] md:right-1.5 bottom-[0.25rem] md:bottom-[0.35rem] bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full w-1/4 text-white text-[10px] md:text-sm px-4 py-[0.4rem] dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex justify-center"
        >
          <span>Search</span>
        </button>
      </div>
    </form>
  )
}

export default SearchField;
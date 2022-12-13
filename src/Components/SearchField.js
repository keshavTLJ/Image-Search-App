import React,{useState} from 'react'

export const SearchField = ({ searchText }) => {
    const [text, setText] = useState('');

    function onSubmit(e) {
        e.preventDefault();
        searchText(text);
    }

  return (
    <form onSubmit={onSubmit}>   
    <div className="relative w-1/3 mx-auto my-4">
        <input type="search" id="default-search" className="block w-full p-3 pl-10 text-sm rounded-lg bg-gray-700 placeholder-gray-400 text-white outline-none" placeholder="Search Images . . ." onChange={(e) => setText(e.target.value)}></input>
        <button type="submit" className="text-white absolute right-2.5 bottom-[0.5rem] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-[0.3rem] dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</form>
  )
}
 export default SearchField;
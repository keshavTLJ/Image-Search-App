import React,{ useState, useEffect } from 'react';
import ImageCard from './Components/ImageCard';
import SearchField from './Components/SearchField';
import axios from 'axios';
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { FaCircleArrowUp } from "react-icons/fa6";
import pixora_logo from './images/pixora_logo.webp'
import pixora_logo_light from './images/pixora_logo_light.webp'

function App() {

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchItem, setSearchItem] = useState('');
  // const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [displayImage, setDisplayImage] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'white');
  const [showScrollToTop, setShowScrollToTop] = useState(true);

  const fetchImages = async (pageNum, shouldAppend = true) => {
    if(pageNum === 1)
      setIsLoading(true);
    else
      setIsMoreLoading(true);

    try {
      const url = `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${searchItem}&image_type=photo&per_page=28&page=${pageNum}`;
      const res = await axios.get(url);
      if(shouldAppend)
        setImages(prevImages => [...prevImages, ...res.data.hits]);
      else
        setImages(res?.data?.hits);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
      setIsMoreLoading(false);
    }
  }

  useEffect(() => {
    if(page > 1)
      fetchImages(page, true);
  }, [page])

  useEffect(() => {
    // setImages([]);
    setPage(1);
    fetchImages(1, false);
  }, [searchItem])
  
  useEffect(() => {
    const htmlElement = window.document.documentElement;

    if(theme === 'white')
      htmlElement.style.setProperty('background-color', 'white');
    else
      htmlElement.style.setProperty('background-color', ' black');
    
      htmlElement.style.transition = 'background-color 0.5s';

    localStorage.setItem('theme', theme)
  }, [theme])

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const rowHeight = 300;  //each row is 150px tall
  //     const scrollPosition = window.scrollY;
  //     setShowScrollToTop(scrollPosition > rowHeight);
  //   }
  
  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   }
  // }, [])
  

  function display(id, image) {
    setDisplayImage(image);
    document.getElementById("modal").classList.remove('hidden');
    document.getElementById("modal").classList.add('flex');
    document.body.classList.add("overflow-hidden");
  }

  function closeModal() {
    document.getElementById("modal").classList.remove('flex');
    document.getElementById("modal").classList.add('hidden');
    document.body.classList.remove("overflow-hidden");
    setDisplayImage(null);
  }

  function handleScroll() {
    const rowHeight = 300;  //each row is 150px tall
    const scrollPosition = window.scrollY;
    setShowScrollToTop(scrollPosition > rowHeight);

    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const clientHeight = document.documentElement.clientHeight;

    const remainingScroll = scrollHeight - (scrollTop + clientHeight);
    console.log(remainingScroll)
    
    if(remainingScroll < 100 && !isMoreLoading) {
      setIsMoreLoading(true);
      setTimeout(() => {
        setPage(page => page + 1)
      }, 1000);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [isMoreLoading, page]);

  const toggleTheme = () => {
    setTheme(theme === 'white' || null ? 'black' : 'white');
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="container mx-auto over">
      <header className={`z-10 fixed top-0 left-0 right-0 h-18 flex md:justify-between md:items-center space-x-5 w-full px-2 md:px-8 ${theme==='black' ? 'bg-black' : 'bg-white'} `}>
        <h1 className='cursor-pointer mt-6 md:mt-0' onClick={() => {setSearchItem(''); scrollToTop()}}>
          <img src={theme==='black' ? pixora_logo : pixora_logo} alt='pixora logo' className='w-20 md:w-40' />
        </h1>
        <SearchField searchItem={searchItem} setSearchItem={setSearchItem} />
        <button className="group relative bottom-1 md:top-0" onClick={toggleTheme}>
          <span className="">
            {theme === 'black' ? 
            <MdOutlineLightMode title='Light Mode' color='white' className="text-[1.4rem] md:text-[1.8rem]"/> 
            : 
            <MdOutlineDarkMode title='Dark Mode' className="text-[1.4rem] md:text-[1.8rem]" />
            }
          </span>
          <span className={`absolute invisible w-24 p-2 ${theme === 'white' ? 'text-white' : 'text-black'} ${theme === 'white' ? 'bg-black' : 'bg-white'} text-sm rounded py-1 group-hover:visible right-10 -top-1`}>{theme === 'white' ? 'Switch to Dark Theme' : 'Switch to Light Theme'}</span>
        </button>
      </header>

      {(!isLoading && images?.length === 0) && <h3 className={`text-4xl mx-auto text-center mt-32  ${theme === 'white' ? 'text-black' : 'text-white'}`}>No Images Found</h3>}

      {isLoading ? 
        <div className={`${theme === 'white' ? 'text-black' : 'text-white'} text-2xl md:text-4xl mx-auto text-center mt-32`}>Loading ...</div> 
         : 
        <>
         <main className='columns-1 sm:columns-2 lg:columns-4 py-10 md:py-20 gap-4 mt-14 px-4'>
           {(!isLoading && images.length > 0) 
              && images.map((image, index) => 
              <ImageCard 
                key={index} 
                display={display}
                image={image} 
              />
            )}
         </main>
  
         {isMoreLoading &&
          <div className='flex justify-center items-start h-52'>
            <div 
              // onClick={() => setPage(page => page + 1) } 
              className="mt-4 h-10 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-md text-lg px-4 py-[0.3rem]">
                Loading...
            </div>
          </div>}
        </>
      }
      
      {/* Image Modal */}
      <div id='modal' className='hidden fixed inset-0 z-50 w-screen h-screen bg-black/80 justify-center items-center'>
        <div className='relative inline-block'>
          <img
            src={displayImage?.fullHDURL}
            alt=""
            id='modal-img'
            className='max-w-[350px] max-h-[262.5px] md:min-w-[800px] md:min-h-[600px] object-contain'
          />
          {/* close btn */}
          <button
            className="absolute -top-11 -right-2 md:top-0 md:-right-14 text-white text-5xl font-bold"
            onClick={closeModal}
          >
            &times;
          </button>
        </div>
      </div>

      {showScrollToTop && 
      <button className="fixed bottom-6 right-6 md:bottom-16 md:right-16 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg" 
      onClick={scrollToTop}>
        <FaCircleArrowUp size={24} />
      </button>}
    </div>
  );
}

export default App;

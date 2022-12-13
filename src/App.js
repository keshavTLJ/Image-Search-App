import React,{ useState,useEffect } from 'react';
import ImageCard from './Components/ImageCard';
import SearchField from './Components/SearchField';
import axios from 'axios';

function App() {

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchItem, setSearchItem] = useState('');
  const [page, setPage] = useState(1);
  const [displayImageURL, setDisplayImageURL] = useState('');

  const PIXABAY_API_KEY = '32020031-555daf400e68a5e417fa3825e';

  useEffect(() => {
    axios.get(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${searchItem}&image_type=photo&per_page=28&page=${page}`)
     .then(res => { 
      setImages(res.data.hits);
      setIsLoading(false)})
     .catch(err => console.log(err))

     window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

  }, [searchItem, page])

  function display(id, url) {
    setDisplayImageURL(url);
    console.log(displayImageURL)
    document.getElementById("modal").classList.remove('hidden')
  }
  
  return (
    <div className='container mx-auto'>
      <SearchField searchText={(text) => setSearchItem(text)} />

      {!isLoading && (images.length === 0) && <h3 className="text-4xl mx-auto text-center mt-32">No Images Found :(</h3>}

      {
      isLoading ? <h3 className="text-5xl mx-auto text-center mt-32">Loading ...</h3> : <>
      <div className='grid grid-cols-4 gap-4'>
        {images.map((image, index) => <ImageCard display={display} wait={3000} key={index} image={image} />)}
      </div>

      {images.length && <div className='flex justify-center'>
        <button onClick={() => setPage(page => page+1)} className="my-4 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-md text-lg px-4 py-[0.3rem] ">More...</button>
      </div>}
      </>
      }

      <div id='modal' className='hidden fixed top-0 left-0 z-80 w-screen h-screen bg-black/80 flex justify-center items-center'>
        <img src={displayImageURL} alt="" id='modal-img' className='max-w-[800px] max-h-[600px] object-cover' />

        <a className="fixed z-90 top-6 right-16 text-white text-5xl font-bold" href="javascript:void(0)" onClick={() => document.getElementById("modal").classList.add('hidden')}>&times;</a>
      </div>
    </div>
  );
}

export default App;

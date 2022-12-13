import React from 'react'
{/* <div>
        <h3 className='font-bold text-gray-500 text-center py-1 text-sm '>photo by {image.user}</h3>
        <ul className='pl-2'>
            <li className="li"><strong>Views: </strong>{image.views}</li>
            <li className="li"><strong>Likes: </strong>{image.likes}</li>
            <li className="li"><strong>Downloads: </strong>{image.downloads}</li>
        </ul>
        </div>
        <div className='py-4 flex flex-row justify-center'>
            {tags.map((tag,index) => <span key={index} className="inline-block bg-gray-200 rounded-xl px-3 py-1 text-xs font-semibold text-gray-700 mr-2">{tag}</span>
            )}
        </div> */}
const ImageCard = ({ image,display}) => {

    const tags = image.tags.split(',');
    
  return (
    <div className="max-w-md rounded overflow-hidden shadow-md h-max cursor-pointer" onClick={() => display(image.id, image.largeImageURL)}>
        <img src={image.largeImageURL} alt="" className= 'w-full'/>
        
    </div>
  )
}

export default ImageCard
import { useEffect, useState, useRef } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import SearchBar from '../SearchBar/SearchBar';
import getPhotos from '../../services/fetchUnsplash';
import ImageModal from '../ImageModal/ImageModal';
import s from './App.module.css';
import useToggle from '../../hooks/modalVisibility';

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [images, setImages] = useState([]);

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isOpenModal, toggleModal] = useToggle(false);
  const [modalData, setModalData] = useState({
    url: '',
    alt: '',
    description: '',
    instagram: '',
    location: '',
  });

  const endOfGalleryRef = useRef(null);

   useEffect(() => {
  if (!isLoading && endOfGalleryRef.current) {
    const timeoutId = setTimeout(() => {
      endOfGalleryRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }
}, [images, isLoading]);

  useEffect(() => {
    const fetchImages = async () => {
       if (!query) return;

      try {
        setIsLoading(true);
        setIsError(false);

        const { results, total_pages} = await getPhotos(query, page);

        setImages(prev => page === 1 ? results : [...prev, ...results]);
        console.log(results);
        setTotalPages(total_pages);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [query, page]);

  const handleSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);    
  };

  const handleOpenModal = (url, alt, description, instagram, location) => {
    toggleModal();
    setModalData({
      url,
      alt,
      description,
      instagram,
      location,
    });
  };

  const handleCloseModal = () => {
    toggleModal();
    setModalData({
      url: '',
      alt: '',
      description: '',
      instagram: '',
      location: '',
    });
  };

  useEffect(() => {
    if (isError !== false) {
      const id = setTimeout(() => {
        setIsError(false);
      }, 1000);
      return () => {
        clearTimeout(id);
      };
    }
  }, [isError]);

  return (
    <div className={s.container}>
      <SearchBar setQuery={handleSubmit} />      
        <ImageGallery images={images} handleOpenModal={handleOpenModal} />     

      {isLoading && <Loader />}

      {totalPages > page && !isError && !isLoading && (
      <LoadMoreBtn onClick={() => setPage(prev => prev + 1)} />
      )}

      <div ref={endOfGalleryRef}></div>
      
      {isError && <ErrorMessage />}

      <ImageModal
        isOpen={isOpenModal}
        handleCloseModal={handleCloseModal}
        modalData={modalData}
      />
    </div>
  );
}

export default App;

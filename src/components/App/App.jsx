import { useEffect, useRef, useState } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import SearchBar from '../SearchBar/SearchBar';
import { getPhotos } from '../../js/requestUnsplash';
import ImageModal from '../ImageModal/ImageModal';
import s from './App.module.css';
import useToggle from '../../hooks/modalVisibility';

function App() {
  const [page, setPage] = useState(1);
  const [searchSwitch, setSearchSwitch] = useState(true);
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');  
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);  
  const [modalUrl, setModalUrl] = useState('');
  const [alt, setAlt] = useState('');
  const [description, setDescription] = useState('');

  const [isOpenModalMenu, toggleModalMenu] = useToggle(false);  

  const endOfGalleryRef = useRef(null);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      
      try {
        if (query === '') {
          setLoading(false);
          return;
        }
        const { results, total } = await getPhotos(query, page);
        if (!results.length) {         
          setIsVisible(false);
          return;
        }
        setImages(prevImages => [...prevImages, ...results]);
        setIsVisible(page < Math.ceil(total / results.length));        
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [page, searchSwitch]);

  useEffect(() => {
  if (!loading && endOfGalleryRef.current) {
    setTimeout(() => {
      endOfGalleryRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 100); // Затримка у 100 мілісекунд
  }
}, [images, loading]);

  const handleSubmit = value => {    
    setSearchSwitch(!searchSwitch);
    setQuery(value);
    setImages([]);   
    setIsVisible(false);
    setPage(1);
  };

  const handleChange = value => {
    setQuery(value);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = (url, alt, description) => {
    toggleModalMenu();
    setAlt(alt);
    setDescription(description)
    setModalUrl(url);
  };

  const closeModal = () => {
    toggleModalMenu();
    setAlt('');
    setDescription('')
    setModalUrl('');
  };

  useEffect(() => {
    if (error !== null) {    
      const id = setTimeout(() => {     
        setError(null);
      }, 1000);
      return () => {      
        clearTimeout(id);
      };
    }
  }, [error]);

  return (
    <div className={s.container}>
      <SearchBar submit={handleSubmit} input={handleChange} query={query} />
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      
      {loading && <Loader />}
      {isVisible && (
        <LoadMoreBtn onClick={loadMore} disabled={loading} text={loading ? 'Loading' : 'Load more'} />
      )}
      <div ref={endOfGalleryRef}></div>
      {error && <ErrorMessage />}      
      <ImageModal
        modalIsOpen={isOpenModalMenu}
        closeModal={closeModal}
        src={modalUrl}
        alt={alt}
        description={description}
      />
    </div>
  );
}

export default App;

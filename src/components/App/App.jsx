import { useEffect, useRef, useState } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import SearchBar from '../SearchBar/SearchBar';
import { getPhotos } from '../../js/requestUnsplash';
import ImageModal from '../ImageModal/ImageModal';
import s from './App.module.css';

function App() {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState('');
  const [alt, setAlt] = useState('');

  const endOfGalleryRef = useRef(null);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const { results, total } = await getPhotos(query, page);
        if (!results.length) {
          setIsEmpty(true);
          setIsVisible(false);
          return;
        }
        console.log(results)
        setImages(prevImages => [...prevImages, ...results]);
        setIsVisible(page < Math.ceil(total / results.length));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [page]);

  useEffect(() => {
    if (endOfGalleryRef.current) {
      endOfGalleryRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [images]);

  const handleSubmit = value => {
    if (!value.trim()) {
      alert('Sorry, cant be empty');
      return;
    }
    setQuery(value);
    setImages([]);
    // setError(null);
    setIsEmpty(false);
    setIsVisible(false);
    setPage(1);
  };

  const handleChange = value => {
    setQuery(value);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = (url, alt) => {
    setShowModal(true);
    setAlt(alt);
    setModalUrl(url);
  };

  const closeModal = () => {
    setShowModal(false);
    setAlt('');
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
      <div ref={endOfGalleryRef}></div>
      {loading && <Loader />}
      {isVisible && (
        <LoadMoreBtn onClick={loadMore} disabled={loading} text={loading ? 'Loading' : 'Load more'} />
      )}
      {error && (
        <ErrorMessage/>
       )}

      {showModal && (
        <ImageModal
          modalIsOpen={showModal}
          closeModal={closeModal}
          src={modalUrl}
          alt={alt}
        />
      )}      
    </div>
  );
}

export default App;

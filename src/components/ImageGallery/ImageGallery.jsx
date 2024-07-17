import ImageCard from '../ImageCard/ImageCard';
import s from './ImageGallery.module.css';

function ImageGallery({ images, openModal }) {
  return (
    <ul className={s.ul}>
      {images.map(({ id, alt_description, description, urls }, index) => (
        <ImageCard
          key={`${id}-${urls.small}-${index}`}
          alt={alt_description}
          src={urls.small} 
          onClick={() => openModal(urls.regular, alt_description, description)}
        />
      ))}
    </ul>
  );
}

export default ImageGallery;




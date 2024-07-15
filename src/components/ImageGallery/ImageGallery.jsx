import ImageCard from '../ImageCard/ImageCard';
import s from './ImageGallery.module.css';

function ImageGallery({ images, modalIsOpen }) {
  return (
    <ul className={s.ul}>
      {images.map(({ id, alt_description, urls }, index) => (
        <ImageCard
          modalIsOpen={modalIsOpen}
          key={`${id}-${urls.small}-${index}`}
          alt={alt_description}
          src={urls.small}
        />
      ))}
    </ul>
  );
}

export default ImageGallery;

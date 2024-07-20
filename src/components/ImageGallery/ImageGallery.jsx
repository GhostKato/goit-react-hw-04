import ImageCard from '../ImageCard/ImageCard';
import s from './ImageGallery.module.css';

function ImageGallery({ images, handleOpenModal }) {
  return (
    <ul className={s.ul}>
      {images.map((image) => (
        <ImageCard key={image.id} image={image} handleOpenModal={handleOpenModal} />
      ))}
    </ul>
  );
}

export default ImageGallery;

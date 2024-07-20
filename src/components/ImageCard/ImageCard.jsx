import s from './ImageCard.module.css';

function ImageCard({ image, handleOpenModal }) {
  const { urls, alt_description, description, user } = image;

  const handleClick = () => {
    handleOpenModal(urls.regular, alt_description, description, user.instagram_username, user.location);
  };

  return (
    <li className={s.card} onClick={handleClick}>
      <img src={urls.small} alt={alt_description} className={s.img} />
    </li>
  );
}

export default ImageCard;

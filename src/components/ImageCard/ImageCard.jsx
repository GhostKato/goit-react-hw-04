import s from './ImageCard.module.css';

function ImageCard({ alt, src, onClick }) {
  const handleClick = () => {
    onClick(src, alt);
  };

  return (
    <li className={s.card} onClick={handleClick}>
      <img src={src} alt={alt} className={s.img} />
    </li>
  );
}

export default ImageCard;


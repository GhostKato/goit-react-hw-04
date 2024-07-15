import s from './ImageCard.module.css';

function ImageCard({ alt, src, modalIsOpen }) {
  return (
    <li onClick={ modalIsOpen } className={s.card}>
      <img src={src} alt={alt} className={s.img}/>
    </li>
  );
}

export default ImageCard;
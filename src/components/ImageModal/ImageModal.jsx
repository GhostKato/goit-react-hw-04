import Modal from 'react-modal';
import s from './ImageModal.module.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    border: 'none',
    overflow: 'hidden'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
};

Modal.setAppElement('#root');

const ImageModal = ({ isOpen, handleCloseModal, modalData }) => {
  const { url, alt, description, instagram, location } = modalData;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
      contentLabel='Image Modal'
    >
      <div className={s.modal}>        
        <div className={s.imgContainer}><img src={url} alt={alt} className={s.image} /></div>
        <ul className={s.list}>
          {description && (
            <li className={s.item}>
              <p className={s.pTitle}>Description :</p>
              <p className={s.p}>{description}</p>
            </li>
          )}
          {location && (
            <li className={s.item}>
              <p className={s.pTitle}>Location :</p>
              <p className={s.p}>{location}</p>            
            </li>
          )}          
          {instagram && (
            <li className={s.item}>
              <p className={s.pTitle}>Instagram :</p>
              <p className={s.p}>{instagram}</p>
            </li>
          )}          
        </ul>        
      </div>
    </Modal>
  );
};

export default ImageModal;
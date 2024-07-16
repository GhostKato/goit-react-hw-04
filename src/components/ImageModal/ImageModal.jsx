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
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
};

Modal.setAppElement('#root');

const ImageModal = ({ modalIsOpen, closeModal, src, alt }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Image Modal"
    >
      <div className={s.modal}>        
        <img src={src} alt={alt} className={s.image} />
        <p>{ alt}</p>
       
      </div>
    </Modal>
  );
};

export default ImageModal;

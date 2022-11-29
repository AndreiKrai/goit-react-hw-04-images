import PropTypes from 'prop-types';
import { useEffect } from 'react';

export const Modal = ({ togleModal, pictureData }) => {
  useEffect(() => {
    function handleEscPress(e) {
      if (e.code === 'Escape') {
        togleModal('');
      }
    }
    window.addEventListener('keydown', handleEscPress);
    return () => {
      window.removeEventListener('keydown', handleEscPress);
    };
  }, [togleModal]);

  // const memohandleEscPress = useCallback(
  //   () => {
  //     handleEscPress();
  //   },
  //   [a, b],
  // );

  return (
    <div className="Overlay" onClick={togleModal}>
      <div className="Modal">
        <img src={pictureData} alt={'qwe'} />
      </div>
    </div>
  );
};
Modal.propTypes = {
  togleModal: PropTypes.func.isRequired,
  pictureData: PropTypes.string.isRequired,
};

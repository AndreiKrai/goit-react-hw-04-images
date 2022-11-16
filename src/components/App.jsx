import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import React, { useState, useEffect } from 'react';
import { getImages } from 'helpers/api';
import { Modal } from './Modal/Modal';
import Button from './Button/Button';
import { RotatingLines } from 'react-loader-spinner';
import ApiError from './ApiError/ApiError';

export const App = () => {
  const [searchName, setSearchName] = useState('');
  const [imgFromAPI, setImgFromAPI] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState('');
  const [selectedPage, setSelectedPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function imgArray() {
      try {
        setIsLoading(true);
        const hits = await getImages(
          searchName,
          selectedPage === 0 ? 1 : selectedPage
        );
        setImgFromAPI([...imgFromAPI, ...hits]);
        setSelectedPage(1);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (searchName.length || selectedPage > 1) {
      imgArray();
    }
  }, [searchName, selectedPage]);
  const handleSearch = searchName => setSearchName(searchName);

  const togleModal = URL => {
    setIsOpenModal(!isOpenModal);
    setSelectedPicture(URL);
  };

  // const getActivePicture = () => {
  //   return imgFromAPI.find(picture => {
  //     return picture.id === selectedPicture;
  //   });
  // };

  const addMorePictures = () => {
    setSelectedPage(selectedPage + 1);
  };

  return (
    <div className="App">
      <Searchbar onSubmitSearch={handleSearch} />
      {isLoading && (
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      )}
      {isError && <ApiError />}
      {imgFromAPI && (
        <ImageGallery imgFromAPI={imgFromAPI} togleModal={togleModal} />
      )}

      {isOpenModal && (
        <Modal togleModal={togleModal} pictureData={selectedPicture} />
      )}

      {selectedPage > 0 && <Button addMorePictures={addMorePictures} />}
    </div>
  );
};

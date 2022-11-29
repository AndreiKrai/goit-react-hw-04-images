import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import React, { useState, useEffect } from 'react';
import { getImages } from 'helpers/api';
import { Modal } from './Modal/Modal';
import Button from './Button/Button';
import { RotatingLines } from 'react-loader-spinner';
import ApiError from './ApiError/ApiError';
import { useCallback } from 'react';

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
        const hits = await getImages(searchName, selectedPage);
        if (selectedPage === 1) {
          setImgFromAPI([...hits]);
        } else {
          setImgFromAPI(prev => [...prev, ...hits]);
        }
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
  const handleSearch = searchName => {
    setSearchName(searchName);
    setSelectedPage(1);
  };

  const togleModal= useCallback((URL)=>{setIsOpenModal(!isOpenModal);
    setSelectedPicture(URL);},[isOpenModal])

  // const getActivePicture = () => {
  //   return imgFromAPI.find(picture => {
  //     return picture.id === selectedPicture;
  //   });
  // };

  const addMorePictures = () => {
    setSelectedPage(prev=>prev + 1);
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

      {Boolean(imgFromAPI.length) && (
        <Button addMorePictures={addMorePictures} />
      )}
    </div>
  );
};

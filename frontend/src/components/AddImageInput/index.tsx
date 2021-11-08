import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { FiImage } from 'react-icons/fi';

import { Container } from './styles';

interface IAddImageProps {
  setSelectedImage(file: File): void;
  defaultFileName?: string;
  defaultFileURL?: string;
}

// Componente de input para adicionar imagem
const AddImageInput: React.FC<IAddImageProps> = ({
  setSelectedImage,
  defaultFileName,
  defaultFileURL,
}) => {
  const [previewURL, setPreviewURL] = useState('');

  // Caso exista um arquivo padrão, atualizar a url da imagem
  useEffect(() => {
    if(defaultFileName && defaultFileURL) {
      setPreviewURL(defaultFileURL);
    }
  }, [defaultFileName, defaultFileURL]);

  // Quando selecionar um arquivo, salvar a url de preview da imagem
  const handleSelectImage = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files) {
      // Recuperando a imagem selecionada
      const fileSelected = e.target.files[0];

      if(fileSelected) {
        setSelectedImage(fileSelected);

        setPreviewURL(URL.createObjectURL(fileSelected));
      }
    }
  }, [setSelectedImage]);

  return (
    <Container previewURL={previewURL}>
      <label htmlFor="file-input">
        <FiImage
          color="#ffffff"
          size={65}
        />
        <input
          id="file-input"
          type="file"
          onChange={handleSelectImage}
        />
      </label>
    </Container>
  );
}

export default AddImageInput;

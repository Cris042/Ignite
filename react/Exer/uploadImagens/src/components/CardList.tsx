import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // MODAL USEDISCLOSURE
  const modal = useDisclosure();

  // SELECTED IMAGE URL STATE
  const [url, setUrl] = useState('');

  // FUNCTION HANDLE VIEW IMAGE
  function openImageModal(imageUrl: string): void {
    setUrl(imageUrl);
    modal.onOpen();
  }

  return (
    <>
      <SimpleGrid columns={[2, 2, 2, 3]} spacing="40px">
        {cards.map(image => (
          <Card key={image.id} data={image} viewImage={openImageModal} />
        ))}
      </SimpleGrid>
      {/* CARD GRID */}

      <ModalViewImage
        isOpen={modal.isOpen}
        onClose={modal.onClose}
        imgUrl={url}
      />
    </>
  );
}

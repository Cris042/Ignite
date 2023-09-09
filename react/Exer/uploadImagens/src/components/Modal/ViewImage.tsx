import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bgColor="pGray.800">
        <Image
          alt="Image"
          objectFit="contain"
          maxW="900px"
          maxH="600px"
          src={imgUrl}
        />
        <Link href={imgUrl} isExternal size="xs" margin="2">
          Abrir original
        </Link>
      </ModalContent>
    </Modal>
  );
}

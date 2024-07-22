import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';

function DeleteDialog({ handleDelete, children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  return (
    <>
      <Box boxSize='full' onClick={onOpen}>
        {children}
      </Box>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Xoá</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>Bạn có muốn xoá không ?</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Huỷ
            </Button>
            <Button colorScheme='red' ml={3} onClick={handleDelete}>
              Xoá
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
export default DeleteDialog;

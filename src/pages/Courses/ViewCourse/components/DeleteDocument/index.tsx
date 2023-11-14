import {
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { useCourses } from '../../../../../hooks/courses'
import { useState } from 'react'
import { Button } from '../../../../../components/Button'
import { Trash } from '@phosphor-icons/react'

interface DeleteDocumentProps {
  documentId: string | undefined
  courseId: string | undefined
  documentTitle: string
}

export function DeleteDocument({
  documentId,
  documentTitle,
  courseId,
}: DeleteDocumentProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { removeDocument } = useCourses()
  const isLg = useBreakpointValue({ base: false, sm: false, lg: true })

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)
    await removeDocument({ id: courseId, documentId })
    setIsLoading(false)
    onClose()
  }

  return (
    <>
      <IconButton
        aria-label="Deletar documento"
        icon={<Trash size={16} color="#F56565" weight="regular" />}
        position="absolute"
        top={2}
        right={2}
        bgColor="transparent"
        size="xs"
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered={!isLg}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deletar documento</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={16}>
              Você tem certeza que deseja deletar este documento?
            </Text>
            <Flex alignItems="center" mt={2} gap={2}>
              <Text
                fontSize={14}
                fontWeight="bold"
                color="gray.700"
                letterSpacing={0.7}
              >
                TÍTULO:
              </Text>
              <Text fontSize={16}>{documentTitle}</Text>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              bgVariant="danger"
              text="Deletar"
              mr={4}
              onClick={handleSubmit}
              isLoading={isLoading}
            />
            <Button bgVariant="ghost" text="Cancelar" onClick={onClose} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

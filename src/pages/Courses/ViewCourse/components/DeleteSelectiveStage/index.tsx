import {
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
import { IconButton } from '../../../../../components/IconButton'

export function DeleteSelectiveStage({
  stageId,
  courseId,
}: {
  stageId: string | undefined
  courseId: string | undefined
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { removeSelectiveStage } = useCourses()
  const isLg = useBreakpointValue({ base: false, sm: false, lg: true })

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)
    await removeSelectiveStage({ id: courseId, stageId })
    setIsLoading(false)
    onClose()
  }

  return (
    <>
      {isLg ? (
        <Button
          bgVariant="danger"
          text="Deletar"
          size="xs"
          leftIcon={<Trash size={14} color="#F7FAFC" weight="regular" />}
          onClick={onOpen}
        />
      ) : (
        <IconButton
          bgVariant="danger"
          icon={<Trash size={14} color="#F7FAFC" weight="regular" />}
          aria-label="Deletar"
          size="xs"
          onClick={onOpen}
        />
      )}

      <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered={!isLg}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deletar etapa</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={16}>
              Você tem certeza que deseja deletar esta etapa do processo
              seletivo?
            </Text>
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

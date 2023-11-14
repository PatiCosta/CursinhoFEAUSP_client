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
import { Button } from '../../../../../components/Button'
import { PencilSimpleLine } from '@phosphor-icons/react'
import { useCourses } from '../../../../../hooks/courses'
import { useState } from 'react'
import { IconButton } from '../../../../../components/IconButton'

interface UpdateClassStatusProps {
  courseId: string | undefined
  courseStatus: 'active' | 'inactive' | undefined
}

export function UpdateClassStatus({
  courseId,
  courseStatus,
}: UpdateClassStatusProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { update } = useCourses()
  const isLg = useBreakpointValue({ base: false, sm: false, lg: true })

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    const data = Object.assign({
      status: courseStatus === 'active' ? 'inactive' : 'active',
    })

    setIsLoading(true)
    await update({ id: courseId, data })
    setIsLoading(false)
    onClose()
  }

  return (
    <>
      {isLg ? (
        <Button
          bgVariant={courseStatus === 'active' ? 'danger' : 'green'}
          text={courseStatus === 'active' ? 'Desabilitar' : 'Habilitar'}
          leftIcon={
            <PencilSimpleLine size={24} color="#F7FAFC" weight="regular" />
          }
          onClick={onOpen}
        />
      ) : (
        <IconButton
          bgVariant={courseStatus === 'active' ? 'danger' : 'green'}
          icon={<PencilSimpleLine size={24} color="#F7FAFC" weight="regular" />}
          aria-label={courseStatus === 'active' ? 'Desabilitar' : 'Habilitar'}
          onClick={onOpen}
        />
      )}

      <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered={!isLg}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {courseStatus === 'active' ? 'Inativar' : 'Ativar'} turma
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={16}>
              {courseStatus === 'active'
                ? 'Você tem certeza que deseja inativar esta turma? Ela não irá aparecer no site para novos inscritos.'
                : 'Você tem certeza que deseja ativar esta turma? Ela irá aparecer no site para novos inscritos.'}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              bgVariant={courseStatus === 'active' ? 'danger' : 'green'}
              text={courseStatus === 'active' ? 'Desabilitar' : 'Habilitar'}
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

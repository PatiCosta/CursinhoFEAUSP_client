import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { Plus } from '@phosphor-icons/react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useCallback } from 'react'
import { useCourses } from '../../../../../hooks/courses'
import { Button } from '../../../../../components/Button'
import { Input } from '../../../../../components/Input'
import { IconButton } from '../../../../../components/IconButton'

const createDocumentFormSchema = Yup.object().shape({
  title: Yup.string().required('O título do documento é obrigatório'),
  downloadLink: Yup.string().required('O link para o documento é obrigatório'),
})

type FormValues = {
  title: string
  downloadLink: string
}

export function CreateDocument({
  courseId,
  courseTitle,
}: {
  courseId: string | undefined
  courseTitle: string
}) {
  const { addDocument } = useCourses()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const isLg = useBreakpointValue({ base: false, sm: false, lg: true })

  const { register, formState, handleSubmit, reset } = useForm<FormValues>({
    resolver: yupResolver(createDocumentFormSchema),
  })

  const { errors } = formState

  const handleCreateDocument = useCallback(
    async (data: FormValues) => {
      const formData = Object.assign({
        title: data.title,
        downloadLink: data.downloadLink,
      })

      await addDocument({ id: courseId, data: formData })
      reset({
        title: '',
        downloadLink: '',
      })
      onClose()
    },
    [addDocument, onClose, courseId, reset],
  )

  return (
    <>
      {isLg ? (
        <Button
          bgVariant="green"
          text="Adicionar documento"
          leftIcon={<Plus size={24} color="#F7FAFC" weight="regular" />}
          onClick={onOpen}
        />
      ) : (
        <IconButton
          bgVariant="green"
          icon={<Plus size={12} color="#F7FAFC" weight="regular" />}
          aria-label="Adicionar documento"
          onClick={onOpen}
          style={{ flexShrink: '0' }}
        />
      )}

      <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered={!isLg}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(handleCreateDocument)}>
          <ModalHeader>Adicionar documento</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={16}>
              Você está adicionando um documento à {courseTitle}!
            </Text>
            <VStack w="100%" spacing={4} pt={8}>
              <Input
                placeholder="Título"
                {...register('title')}
                error={errors.title}
              />
              <Input
                placeholder="Link para acessar o documento"
                {...register('downloadLink')}
                error={errors.downloadLink}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              bgVariant="green"
              text="Salvar"
              mr={4}
              type="submit"
              isLoading={formState.isSubmitting}
            />
            <Button bgVariant="ghost" text="Cancelar" onClick={onClose} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

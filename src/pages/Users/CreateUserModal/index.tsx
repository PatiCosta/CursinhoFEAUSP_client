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
import { Button } from '../../../components/Button'
import { UserPlus } from '@phosphor-icons/react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useCallback } from 'react'
import { Input } from '../../../components/Input'
import { PasswordInput } from '../../../components/PasswordInput'
import { useUsers } from '../../../hooks/users'
import { IconButton } from '../../../components/IconButton'

const createUserFormSchema = Yup.object().shape({
  username: Yup.string().required('O username é obrigatório'),
  name: Yup.string().required('O nome é obrigatório'),
  password: Yup.string()
    .required('A senha é obrigatória')
    .min(8, 'A senha deve ter pelo menos 8 dígitos')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
    ),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password
      ? field
          .required('A confirmação da senha é obrigatória')
          .oneOf(
            [Yup.ref('password')],
            'A confirmação e a senha não estão iguais',
          )
      : field,
  ),
})

type FormValues = {
  username: string
  name: string
  password: string
  confirmPassword: string | undefined
}

export function CreateUserModal() {
  const { create } = useUsers()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const isLg = useBreakpointValue({ base: false, sm: false, lg: true })

  const { register, formState, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(createUserFormSchema),
  })

  const { errors } = formState

  const handleCreateUser = useCallback(
    async (data: FormValues) => {
      const formData = Object.assign({
        username: data.username,
        name: data.name,
        password: data.password,
      })

      await create(formData)
      onClose()
    },
    [create, onClose],
  )

  return (
    <>
      {isLg ? (
        <Button
          onClick={onOpen}
          bgVariant="green"
          text="Adicionar usuário"
          leftIcon={<UserPlus size={24} color="#F7FAFC" weight="regular" />}
        />
      ) : (
        <IconButton
          bgVariant="green"
          icon={
            <UserPlus
              size={16}
              color="#F7FAFC"
              weight="regular"
              style={{ flexShrink: '0' }}
            />
          }
          aria-label="Adicionar usuário"
          onClick={onOpen}
        />
      )}

      <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered={!isLg}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(handleCreateUser)}>
          <ModalHeader>Criar usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={16}>
              Você está criando um novo administrador para o sistema!
            </Text>
            <VStack w="100%" spacing={4} pt={8}>
              <Input
                placeholder="Nome"
                {...register('name')}
                error={errors.name}
              />
              <Input
                placeholder="Username"
                {...register('username')}
                error={errors.username}
              />
              <PasswordInput
                placeholder="Senha"
                {...register('password')}
                error={errors.password}
              />
              <PasswordInput
                placeholder="Confirmar Senha"
                {...register('confirmPassword')}
                error={errors.confirmPassword}
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

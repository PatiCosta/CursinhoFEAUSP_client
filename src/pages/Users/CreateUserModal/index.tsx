import {
  Box,
  Flex,
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
  ).optional(),
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
    resolver: yupResolver(createUserFormSchema) as any,
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
        <ModalOverlay backdropFilter="blur(2px)" />
        <ModalContent
          as="form"
          onSubmit={handleSubmit(handleCreateUser)}
          borderTop="4px solid"
          borderTopColor="brand.blue"
          borderTopRadius="xl"
        >
          <ModalHeader pb={2}>
            <Flex align="center" gap={3}>
              <Box bg="brand.blueLight" p={2} borderRadius="md">
                <UserPlus size={20} color="#2a255a" weight="duotone" />
              </Box>
              <Box>
                <Text fontSize="lg" fontWeight="bold" color="brand.blue">Criar usuário</Text>
                <Text fontSize="sm" fontWeight="normal" color="gray.500">Novo administrador do sistema</Text>
              </Box>
            </Flex>
          </ModalHeader>
          <ModalCloseButton mt={2} />
          <ModalBody>
            <VStack w="100%" spacing={4}>
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

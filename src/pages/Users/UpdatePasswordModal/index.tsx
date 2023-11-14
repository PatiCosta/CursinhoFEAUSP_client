import {
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
import { LockKeyOpen } from '@phosphor-icons/react'
import { useCallback } from 'react'

import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { Button } from '../../../components/Button'
import { PasswordInput } from '../../../components/PasswordInput'
import { useUsers } from '../../../hooks/users'

import { User } from '../../../interfaces/User.interface'

const updatePasswordFormSchema = Yup.object().shape({
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
  password: string
  confirmPassword: string | undefined
}

export function UpdatePasswordModal({ user }: { user: User }) {
  const { updatePassword } = useUsers()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const isLg = useBreakpointValue({ base: false, sm: false, lg: true })

  const { register, formState, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(updatePasswordFormSchema),
  })

  const { errors } = formState

  const handleUpdatePassword = useCallback(
    async (data: FormValues) => {
      const formData = Object.assign({
        password: data.password,
      })
      await updatePassword({ password: formData, id: user.id })
      onClose()
    },
    [updatePassword, onClose, user.id],
  )

  return (
    <>
      <Flex
        gap={{ base: 0, lg: 2 }}
        cursor="pointer"
        fontSize="sm"
        onClick={onOpen}
        alignItems="center"
      >
        <LockKeyOpen size={isLg ? 20 : 16} color="#2b6cb0" weight="light" />
        <Text color="blue.600" display={{ base: 'none', lg: 'inline-block' }}>
          Alterar senha
        </Text>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered={!isLg}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(handleUpdatePassword)}>
          <ModalHeader>Alterar senha</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={16}>Você está alterando a senha do usuário:</Text>
            <Flex alignItems="center" mt={2} gap={2}>
              <Text
                fontSize={14}
                fontWeight="bold"
                color="gray.700"
                letterSpacing={0.7}
              >
                NOME:
              </Text>
              <Text fontSize={16}>{user.name}</Text>
            </Flex>
            <Flex alignItems="center" mt={2} gap={2}>
              <Text
                fontSize={14}
                fontWeight="bold"
                color="gray.700"
                letterSpacing={0.7}
              >
                USERNAME:
              </Text>
              <Text fontSize={16}>{user.username}</Text>
            </Flex>
            <VStack w="100%" spacing={4} pt={8}>
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
              bgVariant="blue"
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

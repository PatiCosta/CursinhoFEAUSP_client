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
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { Trash } from '@phosphor-icons/react'
import { useUsers } from '../../../hooks/users'
import { Button } from '../../../components/Button'
import { User } from '../../../interfaces/User.interface'
import { useState } from 'react'

export function DeleteUserModal({ user }: { user: User }) {
  const { handleDelete } = useUsers()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)
  const isLg = useBreakpointValue({ base: false, sm: false, lg: true })

  const handleSubmit = async () => {
    setIsLoading(true)
    await handleDelete(user.id)
    setIsLoading(false)
    onClose()
  }

  return (
    <>
      <Flex
        gap={{ base: 0, lg: 2 }}
        cursor="pointer"
        fontSize="sm"
        onClick={onOpen}
        alignItems="center"
      >
        <Trash size={isLg ? 20 : 16} color="#f56565" weight="light" />
        <Text color="red.400" display={{ base: 'none', lg: 'inline-block' }}>
          Deletar
        </Text>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered={!isLg}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deletar usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={16}>
              Você tem certeza que deseja deletar este usuário?
            </Text>
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

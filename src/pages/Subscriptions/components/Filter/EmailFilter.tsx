import {
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Button } from '../../../../components/Button'
import { Input } from '../../../../components/Input'
import { HandleAddFilter } from '.'

interface EmailFilterProps {
  handleAddFilter: HandleAddFilter
  isDisabled: boolean
}

export function EmailFilter({ handleAddFilter, isDisabled }: EmailFilterProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [value, setValue] = useState('')

  return (
    <>
      <MenuItem onClick={onOpen} isDisabled={isDisabled}>
        E-mail
      </MenuItem>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Adicionar filtro</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              error={undefined}
              name="email"
              placeholder="E-mail do doador"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="email"
            />
          </ModalBody>
          <ModalFooter>
            <Button
              bgVariant="ghost"
              text="Voltar"
              onClick={() => {
                onClose()
              }}
              mr={4}
            />
            <Button
              bgVariant="green"
              text="Adicionar"
              onClick={() => {
                onClose()
                handleAddFilter({ key: 'email', value })
              }}
              isDisabled={value.length <= 3}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

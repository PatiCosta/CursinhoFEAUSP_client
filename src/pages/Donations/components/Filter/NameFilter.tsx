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

interface NameFilterProps {
  handleAddFilter: HandleAddFilter
  isDisabled: boolean
}

export function NameFilter({ handleAddFilter, isDisabled }: NameFilterProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [value, setValue] = useState('')

  return (
    <>
      <MenuItem onClick={onOpen} isDisabled={isDisabled}>
        Nome
      </MenuItem>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Adicionar filtro</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              error={undefined}
              name="name"
              placeholder="Nome do doador"
              value={value}
              onChange={(e) => setValue(e.target.value)}
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
                handleAddFilter({ key: 'name', value })
              }}
              isDisabled={value.length <= 3}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

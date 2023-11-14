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
import { formatCPF, parseCPF } from '../../../../utils/cpfUtils'

interface CpfFilterProps {
  handleAddFilter: HandleAddFilter
  isDisabled: boolean
}

export function CpfFilter({ handleAddFilter, isDisabled }: CpfFilterProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [value, setValue] = useState('')

  return (
    <>
      <MenuItem onClick={onOpen} isDisabled={isDisabled}>
        CPF
      </MenuItem>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Adicionar filtro</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              error={undefined}
              name="cpf"
              placeholder="CPF do doador"
              value={formatCPF(value)}
              onChange={(e) => setValue(parseCPF(e.target.value))}
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
                handleAddFilter({ key: 'cpf', value })
              }}
              isDisabled={value.length <= 3}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

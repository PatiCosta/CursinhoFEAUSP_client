import {
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Button } from '../../../../components/Button'
import { HandleAddFilter } from '.'

interface PaymentStatusFilterProps {
  handleAddFilter: HandleAddFilter
  isDisabled: boolean
}

export function PaymentStatusFilter({
  handleAddFilter,
  isDisabled,
}: PaymentStatusFilterProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [value, setValue] = useState('')

  return (
    <>
      <MenuItem onClick={onOpen} isDisabled={isDisabled}>
        Status do pagamento
      </MenuItem>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Adicionar filtro</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text
              fontSize={12}
              color="gray.500"
              fontWeight="light"
              letterSpacing={0.5}
              mb={-1}
            >
              Status do pagamento
            </Text>
            <RadioGroup
              onChange={(value) => {
                setValue(value)
              }}
              value={value}
              mt={4}
            >
              <Stack direction={{ base: 'column', sm: 'column', lg: 'row' }}>
                <Radio value="active">Confirmado</Radio>
                <Radio value="canceled">Cancelado</Radio>
                <Radio value="Sem informação ainda">Sem informação ainda</Radio>
              </Stack>
            </RadioGroup>
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
                handleAddFilter({ key: 'paymentStatus', value })
              }}
              isDisabled={value === ''}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

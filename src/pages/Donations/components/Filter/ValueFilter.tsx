import {
  Flex,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Button } from '../../../../components/Button'
import { CurrencyInput } from '../../../../components/CurrencyInput'

interface ValueFilterProps {
  handleAddFilter: ({
    initValue,
    endValue,
  }: {
    initValue: string
    endValue: string
  }) => void
  isDisabled: boolean
}

export function ValueFilter({ handleAddFilter, isDisabled }: ValueFilterProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [initValue, setInitValue] = useState('')
  const [endValue, setEndValue] = useState('')

  return (
    <>
      <MenuItem onClick={onOpen} isDisabled={isDisabled}>
        Valor da doação
      </MenuItem>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar filtro</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text
              textTransform="uppercase"
              fontWeight="bold"
              fontSize={14}
              letterSpacing=".5px"
              mb={4}
            >
              Valor da doação
            </Text>
            <Flex
              alignItems="center"
              w="100%"
              direction={{ base: 'column', sm: 'column', lg: 'row' }}
              gap={6}
            >
              <CurrencyInput
                placeholder="De"
                onChange={(valueString: string) => {
                  setInitValue(valueString)
                }}
                value={initValue}
                error={undefined}
              />
              <CurrencyInput
                placeholder="Até"
                onChange={(valueString: string) => {
                  setEndValue(valueString)
                }}
                value={endValue}
                error={undefined}
              />
            </Flex>
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
                handleAddFilter({ initValue, endValue })
                onClose()
              }}
              isDisabled={initValue === '' || endValue === ''}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { Ticket } from '@phosphor-icons/react';
import { useForm } from 'react-hook-form';
import api from '../../services/api'; // Usa o seu api.ts
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface CreateCouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // Função para recarregar a lista
}

interface CreateCouponFormData {
  code: string;
  discountValue: number;
}

// Schema de validação
const schema = yup.object().shape({
  code: yup.string().required('O código é obrigatório.'),
  discountValue: yup
    .number()
    .typeError('O valor deve ser um número')
    .positive('O valor deve ser positivo')
    .required('O valor é obrigatório.'),
});

export function CreateCouponModal({ isOpen, onClose, onSuccess }: CreateCouponModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateCouponFormData>({
    resolver: yupResolver(schema),
  });
  const toast = useToast();

  const handleCreateCoupon = async (data: CreateCouponFormData) => {
    try {
      await api.post('/coupons', {
        ...data,
        discountValue: Number(data.discountValue),
      });

      toast({
        title: 'Cupom criado!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onSuccess(); // Recarrega a lista na página principal
      handleClose(); // Fecha o modal
    } catch (error: any) {
      toast({
        title: 'Erro ao criar cupom',
        description: error.response?.data?.error || 'Tente novamente.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleClose = () => {
    reset(); // Limpa o formulário
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered>
      <ModalOverlay backdropFilter="blur(2px)" />
      <ModalContent
        as="form"
        onSubmit={handleSubmit(handleCreateCoupon)}
        borderTop="4px solid"
        borderTopColor="brand.blue"
        borderTopRadius="xl"
      >
        <ModalHeader pb={2}>
          <Flex align="center" gap={3}>
            <Box bg="brand.blueLight" p={2} borderRadius="md">
              <Ticket size={20} color="#2a255a" weight="duotone" />
            </Box>
            <Box>
              <Text fontSize="lg" fontWeight="bold" color="brand.blue">Criar cupom</Text>
              <Text fontSize="sm" fontWeight="normal" color="gray.500">Novo cupom de desconto</Text>
            </Box>
          </Flex>
        </ModalHeader>
        <ModalCloseButton mt={2} />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isInvalid={!!errors.code}>
              <FormLabel htmlFor="code">Código do Cupom</FormLabel>
              <Input
                id="code"
                placeholder="EX: CURSINHO10"
                {...register('code')}
              />
              <FormErrorMessage>
                {errors.code && errors.code.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.discountValue}>
              <FormLabel htmlFor="discountValue">Valor do Desconto (em R$)</FormLabel>
              <InputGroup>
                 <InputLeftElement
                    pointerEvents="none"
                    color="gray.500"
                    fontSize="1.2em"
                    children="R$"
                  />
                <Input
                  id="discountValue"
                  type="number"
                  step="0.01"
                  placeholder="Ex: 10.00"
                  {...register('discountValue')}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.discountValue && errors.discountValue.message}
              </FormErrorMessage>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={handleClose}>
            Cancelar
          </Button>
          <Button colorScheme="blue" type="submit" isLoading={isSubmitting}>
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}


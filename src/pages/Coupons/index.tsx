import {
  Button,
  Spinner,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { Plus } from '@phosphor-icons/react';
import { useCallback, useEffect, useState } from 'react';
import api from '../../services/api';
import { CreateCouponModal } from './CreateCouponModal';
import { CouponsTable } from './CouponsTable';
import { PageLayout } from '../../layouts/PageLayout';

// Interface para definir o tipo de um cupom
export interface DiscountCoupon {
  id: string;
  code: string;
  discountValue: number;
  isActive: boolean;
  currentUses: number;
  maxUses?: number;
  createdAt: string;
}

export function Coupons() {
  const [coupons, setCoupons] = useState<DiscountCoupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Função para buscar os cupons da API
  const fetchCoupons = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/coupons');
      setCoupons(response.data);
    } catch (error) {
      toast({
        title: 'Erro ao carregar cupons',
        description: 'Não foi possível buscar os cupons. Tente novamente.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Buscar os cupons quando a página carregar
  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  return (
    <PageLayout
      variant="list"
      title="Cupons"
      subtitle="Aqui você pode gerenciar os cupons de desconto do cursinho"
      hasButton
      button={
        <Button leftIcon={<Plus size={20} />} colorScheme="blue" onClick={onOpen}>
          Criar Cupom
        </Button>
      }
    >
      {isLoading ? (
        <VStack h="300px" justify="center">
          <Spinner size="xl" />
        </VStack>
      ) : (
        <CouponsTable coupons={coupons} onRefresh={fetchCoupons} />
      )}

      <CreateCouponModal isOpen={isOpen} onClose={onClose} onSuccess={fetchCoupons} />
    </PageLayout>
  );
}


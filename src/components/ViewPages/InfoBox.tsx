import { Box, BoxProps, IconButton, Text, useClipboard } from '@chakra-ui/react'
import { Copy, CopySimple } from '@phosphor-icons/react'

interface InfoBoxProps extends BoxProps {
  title: string
  info: string
  copyValue?: string
}

export function InfoBox({ title, info, copyValue, ...rest }: InfoBoxProps) {
  const { onCopy, hasCopied } = useClipboard(copyValue ?? info)

  return (
    <Box
      bg="white"
      p={3}
      borderRadius="md"
      boxShadow="card"
      borderLeft="3px solid"
      borderLeftColor="yellow.400"
      position="relative"
      role={copyValue !== undefined ? 'group' : undefined}
      {...rest}
    >
      <Text
        color="gray.400"
        fontSize={{ base: 10, lg: 11 }}
        fontWeight="semibold"
        letterSpacing={1}
        textTransform="uppercase"
        mb={1}
        pr={copyValue !== undefined ? 6 : 0}
      >
        {title}
      </Text>
      <Text fontSize={{ base: 14, lg: 15 }} fontWeight="medium" color="gray.700" wordBreak="break-word">
        {info || '—'}
      </Text>

      {copyValue !== undefined && (
        <IconButton
          aria-label={hasCopied ? 'Copiado!' : 'Copiar'}
          icon={hasCopied
            ? <CopySimple size={14} color="#48BB78" weight="bold" />
            : <Copy size={14} color="#A0AEC0" weight="bold" />
          }
          size="xs"
          variant="ghost"
          position="absolute"
          top={2}
          right={2}
          opacity={0}
          _groupHover={{ opacity: 1 }}
          transition="opacity 0.15s"
          onClick={(e) => { e.stopPropagation(); onCopy() }}
        />
      )}
    </Box>
  )
}

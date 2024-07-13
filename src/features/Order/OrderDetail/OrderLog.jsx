import orderConstant from '@/constants/order';
import {
  Box,
  HStack,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  Text,
  useSteps,
  VStack,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { Fragment } from 'react';

const statusList = [
  orderConstant.PENDING,
  orderConstant.PROCESSING,
  orderConstant.SHIPPED,
  orderConstant.DELIVERED,
  orderConstant.CANCELLED,
];

const getIndex = currentStatusID => {
  let count = 0;
  for (const s of statusList) {
    if (s.id === currentStatusID) {
      return count;
    }

    count++;
  }
};

function OrderStep({ data, currentStatusID }) {
  const { activeStep } = useSteps({
    index: getIndex(currentStatusID) + 1,
    count: data.length,
  });

  return (
    <Stepper
      size='lg'
      index={activeStep}
      colorScheme='pink'
      h='100%'
      horizontal
    >
      {statusList.map((step, index) => {
        if (
          step.id === orderConstant.DELIVERED.id &&
          currentStatusID === orderConstant.CANCELLED.id
        ) {
          return <></>;
        }

        if (
          step.id === orderConstant.CANCELLED.id &&
          currentStatusID !== orderConstant.CANCELLED.id
        ) {
          return <></>;
        }
        return (
          <Fragment key={index}>
            <Step>
              <VStack>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>
                <StepTitle fontSize='0.9rem'>{step.text}</StepTitle>
              </VStack>

              <StepSeparator />
            </Step>
          </Fragment>
        );
      })}
    </Stepper>
  );
}

const OrderLog = ({ data }) => {
  return (
    <Box my={8}>
      <OrderStep
        data={data.logs}
        currentStatusID={orderConstant[data.orderStatus.toUpperCase()].id}
      />
      <Box
        w='full'
        mt={16}
        bgColor='brand.secondary'
        p='4'
        borderRadius={10}
        minH='400px'
      >
        <Text
          mt={10}
          my={5}
          fontSize='1.5rem'
          color='pink.200'
          fontWeight={700}
        >
          Lịch sử
        </Text>
        <VStack w='full' spacing={8}>
          {data.logs.map(l => {
            const info = orderConstant[l.status.toUpperCase()];
            return (
              <HStack key={l.createdAt} w='full' spacing={[1, 2, 4]}>
                <Text
                  color='gray.400'
                  fontStyle='italic'
                  fontSize={{
                    base: '0.8rem',
                    lg: '0.85rem',
                  }}
                >
                  {dayjs(l.createdAt)
                    .add(dayjs().utcOffset(), 'minutes')
                    .format('HH:mm:ss DD/MM/YYYY')}
                </Text>
                <Text
                  fontSize={{
                    base: '1rem',
                    lg: '1.1rem',
                  }}
                  fontWeight={600}
                >
                  {info.text}
                </Text>
              </HStack>
            );
          })}
        </VStack>
      </Box>
    </Box>
  );
};

export default OrderLog;

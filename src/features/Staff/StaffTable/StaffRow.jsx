import { useUpdateUserMutation } from '@/apis/userApi';
import CONSTANTS from '@/constants';
import { Badge, Icon, Switch, Td, Text, Tr, useToast } from '@chakra-ui/react';

const CircleIcon = props => (
  <Icon viewBox='0 0 200 200' {...props}>
    <path
      fill='currentColor'
      d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
    />
  </Icon>
);

const StaffRow = ({ data }) => {
  const [updateUser, result] = useUpdateUserMutation();
  const toast = useToast();
  const handleSwitch = async () => {
    try {
      console.log(data.id);
      const res = await updateUser({
        id: data.id,
        data: {
          isBanned: !data.isBanned,
        },
      });
      if (res.error) throw res.error.data;
      toast({
        title: 'Thành công',
        status: 'success',
        duration: 1000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      console.log('Update user error');
      toast({
        title: 'Thất bại',
        status: 'error',
        duration: 1000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  return (
    <>
      <Tr key={data.phoneNumber}>
        <Td>{data.username}</Td>
        <Td>
          {data.firstName} {data.lastName}
        </Td>
        <Td>
          <Badge
            ml='1'
            fontSize='0.8em'
            colorScheme={
              data.role.toLowerCase() === CONSTANTS.ROLE_ADMIN
                ? 'purple'
                : 'pink'
            }
          >
            {data.role}
          </Badge>
        </Td>
        <Td>
          {!data.isBanned ? (
            <Text>
              <CircleIcon color='green.400' mr={1} />
              Hoạt động
            </Text>
          ) : (
            <Text>
              <CircleIcon color='red.400' mr={1} />
              Không hoạt động
            </Text>
          )}
        </Td>
        <Td>
          <Switch
            name='isBanned'
            colorScheme='pink'
            defaultChecked={!data.isBanned}
            onChange={handleSwitch}
            isDisabled={result.isLoading}
          />
        </Td>
      </Tr>
    </>
  );
};

export default StaffRow;

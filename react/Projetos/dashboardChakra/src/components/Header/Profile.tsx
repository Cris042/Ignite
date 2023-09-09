import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      { showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>User Teste</Text>
          <Text color="gray.300" fontSize="small">
            email@gamil.com
          </Text>
        </Box>
      )}

      <Avatar size="md" name="Diego Fernandes" src="https://github.com/cris042.png" />
    </Flex>
  );
}
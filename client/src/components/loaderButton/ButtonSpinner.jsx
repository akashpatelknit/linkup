import { Button, Spinner, useColorModeValue } from '@chakra-ui/react';

const ButtonSpinner = ({ btnName, handleSubmit, loading }) => {
	return (
		<Button
			minW={100}
			onClick={handleSubmit}
			bg={useColorModeValue('#151f21', 'gray.900')}
			color={'white'}
			rounded={'md'}
			_hover={{
				transform: 'translateY(-2px)',
				boxShadow: 'lg',
			}}
		>
			{loading ? (
				<Spinner
					thickness="3px"
					speed="1s"
					emptyColor="gray.200"
					color="white.500"
					size="md"
				/>
			) : (
				btnName
			)}
		</Button>
	);
};

export default ButtonSpinner;

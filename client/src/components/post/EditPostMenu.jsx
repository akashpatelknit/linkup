import { Box, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import React, { memo } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const EditPostMenu = () => {
    console.log('EditPostMenu');
	return (
		<Box>
			<Menu>
				<MenuButton>
					<MoreHorizIcon />
				</MenuButton>
				<MenuList>
					<MenuItem>
						<DeleteIcon style={{ color: 'red' }} />
						Delete Post
					</MenuItem>
					<MenuItem>
						<EditIcon />
						Edit Post
					</MenuItem>
				</MenuList>
			</Menu>
		</Box>
	);
};

export default memo(EditPostMenu);

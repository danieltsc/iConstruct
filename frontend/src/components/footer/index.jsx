import { Box, Typography } from '@mui/material'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import PhoneIcon from '@mui/icons-material/Phone'

const Footer = () => {
	const currentYear = new Date().getFullYear()
	return (
		<Box display='flex' pt={4} pb={4} mt={8} justifyContent='center' sx={{ backgroundColor: 'black' }}>
			<Box>
				<Typography variant='h6' sx={{ fontWeight: '600', letterSpacing: 0.7, color: 'white' }}>
					&copy; iConstruct limited @ {currentYear}{' '}
				</Typography>
			</Box>
			<Box ml={2}>
				<FacebookOutlinedIcon sx={{ fill: 'white', ml: 1.6, fontSize: 32 }} />
				<PhoneIcon sx={{ fill: 'white', ml: 1.6, fontSize: 32 }} />
			</Box>
		</Box>
	)
}

export default Footer

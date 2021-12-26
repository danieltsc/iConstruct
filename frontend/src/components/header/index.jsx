import { Container, Box, Typography } from '@mui/material'

const Header = () => {
	return (
		<Box pt={2} pb={2} sx={{ backgroundColor: 'black' }}>
			<Container>
				<Typography variant='h4' sx={{ letterSpacing: 0.7, fontWeight: '600', color: '#fff', textAlign: 'center' }}>
					iConstruct
				</Typography>
			</Container>
		</Box>
	)
}

export default Header

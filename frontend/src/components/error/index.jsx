import { Box, Typography } from '@mui/material'

const Error = ({ error }) => {
	return (
		<Box mt={4}>
			<Typography variant='h5' sx={{ color: 'red', textAlign: 'center' }}>
				{error || 'Something went wrong. Please try again later.'}
			</Typography>
		</Box>
	)
}

export default Error

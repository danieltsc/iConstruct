import { useState, useEffect } from 'react'
import { Container, Box, Typography, Grid, TextField, Button, Autocomplete, Checkbox } from '@mui/material'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import DoneIcon from '@mui/icons-material/Done'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'

import { getCompanies, filterCompanies } from '../../helpers/requests-wrapper'
import { debounce } from '../../helpers/helpers'
import Error from '../../components/error'
import { specialtyFilterDropdown } from '../../constants'

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
const checkedIcon = <CheckBoxIcon fontSize='small' />

const IntroBox = () => {
	return (
		<Box mt={6} mb={4}>
			<Typography variant='h5' sx={{ letterSpacing: 1 }}>
				Find the perfect constructor for your criteria !
			</Typography>
		</Box>
	)
}

const FiltersBox = ({ setCompaniesList }) => {
	const [searchQuery, setSearchQuery] = useState('')
	const [selectedSpecialties, setSelectedSpecialties] = useState([])

	const updateSelected = (event, values) => {
		setSelectedSpecialties(values)
	}

	const searchCompanies = debounce(async value => {
		const reqBody = {
			query: value || undefined,
			specialties: selectedSpecialties
		}
		const data = await filterCompanies(reqBody)
		if (data.error) return

		const { data: filteredCompaniesList } = data
		setCompaniesList(filteredCompaniesList)

		setSearchQuery(value)
	}, 300)

	return (
		<Grid container display='flex' justifyContent='space-between'>
			<Grid item lg={8}>
				<TextField
					sx={{
						justifyContent: 'center',
						backgroundColor: '#F7F8FA',
						height: '36px',
						paddingLeft: '0.7rem',
						borderRadius: '4px',
						color: '#BFBFBF',
						width: { xs: '100%', sm: '100%', lg: '50%' }
					}}
					variant='standard'
					placeholder='Search for a company...'
					InputLabelProps={{
						style: {
							color: '#BFBFBF'
						}
					}}
					onChange={async e => {
						await searchCompanies(e.target.value)
					}}
					InputProps={{
						startAdornment: <SearchOutlinedIcon sx={{ mr: '0.7rem', color: '#505259' }} />,
						disableUnderline: true
					}}
				/>
				<Button color='secondary' variant='contained' onClick={async () => await searchCompanies(searchQuery)}>
					<Typography sx={{ textTransform: 'none' }}>Search</Typography>
				</Button>
			</Grid>
			<Grid item xs={12} lg={4}>
				<Autocomplete
					multiple
					id='checkboxes-tags-demo'
					onClose={async () => await searchCompanies(searchQuery)}
					options={specialtyFilterDropdown}
					onChange={updateSelected}
					disableCloseOnSelect
					getOptionLabel={option => option}
					renderOption={(props, option, { selected }) => {
						return (
							<li {...props}>
								<Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
								{option}
							</li>
						)
					}}
					renderInput={params => <TextField {...params} color='secondary' label='Specialties' placeholder='Filter only desired specialties' />}
				/>
			</Grid>
		</Grid>
	)
}

const Specialty = ({ text, color }) => {
	return (
		<Box display='flex' mt={1} ml={1}>
			<DoneIcon sx={{ fill: 'green' }} />
			<Typography sx={{ letterSpacing: 0.7, color: color ? color : null, ml: 0.2, textAlign: 'start' }}>{text}</Typography>
		</Box>
	)
}

const ResultsBox = ({ companiesList }) => {
	return (
		<Box mt={4}>
			{companiesList.length ? (
				companiesList.map((company, index) => {
					const { name, location, description, specialties, imageUrl } = company
					return (
						<Grid container key={index}>
							<Grid item lg={3} mt={4}>
								<img src={imageUrl} style={{ width: '100%', height: '100%' }} />
							</Grid>
							<Grid
								item
								lg={9}
								mt={4}
								pl={4}
								pt={2}
								pb={2}
								sx={{ backgroundColor: '#F7F8FA', borderTopRightRadius: 20, borderBottomRightRadius: 20 }}
								display='flex'
								flexDirection='column'
								justifyContent='space-between'
							>
								<Box display='flex' justifyContent='space-between'>
									<Box>
										<Typography variant='h5' sx={{ letterSpacing: 0.7, fontWeight: '600' }}>
											{name}
										</Typography>
									</Box>
									<Box display='flex' mr={2}>
										<LocationOnIcon sx={{ fontSize: 24, alignSelf: 'center', mr: 0.2 }} />
										<Typography variant='subtitle1' sx={{ alignSelf: 'flex-end', color: '#918f8e' }}>
											{location}
										</Typography>
									</Box>
								</Box>
								<Box>
									<Typography>{description}</Typography>
								</Box>
								<Box display='flex' justifyContent='space-between'>
									<Box display='flex'>
										{specialties.map((f, i) => (
											<Specialty text={f} key={i} />
										))}
									</Box>
									<Box mr={2}>
										<Button variant='contained'>Contact</Button>
									</Box>
								</Box>
							</Grid>
						</Grid>
					)
				})
			) : (
				<Box>
					<Typography color='error' variant='h5' sx={{ textAlign: 'center', fontWeight: '600', letterSpacing: 1 }}>
						No companies matching filter criteria !
					</Typography>
				</Box>
			)}
		</Box>
	)
}

const Main = () => {
	const [companiesList, setCompaniesList] = useState([])
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			const data = await getCompanies()
			if (data.error) {
				setTimeout(() => setError(null), 3000)
				return setError(data.error)
			}

			const { data: newCompaniesList } = data
			setCompaniesList(newCompaniesList)
		}
		fetchData()
	}, [])

	return (
		<Container>
			{error && <Error error={error} />}
			<IntroBox />
			<FiltersBox setCompaniesList={setCompaniesList} />
			<ResultsBox companiesList={companiesList} />
		</Container>
	)
}

export default Main

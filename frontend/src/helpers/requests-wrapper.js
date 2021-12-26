const { create } = require('apisauce')

const api = create({
	baseURL: 'http://localhost:5000'
})

export const getCompanies = async () => {
	try {
		const { data } = await api.get('/companies')
		return data
	} catch (e) {
		return {
			success: false,
			error: 'There was an error. Please try again later !'
		}
	}
}

export const filterCompanies = async reqBody => {
	try {
		const { data } = await api.post('/filter-companies', reqBody)
		return data
	} catch (e) {
		return {
			success: false,
			error: 'There was an error. Please try again later !'
		}
	}
}

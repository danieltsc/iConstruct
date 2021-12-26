const fs = require('fs')
const path = require('path')

const generateMockCompanies = (companiesToGenerate) => {
	// Starts from 1, not 0, because it's used in company name
	const entireData = []
	const randomLocations = ['Munchen, Germany', 'Paris, France', 'Dortmund, Germany', 'Dusseldorf, Germany', 'Nice, France']
	const randomSpecialties = ['Excavation', 'Plumbing', 'Electrical', 'Mechanical', 'Engineering']
	for (let i = 1; i <= companiesToGenerate; i++) {
		const randomLocationIdx = Math.floor(Math.random() * 4)
		const location = randomLocations[randomLocationIdx]
		const name = `My Construction LTD #${i}`
		const description = `${name} specialises in all areas of refurbishment and new build projects, predominately within the education, healthcare and commercial sectors.`
		const specialties = randomSpecialties.map(specialty => (Math.random() > 0.5 ? specialty : null)).filter(Boolean)
		const imageUrl = `https://placekitten.com/${440-i}/${300-i}`
		const companyData = {
			name,
			location,
			description,
			specialties,
			imageUrl
		}
        entireData.push(companyData)
	}
    fs.writeFileSync('./data.json', JSON.stringify(entireData, null, 2))
}


generateMockCompanies(30)
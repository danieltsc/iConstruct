import fs from 'fs'
import path from 'path'
import { Request, Response, NextFunction } from 'express'

interface ICompany {
	name: string
	location: string
	description: string
	specialties: string[] | []
	imageUrl: string
}

interface IFilterCompanyBody {
	query: string
	specialties: string[] | []
}

const companiesList: ICompany[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../__mock_db/data.json'), 'utf-8'))

export const GetCompanies = async (req: Request, res: Response, next: NextFunction): Promise<void | Response | NextFunction> => {
	try {
		res.json({ success: true, data: companiesList })
	} catch (error) {
		next(error)
	}
}

export const FilterCompanies = async (req: Request, res: Response, next: NextFunction): Promise<void | Response | NextFunction> => {
	const { query = '', specialties: filteredSpecialties }: IFilterCompanyBody = req.body
	try {
		if (!query && !filteredSpecialties.length) return res.json({ success: true, data: companiesList })

		let filteredCompaniesList = []
		companiesList.forEach(company => {
			const { name, specialties: allSpecialties } = company
			let namePassed: boolean = true
			let specialtiesPassed: boolean = false

			if (query && !name.includes(query)) namePassed = false
			if (!filteredSpecialties.length) specialtiesPassed = true

			filteredSpecialties.forEach((s: never) => {
				if (allSpecialties.includes(s)) specialtiesPassed = true
			})

			if (namePassed && specialtiesPassed) filteredCompaniesList.push(company)
		})

		res.json({ success: true, data: filteredCompaniesList })
	} catch (error) {
		next(error)
	}
}

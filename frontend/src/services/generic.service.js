import axios from 'axios'

// const BASE_URL = process.env.VUE_APP_SERVER_URL
// const BASE_URL = '/sanctum/csrf-cookie'
// const BASE_URL = 'https://dev-language-school-gb.herokuapp.com'
const BASE_URL = 'http://localhost:8000'

export const request = async ({ url, method, data = {} }) => {
	const response = await axios[method](`${BASE_URL}/${url}`, data)
	return response.data
}

import axios, { AxiosResponse } from 'axios'

export interface ICountry {
  name: string
  alpha2Code: string
  alpha3Code: string
}

const indexApi = 'https://restcountries.com/v2/all'

export const getCountries = (): Promise<AxiosResponse<ICountry[]>> =>
  axios.get(indexApi)

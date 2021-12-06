import axios from 'axios'
import useSWR from 'swr'

export const fetcher = (url) => axios.get(url).then(res => res.data)

export const fetchData = (url) => {
  return useSWR(url, fetcher)
}
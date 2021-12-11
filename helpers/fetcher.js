import axios from 'axios'
import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'

export const fetcher = (url) => axios.get(url).then(res => res.data)

export const fetchData = (url) => {
  return useSWR(url, fetcher)
}

export const fetchPermenantData = (url) => {
  return useSWRImmutable(url, fetcher)
}
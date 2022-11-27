import axios from "axios";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const fetchData = <T>(url: string) => {
  return useSWR<T>(url, fetcher);
};

export const fetchPermenantData = (url: string) => {
  return useSWRImmutable(url, fetcher);
};

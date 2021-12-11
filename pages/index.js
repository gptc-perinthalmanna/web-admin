/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import useUser from "lib/useUser";
import Router from 'next/router'

export default function Index() {
     // here we just check if user is already logged in and redirect to profile
  useUser({
    redirectTo: '/admin/dashboard',
    redirectIfFound: true,
  })

  React.useEffect(() => {
    Router.push('/auth/login')
  }, [])
  return null
}

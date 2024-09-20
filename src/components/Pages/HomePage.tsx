import React from 'react'
import Hero from '../Hero'
import Blogs from '../Blogs'
import AdSection from '../AdsSection'
import useBlogs from '@/hooks/useBlogs'
import useUser from '@/hooks/useUser'
import LatestBlogs from '../LatestBlogs'

export default function HomePage() {

  const { loader } = useUser();
  const {loading} = useBlogs();

  return (
    <div>
        <Hero/>
        <LatestBlogs/>
        <Blogs/>
        <AdSection/>
    </div>
  )
}

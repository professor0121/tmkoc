import React from 'react'
import Header from '../components/Header'
import Footer from '../components/home/Footer'
import PackagesList from '../components/packages/PackagesList'

const PackagePage = () => {
  return (
    <div>
        <Header/>
        <PackagesList/>
        <Footer/>
    </div>
  )
}

export default PackagePage
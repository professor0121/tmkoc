import React from 'react'
import CreatePackageForm from '../../components/packages/CreatePackage'
import PackagesList from '../../components/packages/PackagesList'

const Packages = () => {
  return (
    <div>
        <PackagesList/>
        <h1 className="text-2xl font-bold mb-4">Create Package</h1>
        <CreatePackageForm/>
    </div>
  )
}

export default Packages
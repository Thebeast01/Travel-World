import axios from "axios";
import { Navbar } from "../components/Navbar"
import { useEffect, useState } from "react"
import { PackagesCard } from "../components/packagesCard";
import { Package } from "../interfaces";
import { Pagination } from "../components/pagination";
import { config } from '../config/env'
export const Home = () => {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const packagesPerPage: number = 4

  const fetchPackages = async () => {
    try {
      setLoading(true)
      console.log(config.apiUrl)
      const response = await axios.get(`${config.apiUrl}/api/v1/packages`)
      setPackages(response.data)
      console.log(packages)
    } catch (error) {
      setLoading(false)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchPackages()
  }, [])
  const lastPageIndex = currentPage * packagesPerPage;

  const firstPostIndex = lastPageIndex - packagesPerPage;
  const currentPackages = packages?.slice(firstPostIndex, lastPageIndex)
  console.log('currentPackages', currentPackages)

  return (
    <>
      <div className="overflow-hidden max-w-screen">
        <Navbar />
        <div className="  px-4 py-4 my-8 flex flex-wrap  gap-8 items-center justify-center ">
          {
            loading ? <p>Loading...</p> :
              currentPackages.map((packageItem: Package, index) => (
                <PackagesCard
                  id={packageItem.id}
                  key={index}
                  title={packageItem.title}
                  description={packageItem.description}
                  price={packageItem.price}
                  availableDates={packageItem.availableDates}
                  image={packageItem.image}
                />
              ))
          }
        </div>

        <Pagination totalPackages={packages.length} packagePerPage={packagesPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
      </div>
    </>
  )
}

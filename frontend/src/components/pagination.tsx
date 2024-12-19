export const Pagination = ({ totalPackages, packagePerPage, setCurrentPage, currentPage }) => {
  let pages = []
  for (let i = 1; i <= Math.ceil(totalPackages / packagePerPage); i++) {
    pages.push(i)
  }
  return (
    <div className="flex justify-center items-center gap-6 max-w-screen mb-10 ">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={
            `px-4 py-2 rounded-xl ${currentPage === page ? 'bg-cyan-500 text-slate-950' : 'bg-cyan-100 text-slate-600'
            }`

          }
        >
          {page}
        </button>
      ))
      }</div>
  )
}


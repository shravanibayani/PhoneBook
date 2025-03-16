const Filter = (props) => {
    return (
        <div className="relative">
      <input
        type="text"
        value={props.searchTerm}
        onChange={props.handleSearchChange}
        placeholder="Search contacts..."
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
      />
      <svg 
        className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    )
}
export default Filter
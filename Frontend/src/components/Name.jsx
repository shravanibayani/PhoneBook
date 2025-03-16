
const Name = (props) => {
  return (
    <li className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
      <div>
        <span className="font-medium text-gray-800">{props.name}</span>
        <span className="text-gray-500 ml-2">{props.number}</span>
      </div>
      <button
        onClick={() => props.handledeleteContact(props.id)}
        className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200"
      >
        Delete
      </button>
    </li>
  )
}
export default Name;


const Input = (props) => {
    return (
        <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-700">{props.text}</label>
            <input
                type={props.type}
                value={props.value}
                onChange={props.onChange}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
            />
        </div>
    )
}
export default Input;
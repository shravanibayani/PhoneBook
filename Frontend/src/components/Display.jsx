import Name from './Name'
const Display = (props) => {
    return (
        <div className="bg-gray-50 rounded-md">
            {props.list.length === 0 ? (
                <p className="text-center py-4 text-gray-500">No contacts found</p>
            ) : (
                <ul className="divide-y divide-gray-100">
                    {props.list.map((person) => (
                        <Name
                            key={person.name}
                            name={person.name}
                            number={person.number}
                            id={person.id}
                            handledeleteContact={props.handledeleteContact}
                        />
                    ))}
                </ul>
            )}
        </div>
    )
}
export default Display;
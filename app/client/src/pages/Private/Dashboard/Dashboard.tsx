import { User } from "@/models/user"
import { getUsers } from "@/services/user.service"
import { useEffect, useState } from "react"

function Dashboard() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    try {
      const fetchUsers = async () => {
        const { data } = await getUsers()
        setUsers(data)
      }
      fetchUsers()
    } catch (error) {
      console.log(error)
    }
  }, [])
  return (
    <>
      <div className="flex flex-col w-4/5 m-auto">
        <div className="overflow-x-auto">
          <div className="align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden">
              <table className="table-fixed min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center">
                        <input id="checkbox-all" aria-describedby="checkbox-1" type="checkbox" className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                        <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                      </div>
                    </th>
                    <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th scope="col" className="p-4">
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user: User) => (
                    <tr className="hover:bg-gray-100" key={user.id}>
                      <td className="p-4 w-4">
                        <div className="flex items-center">
                          <input id="checkbox-20" aria-describedby="checkbox-1" type="checkbox" className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                          <label htmlFor="checkbox-20" className="sr-only">checkbox</label>
                        </div>
                      </td>
                      <td className="p-4 flex items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0">
                        <img className="h-10 w-10 rounded-full" src="https://demo.themesberg.com/windster/images/users/robert-brown.png" alt="Robert Brown avatar" />
                        <div className="text-sm font-normal text-gray-500">
                          <div className="text-base font-semibold text-gray-900">{user.name}</div>
                          <div className="text-sm font-normal text-gray-500">{user.email}</div>
                        </div>
                      </td>

                      <td className="p-4 whitespace-nowrap text-base font-normal text-gray-900">
                        <div className="flex items-center">
                          <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div> Active
                        </div>
                      </td>
                      <td className="p-4 whitespace-nowrap space-x-2">
                        <button type="button" data-modal-toggle="user-modal" className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                          <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
                          Edit user
                        </button>
                        <button type="button" data-modal-toggle="delete-user-modal" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                          <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                          Delete user
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>





    </>
  )
}

export default Dashboard
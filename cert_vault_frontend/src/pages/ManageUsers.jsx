const ManageUsers = () => {
  const users = [
    { id: 1, name: "Aisha Bello", role: "Student" },
    { id: 2, name: "Ahmed Musa", role: "Lecturer" },
    { id: 3, name: "Salim Garba", role: "Admin" },
  ];

  return (
    <div className="bg-white p-8 rounded-xl shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Manage Users</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border-b">Name</th>
            <th className="p-3 border-b">Role</th>
            <th className="p-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="p-3 border-b">{user.name}</td>
              <td className="p-3 border-b">{user.role}</td>
              <td className="p-3 border-b">
                <button className="text-blue-600 hover:underline mr-4">
                  Edit
                </button>
                <button className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;

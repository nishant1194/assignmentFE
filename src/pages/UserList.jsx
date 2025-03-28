import axios from "axios";
import React, { useEffect, useState } from "react";
import BaseUrl from "../util/BaseUrl";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function UserList() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [page, setpage] = useState(1);
  const [data, setdata] = useState();
  const [maxpages, setMaxpages] = useState(1);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
   const token = localStorage.getItem("APtoken");
   if(!token){
    navigate("/login")
   }
  },[navigate])

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const resp = await axios.get(`${BaseUrl}api/users?page=${page}`);
        setUsers(resp.data.data);
        setMaxpages(resp.data.total_pages);
        setdata(resp.data);
      } catch (error) {
        toast.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, [page]);

  const handleSave = async (id, first_name, last_name, email,avatar) => {
    if(!id && !first_name && !last_name && !email){
        toast.error("Enter all details");
        return;
    } 
    try {
      const resp = await axios.put(`${BaseUrl}api/users/${id}`, {
        id,
        first_name,
        last_name,
        email,
        avatar
      });
      toast.success("User updated");
      console.log(resp);
      setEditId(null);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    try {
      const resp = await axios.delete(`${BaseUrl}api/users/${id}`);
      toast.success("User deleted");
      console.log(resp);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("APtoken");
    toast.success("Logout Successfully.");
    navigate("/login");
     
  };

  return (
    <div className="bg-gray-100 h-full flex items-center justify-center">
      <div>
        <div className="w-[90vw] md:w-[70vw] lg:w-[50vw] min-w-70 bg-white shadow-lg rounded-lg p-6 my-3">
        <div className="flex justify-between items-center mt-4">
  <span className="text-xl font-semibold mb-4">List of all users</span>
  <a href="https://portfolio-sigma-one-53.vercel.app/" target="blank">
  <button
    className="bg-blue-600 px-4 py-1 mb-4 rounded-full text-white"
  >
    About Me
  </button>
  </a>
</div>

          {loading && <p className="text-center">Loading...</p>}
          <div className="flex flex-col">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex flex-col md:flex-row justify-between items-center bg-gray-200 py-4 px-2 rounded-md mb-3 shadow-sm hover:shadow-lg transition-shadow w-full"
              >
                <div className="w-full flex items-center space-x-4">
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-[50px] h-[50px] rounded-full"
                  />
                  <div>
                    {editId !== user.id ? (
                      <>
                        <span className="font-semibold">{user.first_name}</span>{" "}
                        <span>{user.last_name}</span>
                        <div className="text-gray-600">{user.email}</div>
                      </>
                    ) : (
                      <>
                        <input
                          type="text"
                          className="w-full border border-gray-300 px-2 py-1 rounded-md"
                          value={user.first_name}
                          onChange={(e) =>
                            setUsers((prevUsers) =>
                              prevUsers.map((h) =>
                                h.id === user.id
                                  ? { ...h, first_name: e.target.value }
                                  : h
                              )
                            )
                          }
                        />
                        <input
                          type="text"
                          className="w-full border border-gray-300 px-2 py-1 rounded-md mt-1"
                          value={user.last_name}
                          onChange={(e) =>
                            setUsers((prevUsers) =>
                              prevUsers.map((h) =>
                                h.id === user.id
                                  ? { ...h, last_name: e.target.value }
                                  : h
                              )
                            )
                          }
                        />
                        <input
                          type="text"
                          className="w-full border border-gray-300 px-2 py-1 rounded-md mt-1"
                          value={user.email}
                          onChange={(e) =>
                            setUsers((prevUsers) =>
                              prevUsers.map((h) =>
                                h.id === user.id
                                  ? { ...h, email: e.target.value }
                                  : h
                              )
                            )
                          }
                        />
                      </>
                    )}
                  </div>
                </div>
                <div className="flex mt-2">
                  {editId !== user.id ? (
                    <button
                      className="px-3 py-2 rounded-3xl text-white mx-1 bg-green-500 text-sm"
                      onClick={() => setEditId(user.id)}
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      className="px-3 py-2 rounded-3xl text-white mx-1 bg-green-500 text-sm"
                      onClick={() =>
                        handleSave(
                          user.id,
                          user.first_name,
                          user.last_name,
                          user.email,
                          user.avatar
                        )
                      }
                    >
                      Save
                    </button>
                  )}
                  {editId !== user.id ? (
                    <button
                      className="px-3 py-2 rounded-3xl text-white mx-1 bg-red-500 text-sm"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  ) : (
                    <button
                      className="px-3 py-2 rounded-3xl text-white mx-1 bg-red-500 text-sm"
                      onClick={() => setEditId(null)}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <button
              className={`px-4 py-2 rounded-lg ${
                page <= 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              disabled={page <= 1}
              onClick={() => setpage(page - 1)}
            >
              Prev
            </button>

            <button
              className={`px-4 py-2 rounded-lg ml-2 ${
                page >= (maxpages || 1)
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              disabled={page >= (maxpages || 1)}
              onClick={() => setpage(page + 1)}
            >
              Next
            </button>
          </div>
          <div className="flex justify-center mt-4 ">
            <button
              className="bg-green-600 px-4 py-2 rounded-full text-white"
              onClick={()=>{handleLogout()}}
            >
              Logout
            </button>
          </div>

         
        </div>
      </div>
    </div>
  );
}

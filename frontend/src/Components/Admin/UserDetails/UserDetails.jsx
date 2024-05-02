import React, { useEffect, useState } from 'react'
import "./user.css"
import axios from 'axios'
import baseUrl from "../../api"
import { useNavigate,Link } from 'react-router-dom';


const UserDetails = () => {
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const userId = localStorage.getItem("userId");

                if (!token || !userId) {
                    navigate("/admin-login");
                    return;
                }

                const response = await axios.get(`${baseUrl}/user/findall`, {
                    headers: {
                        token: `bearer ${token}`,
                    },
                });

                setData(response.data.users);
            } catch (error) {
                console.log(error);
                if (error.response && error.response.status === 403) {
                    // Unauthorized access, token is not valid
                    navigate("/admin-login");
                }
            }
        };

        fetchData();
    }, [navigate]); 

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");

            // Make a delete API call based on the user's ID
            await axios.delete(`${baseUrl}/user/delete/${id}`, {
                headers: {
                    token: `Bearer ${token}`,
                },
            });

            // After successful deletion, update the state
            setData((prevData) => prevData.filter(user => user._id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    return (<>
       {data === null ? (
                <h3><center>Loading...</center></h3>
            ) :
            (
                <div className="datatable">
                    {/* <input type="checkbox" id="reverse" />
                    <input type="checkbox" id="type" /> */}
                    <h2>Users</h2>
                    <div className="row head">

                        <div>Name:</div>

                        <div className="reverse">
                            <label htmlFor="reverse">Email</label>
                        </div>
                        <div className="type">
                            <label htmlFor="type">Phone Number</label>
                        </div>
                        <div className="type">
                            <label htmlFor="type">Delete</label>
                        </div>
                    </div>

                    <div className="content">


                        {
                            data.map((ele) => {
                                return (
                                    <div key={ele._id} className="row science">
                                        <div>{ele.fullName}</div>
                                        <div>{ele.email}</div>
                                        <div> <p>{ele.phoneNumber}</p></div>
                                        <div><button onClick={() => { handleDelete(ele._id) }}>delete</button></div>

                                    </div>
                                )
                            })
                        }



                    </div>
                </div>
            )}
    </>

    )
}

export default UserDetails
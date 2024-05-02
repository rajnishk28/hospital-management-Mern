import React, { useEffect, useState } from 'react'
import "./user.css"
import axios from 'axios'
import baseUrl from "../../api"
import { useNavigate,Link } from 'react-router-dom';


const PatientDetails = () => {
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

                const response = await axios.get(`${baseUrl}/patient/getall`, {
                    headers: {
                        token: `bearer ${token}`,
                    },
                });
                //   console.log(response.data);
                setData(response.data);
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

            await axios.delete(`${baseUrl}/patient/delete/${id}`, {
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
   
    const handleEdit = (id) => {
        navigate(`/admin/edit-patient/${id}`);
    }


    return (<>
       {data === null ? (
                <h3><center>Loading...</center></h3>
            ) :
            (
                <div className="datatable">
                    {/* <input type="checkbox" id="reverse" />
                    <input type="checkbox" id="type" /> */}
                    <h2>Patient Details</h2>
                    <div className="row head">

                        <div>Name:</div>

                        <div className="reverse">
                            <label htmlFor="reverse">Email</label>
                        </div>
                        <div className="type">
                            <label htmlFor="type">Phone Number</label>
                        </div>
                        <div className="type">
                            <label htmlFor="type">Gender</label>
                        </div>
                        <div className="type">
                            <label htmlFor="type">Edit</label>
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
                                        <div> <p>{ele.phone}</p></div>
                                        <div> <p>{ele.gender}</p></div>
                                        <div><button onClick={() => { handleEdit(ele._id) }}>Edit</button></div>
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

export default PatientDetails
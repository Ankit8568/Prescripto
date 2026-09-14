import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const navigate = useNavigate();

    const currencySymbol = "$";
    const [doctors, setDoctors] = useState([]);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [token, setToken] = useState(
        localStorage.getItem("token")
            ? localStorage.getItem("token")
            : ""
    );

    const [userData, setUserData] = useState(false);

    const getAllDoctors = async () => {
        try {
            console.log("Backend URL:", backendUrl);

            const { data } = await axios.get(
                `${backendUrl}/api/doctor/list`
            );

            console.log("Doctor API response:", data);

            if (data.success) {
                console.log("Doctors received:", data.doctors);
                console.log(
                    "Specialities received:",
                    data.doctors.map((doctor) => doctor.speciality)
                );

                setDoctors(data.doctors);
            } else {
                console.log("Doctor API error:", data.message);
            }
        } catch (error) {
            console.log("Error fetching doctors:", error);
        }
    };

    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(
                `${backendUrl}/api/user/get-profile`,
                {
                    headers: { token },
                }
            );

            if (data.success) {
                setUserData(data.userData);
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllDoctors();
    }, []);

    useEffect(() => {
        if (token) {
            loadUserProfileData();
        } else {
            setUserData(false);
        }
    }, [token]);

    const value = {
        doctors,
        currencySymbol,
        token,
        setToken,
        backendUrl,
        userData,
        setUserData,
        loadUserProfileData,
        getAllDoctors,
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;

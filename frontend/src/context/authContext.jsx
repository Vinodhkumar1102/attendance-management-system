import axios from 'axios';
import React, { useEffect, useContext, createContext, useState } from 'react';

const userContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('https://attendance-management-system-backend-qzzf.onrender.com/api/auth/verify', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
// console.log(response)
                    if (response.data.success) {
                        setUser(response.data.user);
                    } else {
                        setUser(null);
                        setLoading(false)
                    }
                
                } catch (error) {
                    console.log(error)
                    if(error.response && !error.response.data.error){
                    setUser(null);
                    }
                } finally {
                    setLoading(false);
                }
            } else {
                setUser(null);
                setLoading(false);
            }
        };

        verifyUser();
    }, []);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <userContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </userContext.Provider>
    );
};

export const useAuth = () => useContext(userContext);
export default AuthProvider;

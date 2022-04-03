import React , { useState, useEffect } from 'react'
import  '../assets/Market.css'
import  '../assets/Purchase.css'
import { useHistory } from 'react-router-dom'
import { AuthProvider } from "@arcana/auth";

function TestLogin(){
    const { push } = useHistory()
    const authInstance = new AuthProvider({
        appID: process.env.REACT_APP_ARCANA_APP_ID,
        network: "testnet",
        oauthCreds: [
          {
            type: "google",
            clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          },
        ],
        redirectUri: `${window.location.origin}/auth/redirect`,
    });

    useEffect(() => {
        // login();
    }, []);

    const isLoggedIn = () => {
        return authInstance.isLoggedIn();
    };

    const login = async() => {
        if(!isLoggedIn()){
            await authInstance.loginWithSocial("google");
        }
    };

    const handleRedirect = () => {
        AuthProvider.handleRedirectPage(window.location);
    }

    const fetchUserInfo = async() => {
        const { userInfo, privateKey } = await authInstance.getUserInfo();
        console.log({
            "email": userInfo.id,
            "profileImage": userInfo.picture,
            "givenName": userInfo.name
        })
    }

    const logout = async() => {
        await authInstance.logout();
    }

    return (
        <div>
        
        <button type="button" className="btn btn-social-icon-text btn-google" onClick={login}><i className="mdi mdi-google-plus"></i>Google</button>
        
        </div>
    )
}

export default TestLogin;
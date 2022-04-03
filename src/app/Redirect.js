import React , { useState, useEffect } from 'react'

function _Redirect(){

    useEffect(() => {
        window.close();
    }, []);

    return (
        <div></div>
    )
}

export default _Redirect;
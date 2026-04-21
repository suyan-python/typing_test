import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () =>
{
    return (
        <div>
            <a
                href="https://evolvevue.com.np"
                className="text-gray-400 hover:text-white transition p-5"
            >
                Exit
            </a>
        </div>
    )
}

export default NavBar
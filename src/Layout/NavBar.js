import React from 'react';
import { Link } from 'react-router-dom'

function NavBar({ linksToRender, path }) {
    const length = linksToRender.length;
    return linksToRender.map((link, index) => {
        return (
            index < length - 1 ? (<li className="breadcrumb-item" key={link.name}><Link to={link.url}>{link.name}</Link></li>) :
                (<li className="breadcrumb-item active" aria-current="page" key={link.name}>{link.name}</li>)
        )
    })

}

export default NavBar
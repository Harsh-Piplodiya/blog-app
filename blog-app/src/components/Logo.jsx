import React from 'react'

function Logo({width = '70px'}){
    return (
        // <div>Logo</div>
        <img 
            src="/images/logo-blog-app.png" 
            alt="blog-app-logo" 
            style={{width}} 
        />
    )
}

export default Logo
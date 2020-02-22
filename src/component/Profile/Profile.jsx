import React from 'react';


import './Profile.css';


class Profile extends React.Component{

    render(){
        return (
           <main className="main-wrapper">
               {this.props.name}
           </main>
        )
    }
}

export default Profile;
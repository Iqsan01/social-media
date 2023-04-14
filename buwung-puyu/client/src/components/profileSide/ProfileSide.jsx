import React from 'react'
import LogoSearch from '../logoSearch/LogoSearch'
import ProfileHome from '../profileHome/ProfileHome'
import FollowersCard from '../followersCard/FollowersCard'
import "./ProfileSide.css"

const profileSide = () => {
  return (
    <div className="ProfileSide">
      <LogoSearch/>
      <ProfileHome/>
      <FollowersCard/>
    </div>
  )
}

export default profileSide

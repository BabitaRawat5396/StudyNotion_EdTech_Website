import React from 'react'
import UpdateProfilePicture from './UpdateProfilePicture'
import UpdateProfileInfo from './UpdateProfileInfo'
import UpdatePassword from './UpdatePassword'
import DeleteAccount from './DeleteAccount'

const Settings = () => {
  return (
    <div className="flex flex-col items-center py-10 gap-16 ">
        <h1 className=" text-3xl text-richblack-5">Settings</h1>
        <UpdateProfilePicture/>
        <UpdateProfileInfo/>
        <UpdatePassword/>
        <DeleteAccount/>
    </div>
  )
}

export default Settings
import CreatePageForm from '@/components/forms/CreatePageForm'
import { GetUser } from '@/lib/user';
import { currentUser } from '@clerk/nextjs/server';
import React from 'react'

const Create = async() => {

  const user = await currentUser();
  if(!user)
    return

  const dbUser = await GetUser(user.id);
  if(!dbUser)
    return

  return (
    <main className='w-full'>
      <CreatePageForm user={dbUser}/>
    </main>
  )
}

export default Create

import CreatePageForm from '@/components/forms/CreatePageForm'
import { GetPages } from '@/lib/page';
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

const Page = async() => {

    const user = await currentUser();
    if(!user)
        return;

    const userPages = await GetPages(user.id);

  return (
    <main className='flex justify-center items-center'>
        {
            userPages?.map((page, index) => (
                <div key={index}>
                    <h1>{page.pageName}</h1>
                    <h1>{page.startups[0].name}</h1>
                </div>
            ))
        }

    </main>
  )
}

export default Page

import React, { useState, useEffect } from 'react'
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { assets } from '../assets/assets'
import { db, auth } from "../firebase";


const MyProfile = () => {

  const [userData, setUserData] = useState(null)

  const [isEdit, setIsEdit] = useState(false)



  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        console.log("Doc Exists:", docSnap.exists());
        console.log("Data:", docSnap.data());

        if (docSnap.exists()) {
          setUserData({
            ...docSnap.data(),
            image: docSnap.data()?.image || assets.profile_pic
          });
        } else {

          setUserData({
            name: user.displayName || "No Name",
            email: user.email,
            address: "",
            phone: "",
            gender: "",
            birthday: "",
            image: assets.profile_pic
          });
        }
      }
    });


    return () => unsubscribe();
  }, []);


  if (!userData) return <div>Patient Profile...</div>;

  return (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
      <label htmlFor="image">
        <img
          className="w-36 h-36 rounded-full object-cover cursor-pointer"
          src={userData?.image || assets.profile_pic}
          alt=""
        />
      </label>

      <input type="file" id="image" hidden
        onChange={async (e) => {

          const file = e.target.files[0]

          if (file) {

            const reader = new FileReader()

            reader.onloadend = async () => {

              const imageUrl = reader.result

              setUserData(prev => ({
                ...prev,
                image: imageUrl
              }))

              const user = auth.currentUser

              if (user) {

                const docRef = doc(db, "users", user.uid)

                await updateDoc(docRef, {
                  image: imageUrl
                })

              }

            }

            reader.readAsDataURL(file)

          }

        }}
      />

      {
        isEdit
          ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type="text" value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} />
          : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      }

      <hr className='bg-zinc-400 h-[1px] border-none' />
      <div>
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Email id:</p>
          <p className='text-blue-500'>{userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {
            isEdit
              ? <input className='bg-gray-100 max-w-52' type="text" value={userData.phone} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
              : <p className='text-blue-400'>{userData.phone}</p>
          }


          <p className='font-medium'>Address:</p>
          {
            isEdit
              ? <p>
                <input
                  className='bg-gray-50' type="text" value={userData.address} onChange={(e) => setUserData(prev => ({ ...prev, address: e.target.value }))}
                />
              </p>
              : <p className='text-gray-500'>
                {userData.address}
              </p>
          }
        </div>
      </div>
      <div>
        <p className='text-neutral-500 underline mt-3'>BASIC  INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          {
            isEdit
              ? <select className='max-w-20 bg-gray-100' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              : <p className='text-gray-400'>{userData.gender}</p>

          }
          <p className='font-medium'>Birthday:</p>
          {
            isEdit
              ? <input className='max-w-28 bg-gray-100' type="date" onChange={(e) => setUserData(prev => ({ ...prev, birthday: e.target.value }))} value={userData.birthday} />
              : <p className='text-gray-400'>{userData.birthday}</p>
          }
        </div>
      </div>
      <div className='mt-10'>
        {
          isEdit
            ? <button className='border border-blue-500 px-8 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-all'
              onClick={async () => {

                const user = auth.currentUser

                if (!user) return

                const docRef = doc(db, "users", user.uid)

                try {

                  await updateDoc(docRef, {
                    name: userData.name,
                    phone: userData.phone,
                    address: userData.address,
                    gender: userData.gender,
                    birthday: userData.birthday,
                    image: userData.image
                  })

                  setIsEdit(false)

                } catch (error) {
                  console.log(error)
                }

              }}>Save Information</button>
            : <button className='border border-blue-500 px-8 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-all' onClick={() => setIsEdit(true)}>Edit</button>
        }
      </div>
    </div>
  )
}

export default MyProfile
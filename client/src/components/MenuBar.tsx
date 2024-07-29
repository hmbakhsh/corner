import user_profile from '../assets/user_pfp.jpg'

export default function MenuBar() {
  return (
    <>
      <div className="flex justify-end mt-4 mr-4">
        <div className="w-fit flex gap-4 justify-end content-center px-3 py-2 rounded-md bg-neutral-800">
          <button type="button" className="text-xl font-semibold bg-indigo-600 py-1 px-6 rounded-md">Share</button>
          <img src={user_profile} alt="" className="rounded-full w-10" />
        </div>
      </div>
    </>
  )
}
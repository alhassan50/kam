function ChatListSkeleton() {
  return (
    <div className="sm:max-w-[90%] md:max-w-[70%] lg:max-w-[50%] mx-auto">
      <h2 className="mb-4">Manage Your Uploads</h2>
      <ul className="grid gap-4">
        {[...Array(3)].map((_, index) => (
          <li key={index} className="flex gap-6 justify-between items-center animate-pulse">
            <div className="w-full h-10 bg-gray-300 rounded-[4px]"></div>
            <div className="flex gap-2">
              <div className="w-10 h-10 bg-gray-300 rounded-md"></div>
              <div className="w-10 h-10 bg-gray-300 rounded-md"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ChatListSkeleton
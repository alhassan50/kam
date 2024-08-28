function AccountInfoSkeleton() {
  return (
    <div>
        <div className="flex justify-center items-center mb-6">
            <div className='w-40 h-40 rounded-full bg-tertiary animate-pulse'></div>
        </div>
        <div className="sm:max-w-[90%] md:max-w-[70%] lg:max-w-[50%] mx-auto">
            <h2 className="mb-4">Account Information</h2>

            <div className="grid gap-3 animate-pulse">
                <div className="grid grid-flow-row gap-1 min-w-0 text-[14px]">
                <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                <div className="h-10 bg-gray-300 rounded"></div>
                </div>

                <div className="grid grid-flow-row gap-1 min-w-0 text-[14px]">
                <div className="h-4 bg-gray-300 rounded w-16 mb-2"></div>
                <div className="h-10 bg-gray-300 rounded"></div>
                </div>

                <div className="mt-4 h-10 bg-gray-300 rounded animate-pulse"></div>
            </div>
        </div>
    </div>
  )
}

export default AccountInfoSkeleton
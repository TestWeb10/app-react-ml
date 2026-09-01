function LoadingBar() {
    return (
        <div className='w-full'>
            <div className='h-5 rounded w-full bg-pink-100 overflow-hidden'>
                <div className='animate-progress w-full h-full bg-orange-500 origin-left-right'></div>
            </div>
        </div>
    )
}

export default LoadingBar
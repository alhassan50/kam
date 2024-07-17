function SlidesPrview({fileName, fileSize, fileType}: {fileName: string, fileSize: string, fileType: string}) {
  return (
    <table className='mt-3 w-full text-left border'>
        <thead>
        <tr className='bg-[var(--hover-card)]'>
            <th className='border-b p-2 text-[12px] font-[500]'>Name</th>
            <th className='border-b p-2 text-[12px] font-[500]'>Type</th>
            <th className='border-b p-2 text-[12px] font-[500]'>Size(KB)</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td className='border-b p-2 text-[10px] truncate max-w-[180px]' title={fileName}>{fileName}</td>
            <td title={(fileType)} className='border-b p-2 text-[10px] uppercase truncate max-w-[50px]'>{(fileType)}</td>
            <td className='border-b p-2 text-[10px]'  title={`${fileSize} KB`}>{fileSize}</td>
        </tr>
        </tbody>
    </table>
  )
}

export default SlidesPrview
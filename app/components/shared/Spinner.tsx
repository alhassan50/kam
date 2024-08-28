import CircularProgress from "@mui/material/CircularProgress";

function Spinner() {
  return (
    <main className='flex h-full justify-center items-center'>
        <CircularProgress color='inherit' size={50} />
    </main>
  )
}

export default Spinner
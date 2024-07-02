import CircularProgress from "@mui/material/CircularProgress";

function Spinner() {
  return (
    <main className='flex justify-center items-center'>
        <CircularProgress sx={{ color: 'var(--primary-color)' }} size={50} />
    </main>
  )
}

export default Spinner
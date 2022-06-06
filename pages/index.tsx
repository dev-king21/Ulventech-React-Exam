import type { NextPage } from 'next'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Form from 'components/Form'
import Navbar from 'components/Navbar'

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="md">
        <Box sx={{ mx: 2, my: 4 }}>
          <Typography variant="h5" component="h1">
            Dynamic Form
          </Typography>
        </Box>
        <Box sx={{ mr: 4 }}>
          <Form />
        </Box>
      </Container>
    </>
  )
}

export default Home

import isLoggedIn from "@/lib/isLogedin"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const test = () => {

  const isLogedIn = isLoggedIn()
  const navigate = useNavigate()
  console.log(isLogedIn)


  useEffect(() => {
    if (!isLogedIn) return navigate('/login')
  }, [isLogedIn])

  return (
    <div>
      
    </div>
  )
}

export default test

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate, useNavigation } from "react-router"
import api from "../utils/axios_api"

export default function Login() {
    const navigate=useNavigate()
    const handleSubmit=async(e)=>{
        e.preventDefault();

        const formData=new FormData(e.currentTarget)
        const data=Object.fromEntries(formData)

        const res= await api.post('/user/login',data)
        navigate('/')
        console.log(res)

    }
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login</CardTitle>

          <CardDescription>
            Enter your email and password to login
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                type="email"
                name='email'
                placeholder="m@example.com"
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>

              <Input
                id="password"
                type="password"
                name='password'
                placeholder="Enter password"
              />
            </div>
             <CardFooter className="flex flex-col gap-2">
          <Button className="w-full" type='submit'>
            Login
          </Button>

         
        </CardFooter>
          </form>
        </CardContent>

       
      </Card>
    </div>
  )
}
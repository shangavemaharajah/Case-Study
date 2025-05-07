import React, { useState } from "react";
import { motion } from "framer-motion";
import Input from "../../Components/Ui/Input/Input";
import Button from "../../Components/Ui/Button/Button";
import Card from "../../Components/Ui/Card/Card";
import CardContent from "../../Components/Ui/CardContent/CardContent";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../Hook/UseLogin";
import { useAuthContext } from "../../Hook/UseAuthContext";

const SignIn = () => {
  const navigate = useNavigate();
 const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();
  const {user} = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted",username,password);

    const response = await login(username,password);
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
    
      // dispatch({ type: "LOGIN", payload: json });  
    
      isLoading(false);
      navigate("/");
    }
    
  };
console.log("user from Sing In",user)
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-blue-500">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-96 shadow-xl rounded-2xl bg-white p-6">
          <CardContent>
            <h2 className="text-2xl font-bold text-center text-blue-600">Sign In</h2>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-blue-500" />
                <Input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-blue-500" />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-3">
              Don't have an account? <a href="/signUp" className="text-blue-600 font-semibold">Sign Up</a>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignIn;

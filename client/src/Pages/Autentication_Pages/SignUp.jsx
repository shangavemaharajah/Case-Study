import React, { useState } from "react";
import { motion } from "framer-motion";
import Input from "../../Components/Ui/Input/Input";
import Button from "../../Components/Ui/Button/Button";
import Card from "../../Components/Ui/Card/Card";
import CardContent from "../../Components/Ui/CardContent/CardContent";
import { Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../../Hook/UseRegister";


const SignUp = () => {
  const { register, isLoading, error } = useRegister();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const response = await register(username,email,password);
    if (!response.ok) {
      const errorText = await response.text(); // Read response as text
      isLoading(false);
      setError(errorText);
      return { error: errorText };
    }
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-blue-500">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-96 shadow-xl rounded-2xl bg-white p-6">
          <CardContent>
            <h2 className="text-2xl font-bold text-center text-blue-600">Sign Up</h2>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-3 text-blue-500" />
                <Input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-blue-500" />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                {isLoading ? "Signing Up..." : "Sign Up"}
              </Button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-3">
              Already have an account? <a href="/signIn" className="text-blue-600 font-semibold">Sign In</a>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignUp;

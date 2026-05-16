import React, {useState} from "react";
import "./Login.css";

function Login({onLogin}) {
    const [email, setEmail] = useState("user@example.com");
    const [password, setPassword] = useState("123456");
    const [ isRegister, setIsRegister] = useState(false);
    const [name, setName] = useState("");

    const handleSubmit = () => {
        if (isRegister) {
            onLogin({ type:"register", name, email, password});
        } 
        else{
            onLogin({ type: "login", email, password});
        }
    };

    return(
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1 className="login-title">🍕 Aaj Kia Khaien?</h1>
                    <p className="login-subtitle">
                        Delivering happiness to your door!
                    </p>
                </div>
    
                {isRegister && (
                <input 
                type="text"
                className="login-input"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                )}

                <input
                type="email"
                className="login-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

                <input 
                type="password"
                className="login-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />

                <button className="login-button" onClick={handleSubmit}>
                    {isRegister ? 'Create Account ->' : "Login ->"}
                </button>

                <p className="login-link">
                    <button onClick={() => setIsRegister(!isRegister)}>
                        {isRegister ? "<- Back to Login" : "New User? Register here"}
                    </button>
                </p>
            </div>
        </div>
    );
}
export default Login;
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [message, setMessage] = useState("Connecting to backend...");

    useEffect(() => {
        axios.get("http://localhost:5242/api/municipality")
            .then(res => setMessage(res.data.message))
            .catch(err =>{
                console.log(err);
        setMessage("Could not connect to backend...");

    });
}, []);
return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
        <h1>Municipality</h1>
        <p> Backend says :<strong> {message}</strong> </p>
    </div>
)
}

export default App;
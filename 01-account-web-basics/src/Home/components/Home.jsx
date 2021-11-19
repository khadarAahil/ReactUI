import { useEffect } from "react";

const Home = (props) => {

    useEffect(() => {
        const authFlag = localStorage.getItem("isLoggedIn");
        console.log("authFlag: " + authFlag);
        if (!authFlag) {
          props.history.push("/login");
          return;
        }
      }, []); 

    return <div>
        <h1>Home is working fine!</h1>
    </div>

}

export default Home;
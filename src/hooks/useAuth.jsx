import { useEffect } from "react";
import apiUrl from "../apiUrl";

export function useAuth(user, setUser) {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetch(`${apiUrl}/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setUser({
              id: data.user.id,
              username: data.user.name,
              email: data.user.email,
              password: data.user.password,
              loggedIn: true,
            });
            localStorage.setItem("user", JSON.stringify(data.user));
          }
          if (data.token) {
            localStorage.setItem("token", JSON.stringify(data.token));
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);
}

export default useAuth;

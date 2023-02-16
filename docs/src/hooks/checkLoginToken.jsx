import { useEffect } from "react";
import apiUrl from "../apiUrl";

export function checkLoginToken(user, setUser) {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetch(`${apiUrl}/verify-token`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          token: token,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setUser({
              id: data.user.id,
              username: data.user.username,
              email: data.user.email,
              password: data.user.password,
              loggedIn: true,
            });
            localStorage.setItem("user", data.user);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);
}

export default checkLoginToken;

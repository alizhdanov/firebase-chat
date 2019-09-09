import React, { useState, useEffect } from "react";
import { Router, Redirect } from "@reach/router";

import Nav from "./Nav";
import Channel from "./Channel";
import { firebase, db } from "./firebase";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      let usr = null;

      if (user) {
        usr = {
          email: user.email,
          displayName: user.displayName,
          photoUrl: user.photoURL,
          uid: user.uid
        };

        db.collection("users")
          .doc(usr.uid)
          .set(usr, { merge: true });
      }

      setUser(usr);
    });
  }, []);

  const handleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
  };

  const handleSubmit = async evt => {
    evt.preventDefault();
    const { email, password } = evt.target.elements;

    try {
      const result = await firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);

      console.log({ result });
    } catch (err) {
      console.log("era", err);
    }
  };

  return user ? (
    <div className="App">
      <Nav user={user} />
      <Router>
        <Channel path="/channel/:channelId" user={user} />
        <Redirect from="/" to="/channel/general" />
      </Router>
    </div>
  ) : (
    <div>
      <h1>Sing Up</h1>
      <form action="post" onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={handleLogin}>Login with google</button>
    </div>
  );
}

export default App;

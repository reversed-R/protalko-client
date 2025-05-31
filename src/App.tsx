import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { commands, UserPresentation } from "./bindings.ts";

function App() {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState<UserPresentation>({
    id: "uuid",
    name: "name",
    visible_id: "visible_id",
  });
  const [statusMsg, setStatusMsg] = useState("nothing");

  return (
    <main className="container">
      <h1>Welcome to Tauri + React</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await commands.getUserById(userId);
          if (res.status === "ok") {
            setUser(res.data);
          }
          if (res.status === "error") {
            setStatusMsg(res.error.message);
          }
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setUserId(e.currentTarget.value)}
          placeholder="Enter a user id..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>
        ユーザー: 内部ID: {user.id}, 表示名: {user.name}, ユーザー設定ID:{" "}
        {user.visible_id}
      </p>
      <p>ステータス: {statusMsg}</p>
    </main>
  );
}

export default App;

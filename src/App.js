import "./App.css";
import Forms from "./component/Forms";
import axios from "axios";
import { nanoid } from "nanoid";

function App() {
  const pushToAPI = async (form) => {
    const post = {
      id: nanoid(),
      ...form,
    };
    try {
      const res = await axios.post(
        "https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries",
        post
      );
      console.log(res.data);
      alert(res);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className="App">
      <Forms submitForm={pushToAPI} />
    </div>
  );
}

export default App;

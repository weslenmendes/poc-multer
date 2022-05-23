import axios from "axios";
import { useState, useEffect, useRef } from "react";

const initialState = {
  name: "",
  email: "",
};

function App() {
  const [userInfo, setUserInfo] = useState(initialState);
  const [status, setStatus] = useState({ success: false, error: false });
  const [id, setId] = useState(null);
  const inputRef = useRef("");
  const formRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(id);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", userInfo.name);
    data.append("email", userInfo.email);

    const { file } = inputRef.current;
    const acceptableExts = ["jpg", "jpeg", "png", "gif"];
    const fileExt = file?.type.split("/")[1];

    if (!acceptableExts.includes(fileExt)) {
      return alert("Por favor, envie uma imagem válida. (jpg, jpeg, png, gif)");
    }

    data.append("image", file);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URI}/upload`,
        data,
      );

      if (response.status === 201) {
        setStatus({ ...status, success: true });
        setUserInfo(initialState);
        inputRef.current.file = "";
        formRef.current.reset();
        setId(
          setTimeout(() => {
            setStatus({ success: false, error: false });
          }, 2000),
        );
      }
    } catch (e) {
      console.log(e);
      setStatus({ ...status, error: true });
    }
  };

  return (
    <main>
      <form ref={formRef} onSubmit={handleSubmit} autoComplete="off">
        <div>
          <label htmlFor="name">Nome: </label>
          <input
            type="text"
            name="name"
            placeholder="Digite seu nome"
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            value={userInfo.name}
            required
          />
        </div>
        <div>
          <label htmlFor="email">E-mail: </label>
          <input
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
            value={userInfo.email}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Imagem: </label>
          <input
            ref={inputRef}
            type="file"
            name="image"
            onChange={(e) => {
              inputRef.current.file = e.target.files[0];
            }}
            required
          />
        </div>
        <button type="submit">Enviar</button>
        {status.error && (
          <h3 className="error">Por favor, ensira dados válidos!</h3>
        )}
        {status.success && (
          <h3 className="success">Formulário enviado com sucesso!</h3>
        )}
      </form>
    </main>
  );
}

export default App;

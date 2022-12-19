import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPhoto = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [captions, setCaptions] = useState("");
  const [secret, setSecret] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const addPhoto = async (e) => {
    e.preventDefault();
    const addData = {
      imageUrl: imageUrl,
      captions: captions,
      createdAt: '2022-12-12T20:08:14.8812',
      updatedAt: '2022-12-12T20:18:36.8942',
      secret: secret,
    };

    try {
      const data = await fetch('https://gallery-app-server.vercel.app/photos', {
        method: "POST", // HTTP method
        headers: {
          // HTTP headers
          "Content-Type": "application/json", // type data yang dikirim
        },
        body: JSON.stringify(addData), // data yang dikirim
      })
      const res = await data.json()
      console.log(res)
      if (res.error) {
        setError(res.error)
      } else {
        navigate('/photos')
      }
    } catch (error) {
      setError(error.error)
    }

    // if (secret === "password") {
    // }
    // } else {
    //   alert('You are not authorized')
    // }
    // TODO: answer here
  };

  return (
    <>
      <div className="container">
        {error && <div className="error-msg">{error}</div>}
        <form className="add-form" onSubmit={addPhoto}>
          <label>
            Image Url:
            <input
              className="add-input"
              type="text"
              data-testid="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>
          <label>
            Captions:
            <input
              className="add-input"
              type="text"
              data-testid="captions"
              value={captions}
              onChange={(e) => setCaptions(e.target.value)}
            />
          </label>
          <label>
            Secret:
            <input
              className="add-input"
              type="text"
              value={secret}
              data-testid="secret"
              onChange={(e) => setSecret(e.target.value)}
            />
          </label>
          <input className="submit-btn" type="submit" value="Submit" data-testid="submit" />
        </form>
      </div>
    </>
  );
};

export default AddPhoto;

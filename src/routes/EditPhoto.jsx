import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPhoto = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [captions, setCaptions] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setEror] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const editPhoto = async (e) => {
    e.preventDefault();

    const addData = {
      imageUrl: imageUrl,
      captions: captions,
      //createdAt: '2022-12-12T20:08:14.8812',
      updatedAt: '2022-12-12T20:18:36.8942',
      //secret: secret,
    };

    await fetch(`https://gallery-app-server.vercel.app/photos${id}`, {
        method: "PATCH", // HTTP method
        headers: {
          // HTTP headers
          "Content-Type": "application/json", // type data yang dikirim
        },
        body: JSON.stringify(addData), // data yang dikirim
      })
      navigate('/photos')
    // TODO: answer here
  };

  useEffect(() => {
    setLoading(true);
    const prevData = async () => {
      const request = await fetch (`https://gallery-app-server.vercel.app/photos/${id}`);
      const response = await request.json()
      setImageUrl(response.imageUrl)
      setCaptions(response.captions)
      setLoading(false)
    }

    prevData();
    // TODO: answer here
  }, [id]);

  if (error) return <div>Error!</div>;
  setError(error)

  return (
    <>
      {loading ? (
        <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
          Loading...
        </h1>
      ) : (
        <div className="container">
          <form className="edit-form" onSubmit={editPhoto}>
            <label>
              Image Url:
              <input
                className="edit-input"
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </label>
            <label>
              Captions:
              <input
                className="edit-input"
                type="text"
                value={captions}
                data-testid="captions"
                onChange={(e) => setCaptions(e.target.value)}
              />
            </label>
            <input className="submit-btn" type="submit" value="Submit" data-testid="submit" />
          </form>
        </div>
      )}
    </>
  );
};

export default EditPhoto;

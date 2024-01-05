import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/ParentContext";
import { Link } from "react-router-dom";

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [books, setBooks] = useState([]);
  const { isLoggedIn } = useContext(AppContext);
  const baseUrl = axios.create({
    baseURL: "https://reactnd-books-api.udacity.com",
    headers: {
      Authorization: "whatever-you-want",
    },
  });
  useEffect(() => {
    if (searchInput == "") {
      baseUrl.get("/books").then((res) => {
        setBooks(res.data.books);
      });
    } else {
      baseUrl.post("/search", { query: searchInput }).then((res) => {
        if (Array.isArray(res.data.books)) {
          const filteredBooks = res.data.books.filter((e) => {
            return e.imageLinks && e.imageLinks.thumbnail;
          });
          setBooks(filteredBooks);
        } else {
          setBooks([]);
        }
      });
    }
  }, [searchInput]);
  // console.log(books);

  const handleInput = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="home">
      <div
        id="search-bar"
        style={{
          display: "flex",
          placeItems: "center",
          columnGap: "5px",
          background: "white",
          height: "20px",
          margin: "1vw auto",
          padding: "10px",
          border: "2px solid black",
          borderRadius: "5px",
          width: "30vw",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="22"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => {
            handleInput(e);
          }}
          placeholder="Search Books"
          style={{
            width: "400px",
            height: "3vh",
            border: "none",
            padding: "5px",
            outline: "none",
            fontSize: "1rem",
          }}
        />
      </div>

      <div className="content-div">
        <h1 className="category">
          {searchInput == "" ? "Popular Books" : "Search Results"}
        </h1>
        <div
          className="book-container"
          style={{ display: `${books.length == 0 ? "flex" : "grid"}` }}
        >
          {books.length == 0 ? (
            <h1 style={{ textAlign: "center" }}>No Books Found</h1>
          ) : (
            books.map((e) => {
              return (
                <div className="card" key={e.id}>
                  {!isLoggedIn && (
                    <div className="register-div">
                      <Link to={"/SignUp"}>
                        <button
                          style={{ cursor: "pointer" }}
                          className="register-btn"
                        >
                          Register
                        </button>
                      </Link>
                    </div>
                  )}
                  <div
                    className="book"
                    style={{
                      filter: `${isLoggedIn ? "blur(0px)" : "blur(10px)"}`,
                    }}
                  >
                    {isLoggedIn ? (
                      <a
                        href={e.previewLink}
                        style={{ textDecoration: "none" }}
                        target="_blank"
                      >
                        <img
                          className="image"
                          src={e.imageLinks.thumbnail}
                          alt={e.title}
                        />
                        <h4 className="title">{e.title}</h4>
                      </a>
                    ) : (
                      <>
                        <img
                          className="image"
                          src={e.imageLinks.thumbnail}
                          alt={e.title}
                        />
                        <h4
                          className="title"
                          style={{ color: "rgba(0, 0, 0, 0.5)" }}
                        >
                          {e.title}
                        </h4>
                      </>
                    )}
                    <p className="rating">
                      {!e.averageRating ? "3.9" : e.averageRating}⭐
                      <span className="price">Free</span>
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

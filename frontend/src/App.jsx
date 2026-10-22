

import { useState } from "react";

import "./App.css";



const books = [

  { title: "Atomic Habits", author: "James Clear", category: "Self Help", color: "#e9d5b0", cover: "ATOMIC\nHABITS" },

  { title: "The Silent Patient", author: "Alex Michaelides", category: "Fiction", color: "#c8d8ed", cover: "THE SILENT\nPATIENT" },

  { title: "Ikigai", author: "Héctor García", category: "Self Help", color: "#9bbde1", cover: "IKIGAI" },

  { title: "Deep Work", author: "Cal Newport", category: "Business", color: "#f5c51b", cover: "DEEP\nWORK" },

  { title: "Think Like a Monk", author: "Jay Shetty", category: "Self Help", color: "#8aa8d9", cover: "THINK LIKE\nA MONK" },

  { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", category: "Business", color: "#dfc75d", cover: "RICH DAD\nPOOR DAD" },

];



const navItems = [

  ["⌂", "Home"],

  ["▤", "Library"],

  ["⌕", "Search"],

  ["♙", "Profile"],

];



function App() {

  const [active, setActive] = useState("Home");

  const [query, setQuery] = useState("");

  const [selected, setSelected] = useState(null);

  const [playing, setPlaying] = useState(false);

  const [authMode, setAuthMode] = useState("welcome");



  const filteredBooks = books.filter((book) =>

    `${book.title} ${book.author} ${book.category}`

      .toLowerCase()

      .includes(query.toLowerCase())

  );



  function openAuth(mode) {

    setAuthMode(mode);

  }



  return (

    <div className="app-shell">

      <aside className="sidebar">

        <div className="brand">

          <span className="brand-mark">♫</span>

          <span>Audio<span className="gold">Verse</span></span>

        </div>



        <p className="side-label">YOUR SPACE</p>



        {navItems.map(([icon, label]) => (

          <button

            key={label}

            onClick={() => setActive(label)}

            className={`nav-item ${active === label ? "active" : ""}`}

          >

            <span>{icon}</span>

            {label}

          </button>

        ))}



        <div className="sidebar-bottom">

          <div className="avatar">V</div>

          <div>

            <strong>Welcome back</strong>

            <p>Ready for a new story?</p>

            <button

              type="button"

              className="auth-sidebar-link"

              onClick={() => openAuth("login")}

            >

              Sign in

            </button>

            <button

              type="button"

              className="auth-sidebar-link"

              onClick={() => openAuth("signup")}

            >

              Create account

            </button>

          </div>

        </div>

      </aside>



      <main className="main-content">

        <header className="topbar">

          <div>

            <div className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</div>

            <h1>Audio<span className="gold">Verse</span></h1>

          </div>

          <button className="profile-button" onClick={() => setActive("Profile")}>

            V

          </button>

        </header>



        <div className="search-wrap">

          <span>⌕</span>

          <input

            value={query}

            onChange={(e) => setQuery(e.target.value)}

            placeholder="Search audiobooks, authors..."

            aria-label="Search audiobooks"

          />

          {query && <button onClick={() => setQuery("")}>Clear</button>}

        </div>



        {active === "Home" && (

          <>

            <section className="hero">

              <div className="hero-copy">

                <span className="pill">A WORLD OF STORIES</span>

                <h2>

                  Make every<br />

                  moment <span className="gold">meaningful.</span>

                </h2>

                <p>

                  Listen, learn, and discover your next favourite story —

                  wherever life takes you.

                </p>

                <button

                  className="primary-button"

                  onClick={() => setActive("Search")}

                >

                  Explore audiobooks ↗

                </button>

              </div>



              <div className="hero-art">

                <div className="sound-ring">♫</div>

                <div className="sound-bars">

                  {[28, 48, 70, 42, 86, 58, 34, 68, 45, 25].map((height, i) => (

                    <i key={i} style={{ height }} />

                  ))}

                </div>

                <span>LISTEN BEYOND</span>

              </div>

            </section>



            <div className="section-heading">

              <div>

                <p className="eyebrow">HANDPICKED FOR YOU</p>

                <h2>Popular audiobooks</h2>

              </div>

              <button className="text-button" onClick={() => setActive("Search")}>

                See all ↗

              </button>

            </div>



            <section className="book-grid">

              {filteredBooks.map((book) => (

                <BookCard

                  key={book.title}

                  book={book}

                  onClick={() => {

                    setSelected(book);

                    setPlaying(false);

                  }}

                />

              ))}

            </section>



            <div className="section-heading">

              <div>

                <p className="eyebrow">FIND YOUR INTEREST</p>

                <h2>Explore categories</h2>

              </div>

            </div>



            <section className="category-grid">

              {["Self Help", "Business", "Fiction", "Biography"].map(

                (category, i) => (

                  <button

                    key={category}

                    className={`category category-${i}`}

                    onClick={() => {

                      setQuery(category);

                      setActive("Search");

                    }}

                  >

                    <span>{["✦", "▥", "▤", "♙"][i]}</span>

                    {category}

                    <span className="category-arrow">↗</span>

                  </button>

                )

              )}

            </section>

          </>

        )}



        {active === "Search" && (

          <>

            <div className="section-heading">

              <div>

                <p className="eyebrow">FIND YOUR NEXT LISTEN</p>

                <h2>Discover stories</h2>

              </div>

            </div>



            <section className="book-grid">

              {filteredBooks.map((book) => (

                <BookCard

                  key={book.title}

                  book={book}

                  onClick={() => {

                    setSelected(book);

                    setPlaying(false);

                  }}

                />

              ))}

            </section>



            {filteredBooks.length === 0 && (

              <p className="empty-state">

                No books found. Try another title or author.

              </p>

            )}

          </>

        )}



        {active === "Library" && (

          <>

            <div className="section-heading">

              <div>

                <p className="eyebrow">YOUR PERSONAL COLLECTION</p>

                <h2>My Library</h2>

              </div>

            </div>



            <section className="book-grid">

              {books.slice(0, 3).map((book) => (

                <BookCard

                  key={book.title}

                  book={book}

                  onClick={() => {

                    setSelected(book);

                    setPlaying(false);

                  }}

                />

              ))}

            </section>



            <p className="muted">

              Sample library content. Saved books and listening progress

              will be connected to your account later.

            </p>

          </>

        )}



        {active === "Profile" && (

          <section className="profile-panel">

            <div className="avatar large">V</div>

            <p className="eyebrow">YOUR ACCOUNT</p>

            <h2>Welcome to AudioVerse</h2>

            <p className="muted">Your listening journey starts here.</p>

            <div className="profile-actions">

              <button

                className="primary-button"

                onClick={() => openAuth("login")}

              >

                Sign in

              </button>

              <button

                className="secondary-button"

                onClick={() => openAuth("signup")}

              >

                Create account

              </button>

            </div>

          </section>

        )}

      </main>



      <footer className="mobile-nav">

        {navItems.map(([icon, label]) => (

          <button

            key={label}

            className={active === label ? "selected" : ""}

            onClick={() => setActive(label)}

          >

            <span>{icon}</span>

            {label}

          </button>

        ))}

      </footer>



      {selected && (

        <div className="modal-backdrop" onClick={() => setSelected(null)}>

          <div className="book-modal" onClick={(e) => e.stopPropagation()}>

            <button

              className="modal-close"

              onClick={() => setSelected(null)}

              aria-label="Close audiobook details"

            >

              ×

            </button>

            <BookCover book={selected} large />

            <p className="eyebrow">{selected.category.toUpperCase()}</p>

            <h2>{selected.title}</h2>

            <p className="muted">{selected.author}</p>

            <p className="modal-description">

              Discover this audiobook on AudioVerse. Real audio playback

              and catalogue data will be connected later.

            </p>

            <button

              className="primary-button full"

              onClick={() => setPlaying((value) => !value)}

            >

              {playing ? "Ⅱ Pause preview" : "▶ Play preview"}

            </button>

            {playing && (

              <p className="muted">

                This is a UI preview; no audio file is playing yet.

              </p>

            )}

          </div>

        </div>

      )}



      {authMode !== "welcome" && (

        <AuthScreen

          mode={authMode}

          setMode={setAuthMode}

        onClose={() => {
  setAuthMode("welcome");
  setActive("Home");
}}

        />

      )}

    </div>

  );

}



function BookCover({ book, large = false }) {

  return (

    <div

      className={`book-cover ${large ? "cover-large" : ""}`}

      style={{ "--cover": book.color }}

    >

      <span className="cover-brand">AUDIOVERSE SELECTS</span>

      <strong>

        {book.cover.split("\n").map((line, i) => (

          <span key={i}>{line}</span>

        ))}

      </strong>

      <span className="cover-author">{book.author}</span>

    </div>

  );

}



function BookCard({ book, onClick }) {

  return (

    <button className="book-card" onClick={onClick}>

      <BookCover book={book} />

      <div className="book-info">

        <span className="book-category">{book.category}</span>

        <h3>{book.title}</h3>

        <p>{book.author}</p>

        <span className="book-rating">

          ★ <span>4.8</span> <span className="rating-dot">·</span> Audiobook

        </span>

      </div>

      <span className="card-arrow">↗</span>

    </button>

  );

}



function AuthScreen({ mode, setMode, onClose }) {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");

  const [messageType, setMessageType] = useState("info");



  const isSignup = mode === "signup";



  function switchMode(nextMode) {

    setMessage("");

    setMessageType("info");

    setMode(nextMode);

  }



  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setMessageType("info");

    if (isSignup && name.trim().length < 2) {
      setMessageType("error");
      setMessage("Please enter your full name.");
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setMessageType("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setMessageType("error");
      setMessage("Password must contain at least 8 characters.");
      return;
    }

    if (isSignup && password.length > 72) {
      setMessageType("error");
      setMessage("Password must be no longer than 72 characters.");
      return;
    }

    if (isSignup && password !== confirmPassword) {
      setMessageType("error");
      setMessage("Passwords do not match.");
      return;
    }

    if (!isSignup) {
  setMessageType("info");
  setMessage("Signing in...");

  try {
    const response = await fetch(
      "http://localhost:8080/api/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      setMessageType("error");
      setMessage("Invalid email or password.");
      return;
    }

   setMessageType("success");
setMessage(`Welcome back, ${result.name}!`);

setTimeout(() => {
  onClose();
}, 1000);

console.log("Logged-in user:", result);

// TODO: Navigate to the AudioVerse home screen here.
  } catch (error) {
    setMessageType("error");
    setMessage(
      "Cannot connect to the server. Check that your backend is running."
    );
  }

  return;
}

    setMessageType("info");
    setMessage("Creating your account...");

    try {
      const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: normalizedEmail,
          password,
        }),
      });

      const result = await response.text();

      if (!response.ok) {
        if (response.status === 409) {
          throw new Error("This email is already registered. Try signing in instead.");
        }
        if (response.status === 400) {
          throw new Error(result || "Please check your name, email, and password.");
        }
        throw new Error(result || `Account creation failed (HTTP ${response.status}).`);
      }

      setMessageType("success");
      setMessage("Account created successfully! You can now sign in.");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessageType("error");
      if (error instanceof TypeError) {
        setMessage("Cannot connect to the server. Check that the backend is running and allows requests from the frontend.");
      } else {
        setMessage(error.message || "Something went wrong. Please try again.");
      }
    }
  }

  return (

    <div className="auth-overlay">

      <section className="auth-card">

        <button type="button" className="auth-back" onClick={onClose}>

          ← Back to AudioVerse

        </button>



        <div className="auth-logo">♫</div>



        <h2>{isSignup ? "Create your account" : "Welcome back"}</h2>

        <p className="auth-subtitle">

          {isSignup

            ? "Join AudioVerse and start listening."

            : "Sign in to continue your listening journey."}

        </p>



        <form onSubmit={handleSubmit} className="auth-form">

          {isSignup && (

            <label>

              Full name

              <input

                value={name}

                onChange={(e) => setName(e.target.value)}

                autoComplete="name"

                placeholder="Your full name"

                required

              />

            </label>

          )}



          <label>

            Email address

            <input

              type="email"

              value={email}

              onChange={(e) => setEmail(e.target.value)}

              autoComplete="email"

              placeholder="you@example.com"

              required

            />

          </label>



          <label>

            Password

            <input

              type="password"

              value={password}

              onChange={(e) => setPassword(e.target.value)}

              autoComplete={isSignup ? "new-password" : "current-password"}

              placeholder="At least 8 characters"

              minLength={8}

              required

            />

          </label>



          {isSignup && (

            <label>

              Confirm password

              <input

                type="password"

                value={confirmPassword}

                onChange={(e) => setConfirmPassword(e.target.value)}

                autoComplete="new-password"

                placeholder="Re-enter password"

                required

              />

            </label>

          )}



          {message && message !== "NO_ACCOUNT" && (

            <p className="auth-message" role="status">

              {message}

            </p>

          )}



          {message === "NO_ACCOUNT" && (

            <p className="auth-message" role="status">

              No account found? Please{" "}

              <button

                type="button"

                className="auth-inline-link"

                onClick={() => switchMode("signup")}

              >

                create a new account

              </button>

            </p>

          )}



          <button className="primary-button full" type="submit">

            {isSignup ? "Create account →" : "Sign in →"}

          </button>

        </form>



        <p className="auth-switch">

          {isSignup ? (

            <>

              Already have an account?{" "}

              <button type="button" onClick={() => switchMode("login")}>

                Sign in

              </button>

            </>

          ) : (

            <>

              New to AudioVerse?{" "}

              <button type="button" onClick={() => switchMode("signup")}>

                Create account

              </button>

            </>

          )}

        </p>

      </section>

    </div>

  );

}



export default App;

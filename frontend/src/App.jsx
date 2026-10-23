

import { useEffect, useRef, useState } from "react";

import "./App.css";
import "./AudioPlayer.css";

const books = [

  { title: "Atomic Habits", author: "James Clear", category: "Self Help", color: "#e9d5b0", cover: "ATOMIC\nHABITS" },

  { title: "The Silent Patient", author: "Alex Michaelides", category: "Fiction", color: "#c8d8ed", cover: "THE SILENT\nPATIENT" },

  { title: "Ikigai", author: "Héctor García", category: "Self Help", color: "#9bbde1", cover: "IKIGAI" },

  { title: "Deep Work", author: "Cal Newport", category: "Business", color: "#f5c51b", cover: "DEEP\nWORK" },

  { title: "Think Like a Monk", author: "Jay Shetty", category: "Self Help", color: "#8aa8d9", cover: "THINK LIKE\nA MONK" },

  { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", category: "Business", color: "#dfc75d", cover: "RICH DAD\nPOOR DAD" },

];

const tracks = [

  {

    id: 1,

    title: "Moves",

    artist: "Shubh",

    genre: "Punjabi",

    duration: "2:40",

    cover: "/covers/moves.png",

    audioUrl: "/audio/moves.mp3",

  },

  {

    id: 2,

    title: "Mere Khwabon Mein",

    artist: "Lata Mangeshkar",

    genre: "Bollywood",

    duration: "4:17",

    cover: "/covers/mere-khwabon-mein.png",

    audioUrl: "/audio/mere-khwabon-mein.mp3",

  },

  {

    id: 3,

    title: "Champ",

    artist: "Vikram Sarkar & Thoughtt",

    genre: "Punjabi",

    duration: "2:38",

    cover: "/covers/champ.png",

    audioUrl: "/audio/champ.mp3",

  },

  {

    id: 4,

    title: "Legacy",

    artist: "Vikram Sarkar, Billa Sonipat Ala & Thoughtt",

    genre: "Punjabi",

    duration: "2:49",

    cover: "/covers/legacy.png",

    audioUrl: "/audio/legacy.mp3",

  },

];

const navItems = [

  ["⌂", "Home"],

  ["♫", "Music"],

  ["▤", "Audiobooks"],

  ["⌕", "Search"],

  ["♡", "My Library"],

  ["♙", "Profile"],

];

function App() {

  const [active, setActive] = useState("Music");

  const [currentTrack, setCurrentTrack] = useState(tracks[0]);

const [musicPlaying, setMusicPlaying] = useState(false);
const [playerExpanded, setPlayerExpanded] = useState(false);

const [currentTime, setCurrentTime] = useState(0);

const [duration, setDuration] = useState(0);

const audioRef = useRef(null);

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

function playTrack(track) {

  if (currentTrack.id === track.id) {

    setMusicPlaying((playing) => !playing);

    return;

  }

  setCurrentTrack(track);

  setCurrentTime(0);

  setMusicPlaying(true);

}

function playNextTrack() {

  const currentIndex = tracks.findIndex(

    (track) => track.id === currentTrack.id

  );

  const nextIndex = (currentIndex + 1) % tracks.length;

  setCurrentTrack(tracks[nextIndex]);

  setCurrentTime(0);

  setMusicPlaying(true);

}

function playPreviousTrack() {

  const currentIndex = tracks.findIndex(

    (track) => track.id === currentTrack.id

  );

  const previousIndex =

    (currentIndex - 1 + tracks.length) % tracks.length;

  setCurrentTrack(tracks[previousIndex]);

  setCurrentTime(0);

  setMusicPlaying(true);

}

useEffect(() => {

  const audio = audioRef.current;

  if (!audio) return;

  if (musicPlaying) {

    audio.play().catch((error) => {

      console.error("Audio playback failed:", error);

      setMusicPlaying(false);

    });

  } else {

    audio.pause();

  }

}, [currentTrack, musicPlaying]);

function formatTime(seconds) {

  if (!Number.isFinite(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);

  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;

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

  <section className="hero">

    <div className="hero-copy">

      <span className="pill">WELCOME TO AUDIOVERSE</span>

      <h2>

        Your music.

        <br />

        Your <span className="gold">universe.</span>

      </h2>

      <p>

        Discover your next favourite song, explore new artists,

        and enjoy the sounds that move you.

      </p>

      <button

        className="primary-button"

        onClick={() => setActive("Music")}

      >

        Explore music ↗

      </button>

      <button

        className="secondary-button"

        onClick={() => setActive("Audiobooks")}

      >

        Explore audiobooks

      </button>

    </div>

    <div className="hero-art">

      <div className="sound-ring">♫</div>

      <div className="sound-bars">

        {[28, 48, 70, 42, 86, 58, 34, 68, 45, 25].map(

          (height, i) => (

            <i key={i} style={{ height }} />

          )

        )}

      </div>

      <span>LISTEN BEYOND</span>

    </div>

  </section>

)}

{active === "Music" && (

  <>

    <section className="hero">

      <div className="hero-copy">

        <span className="pill">YOUR DAILY SOUNDTRACK</span>

        <h2>

          Feel every

          <br />

          <span className="gold">beat.</span>

        </h2>

        <p>

          Discover new sounds, revisit your favourites,

          and find the music for every moment.

        </p>

        <button

          className="primary-button"

          onClick={() => setActive("Search")}

        >

          Discover music ↗

        </button>

      </div>

      <div className="hero-art">

        <div className="sound-ring">♫</div>

        <div className="sound-bars">

          {[28, 48, 70, 42, 86, 58, 34, 68, 45, 25].map(

            (height, i) => (

              <i key={i} style={{ height }} />

            )

          )}

        </div>

        <span>YOUR SOUND. YOUR WORLD.</span>

      </div>

    </section>

    <div className="section-heading">

      <div>

        <p className="eyebrow">EXPLORE YOUR TASTE</p>

        <h2>Browse genres</h2>

      </div>

    </div>

    <section className="category-grid">

      {["Pop", "Rock", "Lo-fi", "Classical"].map(

        (genre, i) => (

          <button

            key={genre}

            className={`category category-${i}`}

            onClick={() => {

              setQuery(genre);

              setActive("Search");

            }}

          >

            <span>{["♫", "♬", "☾", "♪"][i]}</span>

            {genre}

            <span className="category-arrow">↗</span>

          </button>

        )

      )}

    </section>

    <div className="section-heading">

  <div>

    <p className="eyebrow">YOUR SOUNDTRACK</p>

    <h2>Popular tracks</h2>

  </div>

</div>

<section className="music-track-list">

  {tracks.map((track) => (

    <div className="music-track" key={track.id}>

      <img

        className="music-track-cover"

        src={track.cover}

        alt={`${track.title} cover`}

      />

      <div className="music-track-info">

        <h3>{track.title}</h3>

        <p>

          {track.artist} · {track.duration}

        </p>

        <span>{track.genre}</span>

      </div>

      <button

        type="button"

        className="music-play-button"

        onClick={() => playTrack(track)}
        aria-label={currentTrack.id === track.id && musicPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
      >
        {currentTrack.id === track.id && musicPlaying ? "Ⅱ" : "▶"}

      </button>

    </div>

  ))}

</section>

    <div className="section-heading">

      <div>

        <p className="eyebrow">MORE TO EXPLORE</p>

        <h2>Love listening to stories?</h2>

      </div>

    </div>

    <section className="hero">

      <div className="hero-copy">

        <span className="pill">DISCOVER AUDIOBOOKS</span>

        <p>

          Take a break from music and dive into stories,

          ideas, and new worlds.

        </p>

        <button

          className="primary-button"

          onClick={() => setActive("Audiobooks")}

        >

          Explore audiobooks ↗

        </button>

      </div>

    </section>

  </>

)}

{active === "Audiobooks" && (

  <>

    <div className="section-heading">

      <div>

        <p className="eyebrow">YOUR NEXT LISTEN</p>

        <h2>Explore audiobooks</h2>

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

        No audiobooks found. Try another search.

      </p>

    )}

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

        {active === "My Library" && (

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

      {/* Audio stays mounted across navigation so track playback works on every page. */}
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        preload="metadata"
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onEnded={playNextTrack}
        onError={() => {
          setMusicPlaying(false);
          console.error("Audio failed to load:", currentTrack.audioUrl);
        }}
      />

      {/* YouTube Music-style mini player: tap the bar to expand it. */}
      <section
        className="av-mini-player"
        aria-label="Now playing"
        onClick={() => setPlayerExpanded(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setPlayerExpanded(true);
          }
        }}
      >
        <div className="av-mini-progress-track">
          <div
            className="av-mini-progress-fill"
            style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
          />
        </div>
        <img className="av-mini-cover" src={currentTrack.cover} alt={`${currentTrack.title} cover`} />
        <div className="av-mini-info">
          <strong>{currentTrack.title}</strong>
          <span>{currentTrack.artist}</span>
        </div>
        <button
          type="button"
          className="av-mini-control"
          aria-label={musicPlaying ? "Pause" : "Play"}
          onClick={(event) => {
            event.stopPropagation();
            setMusicPlaying((value) => !value);
          }}
        >
          {musicPlaying ? "Ⅱ" : "▶"}
        </button>
        <button
          type="button"
          className="av-mini-control av-mini-next"
          aria-label="Next track"
          onClick={(event) => {
            event.stopPropagation();
            playNextTrack();
          }}
        >
          ▶|
        </button>
        <button
          type="button"
          className="av-mini-expand"
          aria-label="Expand player"
          onClick={(event) => {
            event.stopPropagation();
            setPlayerExpanded(true);
          }}
        >
          ⌃
        </button>
      </section>

      {playerExpanded && (
        <div className="av-player-overlay" role="dialog" aria-modal="true" aria-label="Now playing">
          <div className="av-expanded-player">
            <header className="av-player-header">
              <button
                type="button"
                className="av-player-close"
                onClick={() => setPlayerExpanded(false)}
                aria-label="Minimize player"
              >
                ⌄
              </button>
              <div className="av-player-header-copy">
                <span>NOW PLAYING</span>
                <strong>AudioVerse</strong>
              </div>
              <button
                type="button"
                className="av-player-more"
                onClick={() => setPlayerExpanded(false)}
                aria-label="Close player"
              >
                ⋯
              </button>
            </header>

            <div className="av-expanded-art-wrap">
              <img className="av-expanded-cover" src={currentTrack.cover} alt={`${currentTrack.title} cover`} />
            </div>

            <div className="av-expanded-track-details">
              <div className="av-expanded-track-copy">
                <h2>{currentTrack.title}</h2>
                <p>{currentTrack.artist}</p>
              </div>
              <span className="av-track-like" aria-label="Like track">♡</span>
            </div>

            <div className="av-expanded-seek">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={Math.min(currentTime, duration || 0)}
                onChange={(event) => {
                  const nextTime = Number(event.target.value);
                  if (audioRef.current) audioRef.current.currentTime = nextTime;
                  setCurrentTime(nextTime);
                }}
                aria-label="Seek through track"
                style={{ "--av-seek-progress": `${duration ? (currentTime / duration) * 100 : 0}%` }}
              />
              <div className="av-time-labels">
                <span>{formatTime(currentTime)}</span>
                <span>-{formatTime(Math.max(0, duration - currentTime))}</span>
              </div>
            </div>

            <div className="av-expanded-controls">
              <button type="button" aria-label="Previous track" className="av-skip-control" onClick={playPreviousTrack}>|◀</button>
              <button
                type="button"
                aria-label={musicPlaying ? "Pause music" : "Play music"}
                className="av-main-play-control"
                onClick={() => setMusicPlaying((value) => !value)}
              >
                {musicPlaying ? "Ⅱ" : "▶"}
              </button>
              <button type="button" aria-label="Next track" className="av-skip-control" onClick={playNextTrack}>▶|</button>
            </div>

            <div className="av-up-next">
              <div className="av-up-next-heading">
                <strong>Up next</strong>
                <span>{tracks.length} tracks</span>
              </div>
              {tracks.map((track) => (
                <button
                  type="button"
                  key={track.id}
                  className={`av-queue-track ${currentTrack.id === track.id ? "is-current" : ""}`}
                  onClick={() => playTrack(track)}
                >
                  <img src={track.cover} alt="" />
                  <span className="av-queue-copy">
                    <strong>{track.title}</strong>
                    <small>{track.artist}</small>
                  </span>
                  <span className="av-queue-duration">{track.duration}</span>
                  {currentTrack.id === track.id && <span className="av-queue-playing">♫</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

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

      "http\://localhost:8080/api/users/login",

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

      const response = await fetch("http\://localhost:8080/api/users", {

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

              placeholder="you\@example.com"

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

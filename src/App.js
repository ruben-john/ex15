import React, { useState, useEffect, useRef, useReducer, createContext, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import PropTypes from 'prop-types';
import './App.css';

// 1. Header, Content, Footer Components
function Header({ title }) {
  return <h1>{title}</h1>;
}

function Content() {
  const jokes = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "Parallel lines have so much in common. It’s a shame they’ll never meet.",
    "I told my computer I needed a break, and it said 'No problem!'"
  ];

  const [joke, setJoke] = useState('');

  const getRandomJoke = () => {
    const random = jokes[Math.floor(Math.random() * jokes.length)];
    setJoke(random);
  };

  return (
    <div>
      <button onClick={getRandomJoke}>Get Joke</button>
      <p>{joke}</p>
    </div>
  );
}

function Footer() {
  return <footer>© 2025 Joke App. All rights reserved.</footer>;
}

// 2. Styled Buttons
function StyledButtonInline() {
  return (
    <button style={{ backgroundColor: 'blue', padding: '10px 20px', fontSize: '16px', color: 'white' }}>
      Inline Styled Button
    </button>
  );
}

function StyledButtonInternal() {
  return (
    <>
      <style>
        {`
          .internal-btn {
            background-color: green;
            padding: 10px 20px;
            font-size: 16px;
            color: white;
            border: none;
          }
        `}
      </style>
      <button className="internal-btn">Internal Styled Button</button>
    </>
  );
}

function StyledButtonExternal() {
  return (
    <button className="external-btn">External Styled Button</button>
  );
}

// 5. Lifecycle Demo
class LifecycleDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    console.log("Constructor");
  }

  componentDidMount() {
    console.log("Component Did Mount");
  }

  componentDidUpdate() {
    console.log("Component Did Update");
  }

  componentWillUnmount() {
    console.log("Component Will Unmount");
  }

  render() {
    return (
      <div>
        <h3>Lifecycle Demo</h3>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Update Count
        </button>
      </div>
    );
  }
}

function LifecycleContainer() {
  const [show, setShow] = useState(true);
  return (
    <div>
      <button onClick={() => setShow(!show)}>
        {show ? "Unmount" : "Mount"} Component
      </button>
      {show && <LifecycleDemo />}
    </div>
  );
}

// 6. useState and useReducer Counter
function CounterState() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h3>Counter (useState)</h3>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <button onClick={() => setCount(count - 1)}>Decrease</button>
      <p>Count: {count}</p>
    </div>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    default: return state;
  }
}

function CounterReducer() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <div>
      <h3>Counter (useReducer)</h3>
      <button onClick={() => dispatch({ type: 'increment' })}>Increase</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrease</button>
      <p>Count: {state.count}</p>
    </div>
  );
}

// 7. useEffect Fetch Joke
function JokeFetcher() {
  const [joke, setJoke] = useState('');

  const fetchJoke = async () => {
    const res = await fetch('https://official-joke-api.appspot.com/random_joke');
    const data = await res.json();
    setJoke(`${data.setup} - ${data.punchline}`);
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div>
      <h3>Random Joke (API)</h3>
      <button onClick={fetchJoke}>Refresh Joke</button>
      <p>{joke}</p>
    </div>
  );
}

// 8. useRef
function InputFocus() {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <h3>useRef Focus Input</h3>
      <input ref={inputRef} type="text" placeholder="Type here..." />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}

// 9. useContext for Theme
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'light-theme' : 'dark-theme'}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

function ThemeToggler() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div>
      <h3>Theme: {theme}</h3>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

// 10 & 11. Props + Validation
function Child({ message }) {
  return <p>Message from parent: {message}</p>;
}

Child.propTypes = {
  message: PropTypes.string.isRequired
};

function Parent() {
  return <Child message="Hello from Parent!" />;
}

// 12. Form useState & useRef
function FormWithState() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Name: ${name}, Email: ${email}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Form (useState)</h3>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <button type="submit">Submit</button>
      <p>Live Name: {name}</p>
      <p>Live Email: {email}</p>
    </form>
  );
}

function FormWithRef() {
  const nameRef = useRef();
  const emailRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Name: ${nameRef.current.value}, Email: ${emailRef.current.value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Form (useRef)</h3>
      <input ref={nameRef} placeholder="Name" />
      <input ref={emailRef} placeholder="Email" />
      <button type="submit">Submit</button>
    </form>
  );
}

// Main App
function App() {
  return (
    <ThemeProvider>
      <Header title="Joke App + React Demos" />
      <Content />
      <StyledButtonInline />
      <StyledButtonInternal />
      <StyledButtonExternal />
      <Footer />
      <hr />
      <LifecycleContainer />
      <CounterState />
      <CounterReducer />
      <JokeFetcher />
      <InputFocus />
      <ThemeToggler />
      <Parent />
      <FormWithState />
      <FormWithRef />
    </ThemeProvider>
  );
}

export default App;

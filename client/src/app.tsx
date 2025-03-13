import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import LessonPage from "@/pages/lesson-page";
import PracticePage from "@/pages/practice-page";
import AboutPage from "@/pages/about-page";

function NavBar() {
  return (
    <nav>
      <img src="/logo.png" alt="Linguify Logo" style={{ width: '150px', height: 'auto' }} /> {/* Enlarged logo */}
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/lessons">Lessons</Link></li>
        <li><Link to="/practice">Practice</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
}

function AboutPage() {
  return (
    <div>
      <h1>About Linguify</h1>
      <p>
        Sign-up: Users create an account and set their language learning goals.
        Chatbot Practice: Users practice conversing with our AI-powered chatbot, which responds to their inputs and helps them improve their language skills.
        Progress Bar: A progress bar shows users how far they've come, motivating them to continue learning.
      </p>
      <h2>Our Mission</h2>
      <p>
        Linguify is a cutting-edge language learning platform designed to help individuals achieve their language goals. Our mission is to make language learning accessible, engaging, and fun for everyone.
        With a team of passionate language enthusiasts and experts in AI technology, we've created a unique platform that combines interactive lessons, conversational practice, and personalized progress tracking.
      </p>
      <h2>Contact</h2>
      <p>
        Email: <a href="mailto:Codewithblakish@gmail.com">Codewithblakish@gmail.com</a><br />
        Website: <a href="https://codewithblakish.netlify.app/">https://codewithblakish.netlify.app/</a><br />
        WhatsApp: <a href="https://wa.me/+2348182039201">+2348182039201</a><br />
        Phone: 08182039201
      </p>
    </div>
  );
}


function App() {
  return (
    <Router>
      <NavBar />
      <div>
        <Route path="/" exact component={HomePage} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/lessons" component={LessonPage} />
        <Route path="/practice" component={PracticePage} />
        <Route path="/about" component={AboutPage} />
      </div>
    </Router>
  );
}

export default App;
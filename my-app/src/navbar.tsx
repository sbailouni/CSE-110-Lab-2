
import { Link } from "react-router-dom";
import "./App.css"

export const Navbar = () => {
  return (
	<div className="navbar-container">
		<nav className="navbar">
			<Link to="/" className="nav-link">Home</Link>
			<Link to="/todolist/ABC" className="nav-link">ABC To Do List</Link>
			<Link to="/todolist/DEF" className="nav-link">DEF To Do List</Link>
		</nav>
	</div>
  );
};
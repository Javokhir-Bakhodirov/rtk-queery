import "./App.css";
import Nav from "./components/navbar/Nav";
import RouteController from "./routes";
import { useLocation } from "react-router-dom";
function App() {
	const location = useLocation();
	return (
		<>
			{location.pathname !== "/login" && <Nav />}
			<main>
				<RouteController />
			</main>
		</>
	);
}

export default App;

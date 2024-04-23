
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./main.css";
import { store } from './app/Store.tsx';
import { Provider } from 'react-redux';



ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
    <App/>
    </Provider>
);

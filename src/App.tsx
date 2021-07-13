import { Switch, Route, Redirect } from "react-router-dom";
import { Main } from "containers/Main";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Redirect from="*" to="/" />
    </Switch>
  );
}

export default App;

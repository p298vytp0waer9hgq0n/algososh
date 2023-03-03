import { BrowserRouter, Route, Switch } from "react-router-dom";
import { FibonacciPage } from "../fibonacci-page/fibonacci-page";
import { ListPage } from "../list-page/list-page";
import { MainPage } from "../main-page/main-page";
import { QueuePage } from "../queue-page/queue-page";
import { StringComponent } from "../string/string";
import { SortingPage } from "../sorting-page/sorting-page";
import { StackPage } from "../stack-page/stack-page";

import { basename } from "../../constants/deploy";
import { ROUTES } from "../../constants/routes";

function App() {
  return (
    <div className="app">
      <BrowserRouter basename={basename}>
        <Switch>
          <Route path={ROUTES.HOME} exact>
            <MainPage />
          </Route>
          <Route path={ROUTES.STRING}>
            <StringComponent />
          </Route>
          <Route path={ROUTES.FIBONACCI}>
            <FibonacciPage />
          </Route>
          <Route path={ROUTES.SORTING}>
            <SortingPage />
          </Route>
          <Route path={ROUTES.STACK}>
            <StackPage />
          </Route>
          <Route path={ROUTES.QUEUE}>
            <QueuePage />
          </Route>
          <Route path={ROUTES.LIST}>
            <ListPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

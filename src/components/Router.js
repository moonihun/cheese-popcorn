import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Home from 'routes/Home';
import Search from 'routes/Search';
import TV from 'routes/TV';
import Detail from 'routes/Detail';
import Header from './Header';

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/tv' exact component={TV} />
        <Route path='/search' component={Search} />
        <Route path='/movie/:id' component={Detail} />
        <Route path='/tv/:id' component={Detail} />
        <Redirect from='*' to='/' />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;

import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Navigation } from "@/components/Navigation";
import NotFound from "@/pages/not-found";

// Pages
import Home from "@/pages/Home";
import News from "@/pages/News";
import Menu from "@/pages/Menu";
import Clubs from "@/pages/Clubs";
import Sports from "@/pages/Sports";
import Events from "@/pages/Events";

function Router() {
  return (
    <Switch>
      {/* Exact match for the main URL */}
      <Route path="/" component={Home} />

      <Route path="/news" component={News} />
      <Route path="/news/:id" component={News} />
      <Route path="/menu" component={Menu} />
      <Route path="/clubs" component={Clubs} />
      <Route path="/sports" component={Sports} />
      <Route path="/events" component={Events} />

      {/* Fallback: If the path is unknown or empty during wake-up, show Home */}
      <Route path="/:rest*" component={Home} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
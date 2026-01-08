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
import Dates from "./pages/Dates";
import SnowDay from "./pages/SnowDay";
import Pro from "./pages/Pro";
import SchoolGuide from "./pages/SchoolGuide";

// Stub components for missing pages to prevent runtime errors
const About = () => <div className="p-20 text-center">About Page Coming Soon</div>;
const MapPage = () => <div className="p-20 text-center">School Map Coming Soon</div>;

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/news" component={News} />
      <Route path="/news/:id" component={News} />
      <Route path="/menu" component={Menu} />
      <Route path="/clubs" component={Clubs} />
      <Route path="/sports" component={Sports} />
      <Route path="/events" component={Events} />
      <Route path="/dates" component={Dates} />
      <Route path="/snow-day" component={SnowDay} />
      <Route path="/guide" component={SchoolGuide} />
      <Route path="/pro" component={Pro} />
      <Route path="/about" component={About} />
      <Route path="/map" component={MapPage} />
      <Route component={NotFound} />
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
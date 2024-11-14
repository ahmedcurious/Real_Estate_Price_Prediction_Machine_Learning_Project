import "./App.css";
import FormProperty from "./components/FormProperty";
import Header from "./components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Locations from "./components/Locations";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-teal-50">
        <Header />
        <FormProperty />
        <Locations />
      </div>
    </QueryClientProvider>
  );
}

export default App;

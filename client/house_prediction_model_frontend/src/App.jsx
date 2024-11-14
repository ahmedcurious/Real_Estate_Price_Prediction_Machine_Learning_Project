import "./App.css";
import FormProperty from "./components/FormProperty";
import Header from "./components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-teal-50">
        <Header />
        <FormProperty />
      </div>
    </QueryClientProvider>
  );
}

export default App;

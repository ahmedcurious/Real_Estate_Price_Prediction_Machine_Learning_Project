import "./App.css";
import FormProperty from "./components/FormProperty";
import Header from "./components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRef } from "react";

const queryClient = new QueryClient();

function App() {
  const formRef = useRef(null);

  const scrollToFormProperty = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-teal-50 flex flex-col gap-12">
        <Header onScrollToForm={scrollToFormProperty} />
        <FormProperty ref={formRef} />
      </div>
    </QueryClientProvider>
  );
}

export default App;

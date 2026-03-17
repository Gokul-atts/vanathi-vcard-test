import Header from "./components/header";
import Hero from "./components/hero";
import Footer from "./components/footer";
import { Toaster } from "sonner";
function App() {
  return (
    <>
     <Toaster
        position="top-right"
        toastOptions={{
          className: "custom-toast",
          descriptionClassName: "custom-description",
        }}
      />
      <Header />
      <Hero />

      <Footer />
    </>
  );
}

export default App;

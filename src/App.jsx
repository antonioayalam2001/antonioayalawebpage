import './i18n';
import {Experience, Footer, Hero, NavBar, Projects, Services, Values} from "./components/";
import { InteractiveEnvironment } from "./components/InteractiveEnvironment";

function App() {
    return (
        <InteractiveEnvironment>
            <div className="min-h-screen text-white font-sans overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <NavBar/>
                </div>

                <main className="max-w-7xl mx-auto px-6 md:px-12">
                    <Hero/>
                    <Services/>
                    <Values/>
                    <Experience/>
                    <Projects/>
                </main>

                <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 border-t border-white/5 pt-8">
                    <Footer/>
                </div>
            </div>
        </InteractiveEnvironment>
    )
}

export default App;

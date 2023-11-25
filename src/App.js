/*
  copyright @se0in 
  GitHub Link :https://github.com/se0in
  Created Date : 2023.11.20.
 */

import './App.css';
import FlowText from './components/FlowText';
import Footer from './components/Footer';
import SlideEmoticon from './components/SlideEmoticon';
import GradationText from './components/GradationText';
import Title from './components/Title';



function App() {


  return (
    <div className="App">
      <Title />
      <SlideEmoticon />
      <FlowText />
      <GradationText />
      <Footer />
    </div>
  );
}

export default App;

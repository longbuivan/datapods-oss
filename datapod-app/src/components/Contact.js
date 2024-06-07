import { useState } from 'react';
import Nav from './Nav';


const Contact = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add your logic for handling the form submission, such as sending the email address to your server

    console.log('Submitted email:', email);
    // Set submitted state to true to display a success message
    setSubmitted(true);
  };

  return (
    // <div className="container mx-auto py-8">
    <div className={darkMode ? "dark" : ""}>
    <div className="bg-white dark:bg-black text-black dark:text-white">
        <header className=" shadow">
            <div className="container mx-auto px-4 py-1 flex justify-between items-center">
            <div className="container mx-auto px-4 py-4 space-x-4 flex justify-left items-center">
                <img src={"icon.svg"} alt="DataPods" className="h-8" />{" "}
                {/* Use the imported SVG */}
                <h1 className="text-xl font-bold">DataPods</h1>
            </div>
            <Nav isDarkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            </div>
        </header>

    <div className="max-w-2xl mx-auto mb-8">
    <div className="container mx-auto py-12 px-4">

      <h1 className="text-3xl font-bold px-8 mb-4">Contact Us</h1>
      <iframe class="airtable-embed" src="https://airtable.com/embed/app3gMAt41n7ML6lZ/pagHPlaARu8qGvyS3/form" frameborder="0" onmousewheel="" width="100%" height="533" ></iframe>
      </div>
      </div>
    </div>
    
    </div>
  );
}

export default Contact;
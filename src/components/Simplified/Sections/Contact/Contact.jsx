import React from 'react';
import SectionTitle from '../../UI/SectionTitle';

export default function Contact() {
  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center items-center text-center px-4 bg-gray-100 dark:bg-gray-800">
      <SectionTitle text="Contact" />
      <p className="mt-4 text-lg md:text-xl max-w-xl text-gray-700 dark:text-gray-200">
        Feel free to reach out via email at <a href="mailto:youremail@example.com" className="text-accent underline">youremail@example.com</a> or connect on <a href="https://www.linkedin.com/" className="text-accent underline">LinkedIn</a>.
      </p>
    </section>
  );
}


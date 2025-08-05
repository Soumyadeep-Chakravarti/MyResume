// src/pages/SignUpPage.jsx
import React from 'react'; // No need for useState, useEffect here anymore
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react'; // Only X for the close button
import { motion } from 'framer-motion'; // Only motion for page-level animations
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import SignUpForm from '../components/SignUp/SignUpForm'; // Corrected import path for SignUpForm

// Animation variants for the animated background section (for the text side)
const animationSectionVariants = {
    hidden: { opacity: 0, x: 100 }, // Slide in from right
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.7,
            ease: 'easeOut',
            delay: 0.2, // Delay animation section slightly after form starts
        },
    },
};

// CORRECTED: SignUpPage now correctly accepts setShowLogin as a destructured prop
const SignUpPage = ({ setShowLogin }) => {
    const navigate = useNavigate();

    return (
        <div className="w-full min-h-screen bg-background text-text-primary flex flex-col">
            {/* CORRECTED: Pass setShowLogin to Navbar */}
            <Navbar setShowLogin={setShowLogin} />
            <main className="flex-grow flex flex-col md:flex-row justify-center items-center p-4 md:p-8 relative"> {/* REMOVED overflow-hidden from main */}

                {/* Full-blown Blurred Animated Background */}
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-gradient-hero-from to-gradient-hero-to filter blur-lg">
                    {/* Background decorative elements (reusing blob animation) */}
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-hover rounded-full mix-blend-multiply filter opacity-50 animate-blob"></div>
                    <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-secondary-hover rounded-full mix-blend-multiply filter opacity-50 animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-60 h-60 bg-accent-dark rounded-full mix-blend-multiply filter opacity-50 animate-blob animation-delay-4000"></div>
                    <div className="absolute top-1/3 left-1/2 w-56 h-56 bg-primary/30 rounded-full mix-blend-multiply filter opacity-50 animate-blob animation-delay-1000"></div>
                    <div className="absolute bottom-1/2 right-1/3 w-68 h-68 bg-secondary/30 rounded-full mix-blend-multiply filter opacity-50 animate-blob animation-delay-3000"></div>
                </div>

                {/* Animated Section (Left side on desktop) - Now on top of the blurred background */}
                <motion.div
                    className="relative z-10 hidden md:flex flex-col justify-center items-center w-full md:w-1/2 min-h-[300px] md:min-h-[500px]
                               bg-card-background/70 rounded-2xl shadow-xl p-8 backdrop-blur-sm
                               text-text-primary text-center mr-0 md:mr-8 mb-8 md:mb-0 border border-border-color/50"
                    initial="hidden"
                    animate="visible"
                    variants={animationSectionVariants}
                >
                    <div className="relative z-10">
                        <h2 className="text-4xl font-bold mb-4">Join Our Community!</h2>
                        <p className="text-lg opacity-90">
                            Unlock powerful features and streamline your workflow.
                            Sign up now and start your journey with us.
                        </p>
                    </div>
                </motion.div>

                {/* Sign Up Form (Right side on desktop) - Now on top of the blurred background */}
                <div className='relative z-10 w-full md:w-1/2 max-w-md'> {/* Wrapper for the form component */}
                    {/* Close button for the page, not the form itself */}
                    <motion.button
                        type="button"
                        onClick={() => navigate('/')}
                        className='absolute top-5 right-5 cursor-pointer text-text-secondary hover:text-red-500 transition z-20' // Higher z-index to ensure it's clickable
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 0.5 } }}
                    >
                        <X size={22} />
                    </motion.button>
                    <SignUpForm /> {/* Render the extracted SignUpForm component */}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default SignUpPage;

// src/pages/ContactPage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useRef } from 'react';

const Navbar = React.lazy(() => import('../components/Navbar/Navbar.jsx')); // Lazy load Navbar
const Footer = React.lazy(() => import('../components/Footer/Footer.jsx')); // Lazy load Footer

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
        },
    },
};

const ContactPage = ({ setShowLogin }) => { // Accept setShowLogin prop
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
        .sendForm(serviceID, templateID, form.current, {
            publicKey: publicKey,
        })
        .then(
            () => {
            console.log('SUCCESS!');
            },
            (error) => {
            console.log('FAILED...', error.text);
            },
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendEmail(e);
        console.log('Contact Form Submitted:', formData);
        // Here you would typically send this data to a backend service
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
    };

    const form = useRef();

    const publicKey = 'LJUpXNOJo5BlUAWbK'; // Replace with your actual EmailJS public key
    const serviceID = 'service_dux8itb'; // Replace with your actual service ID
    const templateID = 'template_5oudoyc'; // Replace with your actual template ID

    return (
        <div className="w-full min-h-screen bg-background text-text-primary">
            <Navbar setShowLogin={setShowLogin} /> {/* Pass setShowLogin to Navbar */}

            <main className="relative w-full py-20 overflow-x-hidden">
                {/* Contact Page Header */}
                <section className="text-center py-20 px-4 sm:px-6 md:px-8">
                    <motion.h1
                        className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text
                                   bg-gradient-to-r from-primary to-secondary mb-6 leading-tight drop-shadow-lg"
                        initial="hidden"
                        animate="visible"
                        variants={itemVariants}
                    >
                        Get in Touch
                    </motion.h1>
                    <motion.p
                        className="text-xl text-text-secondary max-w-3xl mx-auto mb-12"
                        initial="hidden"
                        animate="visible"
                        variants={itemVariants}
                        transition={{ delay: 0.2 }}
                    >
                        Have questions, feedback, or need support? We're here to help!
                    </motion.p>
                </section>

                {/* Contact Content */}
                <motion.section
                    className="px-4 sm:px-6 md:px-8 pb-20 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={containerVariants}
                >
                    {/* Contact Form */}
                    <motion.div className="bg-card-background p-8 rounded-xl shadow-lg border border-border-color/50" variants={itemVariants}>
                        <h2 className="text-3xl font-bold text-text-primary mb-6">Send Us a Message</h2>
                        <form onSubmit={handleSubmit} ref={form} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg border border-border-color bg-background focus:ring-2 focus:ring-primary outline-none text-text-primary"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">Your Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg border border-border-color bg-background focus:ring-2 focus:ring-primary outline-none text-text-primary"
                                    placeholder="john.doe@example.com"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-text-secondary mb-2">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg border border-border-color bg-background focus:ring-2 focus:ring-primary outline-none text-text-primary"
                                    placeholder="Regarding your service..."
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">Your Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="5"
                                    className="w-full p-3 rounded-lg border border-border-color bg-background focus:ring-2 focus:ring-primary outline-none text-text-primary resize-y"
                                    placeholder="Type your message here..."
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-colors duration-300 shadow-md"
                            >
                                <Send size={20} /> Send Message
                            </button>
                        </form>
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div className="bg-card-background p-8 rounded-xl shadow-lg border border-border-color/50" variants={itemVariants}>
                        <h2 className="text-3xl font-bold text-text-primary mb-6">Contact Information</h2>
                        <div className="space-y-6 text-text-secondary">
                            <div className="flex items-center gap-4">
                                <Mail size={24} className="text-accent" />
                                <div>
                                    <h3 className="font-semibold text-text-primary">Email Us</h3>
                                    <p>support@teambyteops.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Phone size={24} className="text-accent" />
                                <div>
                                    <h3 className="font-semibold text-text-primary">Call Us</h3>
                                    <p>+1 (123) 456-7890</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <MapPin size={24} className="text-accent" />
                                <div>
                                    <h3 className="font-semibold text-text-primary">Our Office</h3>
                                    <p>123 ByteOps Avenue, Suite 456</p>
                                    <p>Tech City, TX 78701, USA</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.section>
            </main>

            <Footer />
        </div>
    );
};

export default ContactPage;

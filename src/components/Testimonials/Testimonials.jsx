// src/components/Testimonials/Testimonials.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react'; // For rating stars

const testimonialContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

const testimonialItemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: 'easeOut' } },
};

const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const Testimonials = () => {
    const testimonials = [
        {
            quote: "This platform has revolutionized our workflow. The speed and security are unmatched!",
            author: "Jane Doe",
            title: "CEO, Tech Innovators",
            rating: 5,
        },
        {
            quote: "Intuitive design and seamless integration. It's exactly what we needed to boost productivity.",
            author: "John Smith",
            title: "Lead Developer, CodeCrafters",
            rating: 5,
        },
        {
            quote: "Outstanding support and powerful features. Highly recommend for any growing business.",
            author: "Emily White",
            title: "Marketing Director, Growth Solutions",
            rating: 4,
        },
        {
            quote: "A truly robust and reliable solution. Our team's efficiency has never been higher.",
            author: "Michael Brown",
            title: "Operations Manager, Streamline Corp",
            rating: 5,
        },
    ];

    return (
        <section className="py-20 px-4 sm:px-6 md:px-8 bg-card-background text-text-primary">
            <div className="max-w-6xl mx-auto text-center">
                <motion.h2
                    className="text-4xl sm:text-5xl font-bold mb-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={textVariants}
                >
                    What Our Users Say
                </motion.h2>
                <motion.p
                    className="text-lg text-text-secondary mb-12 max-w-2xl mx-auto"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
                    variants={textVariants}
                >
                    Hear directly from our satisfied customers about how our platform has made a difference.
                </motion.p>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={testimonialContainerVariants}
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            className="bg-background p-8 rounded-xl shadow-lg border border-border-color/50
                                       flex flex-col items-center text-center transition-all duration-300
                                       hover:shadow-xl hover:scale-[1.02]"
                            variants={testimonialItemVariants}
                        >
                            <div className="flex mb-4">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        size={20}
                                        className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}
                                    />
                                ))}
                            </div>
                            <p className="text-lg italic mb-6 text-text-primary">
                                "{testimonial.quote}"
                            </p>
                            <div className="font-semibold text-text-primary">
                                <p>{testimonial.author}</p>
                                <p className="text-sm text-text-secondary">{testimonial.title}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;

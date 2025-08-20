import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/customersupport.css';

function Customersupport() {
    useEffect(() => {
        const sections = document.querySelectorAll('section');
        if (!sections.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        sections.forEach((section) => observer.observe(section));

        return () => {
            observer.disconnect();
        };
    }, []);

    const headingText = 'Customer Support';
    const words = headingText.split(" ");

    return (
        <div className="customer-support-wrapper">
            <section className="hero">
                <div className="hero-content">
                    <h1 className="animate-letters">
                        {words.map((word, index) => (
                            <React.Fragment key={index}>
                                <span className="word" style={{ '--word-index': index }}>
                                    {word}
                                </span>
                                {index < words.length - 1 && ' '}
                            </React.Fragment>
                        ))}
                    </h1>
                    <p className="animate-slide">
                       We’re here to assist you at every step with your Finike Lithium products, ensuring seamless performance and support.
                    </p>
                </div>
            </section>
            <section>
                <div id="supportid">
                    <h1>Customer Support</h1>
                    <p>
                        Finike Lithium Care <br />
                       We pride ourselves on offering top-notch pre and post-sales support to all our customers. Connect with us – we’d love to hear from you!
                    </p>
                </div>
            </section>
            <section id="supportserviceid">
                <div>
                    <Link to="/warranty" id="techsup">
                        <i className="fas fa-certificate"></i> Warranty Register
                    </Link>
                </div>
                <div>
                    <Link to="/technical-support">
                        <i className="fas fa-triangle-exclamation"></i> Register Complaint
                    </Link>
                </div>
                <div>
                    <Link to="/contact-us">
                        <i className="fas fa-envelope"></i> Contact Us
                    </Link>
                </div>
                <div>
                    <Link to="/get-quote">
                    <i>Get a Quote</i>
                    </Link>
                </div>
                <div>
                    <Link to="/online-payment">
                        <i className="fas fa-envelope"></i>  Online Payment
                    </Link>
                </div>
            </section>
            <section id="helpsupportid">
                <div>
                    <b>Help & Support</b> <br />
                    Having trouble with our product? <br />
                    Reach out to us at:
                </div>
                <div>
                    <p>
                    <i className="fas fa-phone"></i>
                        <strong>Phone</strong> <br />
                        +91 97787-44000
                    </p>
                    <p>
                    <i className="fas fa-envelope"></i>
                        <strong>Email</strong> <br />
                        customercare@spinoff.in
                    </p>
                </div>
            </section>
        </div>
    );
}

export default Customersupport;
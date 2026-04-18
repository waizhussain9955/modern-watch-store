
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-wayne-black text-white pt-20 pb-10 font-sans">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Column 1 */}
                    <div>
                        <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-8 border-b border-wayne-border pb-4 inline-block text-wayne-teal">Know Us</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link to="/about" className="hover:text-wayne-teal transition-colors">About Us</Link></li>
                            <li><Link to="/story" className="hover:text-wayne-teal transition-colors">About Modern Watch Store</Link></li>
                            <li><Link to="/corporate" className="hover:text-wayne-teal transition-colors">Bulk Purchase & Corporate Gifts</Link></li>
                        </ul>
                    </div>

                    {/* Column 2 */}
                    <div>
                        <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-8 border-b border-wayne-border pb-4 inline-block text-wayne-teal">Terms & Conditions</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link to="/policies" className="hover:text-wayne-teal transition-colors">Shipping & Return Policies</Link></li>
                            <li><Link to="/privacy" className="hover:text-wayne-teal transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/faq" className="hover:text-wayne-teal transition-colors">FAQ's</Link></li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div>
                        <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-8 border-b border-wayne-border pb-4 inline-block text-wayne-teal">Contact Us</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li>
                                <span className="text-gray-500">For Sale:</span>
                                <a href="mailto:modernwatch@store.com" className="ml-2 hover:text-wayne-teal">modernwatch@store.com</a>
                            </li>
                            <li>
                                <span className="text-gray-500">WhatsApp:</span>
                                <a href="https://wa.me/923272051549" target="_blank" rel="noopener noreferrer" className="ml-2 hover:text-wayne-teal font-bold">+92 327 205 1549</a>
                            </li>
                            <li>
                                <span className="text-gray-500">Call:</span>
                                <a href="tel:+919876543210" className="ml-2 hover:text-wayne-teal">+91 9876543210</a>
                            </li>
                            <li>
                                <span className="text-gray-500">For Complaints:</span>
                                <a href="tel:18002022022" className="ml-2 hover:text-wayne-teal">1800 202 2022</a>
                            </li>
                            <li className="text-xs text-wayne-teal leading-relaxed mt-4">
                                Chat Time: Our Team is Available From Monday to Saturday from 9:00AM to 8:00PM
                            </li>
                        </ul>
                    </div>

                    {/* Column 4 */}
                    <div>
                        <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-8 border-b border-wayne-border pb-4 inline-block text-wayne-teal">Follow Us</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <a href="https://www.instagram.com/waiz_hussain_/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-wayne-teal transition-colors group">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                                <span>Instagram</span>
                            </a>
                            <a href="https://www.facebook.com/waiz.hussain.ansari.2025/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-wayne-teal transition-colors group">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                                <span>Facebook</span>
                            </a>
                            <a href="https://www.threads.com/@waiz_hussain_?xmt=AQF0em6vQhOH5Z8yXuW031kli1vmAf6YKtiKyQL87Daux74" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-wayne-teal transition-colors group">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform"><path d="M18.25 11.75c0 4.56-3.69 8.25-8.25 8.25-4.56 0-8.25-3.69-8.25-8.25C1.75 7.19 5.44 3.5 10 3.5c4.56 0 8.25 3.69 8.25 8.25zm-8.25-7c-3.86 0-7 3.14-7 7s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm0 2.5c.41 0 .75.34.75.75v3.25h3.25c.41 0 .75.34.75.75s-.34.75-.75.75h-4c-.41 0-.75-.34-.75-.75v-4c0-.41.34-.75.75-.75z"/></svg>
                                <span>Threads</span>
                            </a>
                            <a href="https://github.com/waizhussain9955" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-wayne-teal transition-colors group">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/></svg>
                                <span>GitHub</span>
                            </a>
                            <a href="https://www.linkedin.com/in/waiz-hussain-6750392ba/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-wayne-teal transition-colors group">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                                <span>LinkedIn</span>
                            </a>
                            <a href="https://wa.me/923272051549" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-wayne-teal transition-colors group">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                                <span>WhatsApp</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-wayne-border text-center">
                    <p className="text-[10px] uppercase tracking-widest text-wayne-teal mb-2">
                        2026 @ Modern Watch Store. Designed By MuthuRaman
                    </p>
                    <p className="text-[9px] text-gray-500">
                        For business inquiries, contact us via WhatsApp: <a href="https://wa.me/923272051549" target="_blank" rel="noopener noreferrer" className="text-wayne-teal hover:text-white transition-colors font-bold">+92 327 205 1549</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

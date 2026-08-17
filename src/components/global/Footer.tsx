import React from "react";
import Link from "next/link";
import { Send } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0a1c40] text-slate-300 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          
          {/* Column 1: Info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="TITAN Logo" className="h-10 w-auto object-contain" />
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Taj Institute of Technology & Applied Networks (TITAN) is Pakistan's smartest hiring platform where AI matches candidates with the best job opportunities in technology, design, marketing, and business.
            </p>

            {/* Official Contact Info */}
            <div className="text-xs text-slate-400 flex flex-col gap-2">
              <p className="font-bold text-white uppercase tracking-wider text-[10px]">Contact Information</p>
              <p className="leading-relaxed">Opposite Taj Petrol Pump, Military Road, Sukkur, Sindh, Pakistan</p>
              <p>Phone: +92 301 301 8492 &nbsp;|&nbsp; +92 315 414 7741</p>
              <p>Email: <a href="mailto:info@titan.edu" className="hover:text-gold transition-colors">info@titan.edu</a></p>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-4 text-slate-400">
              <a href="https://www.facebook.com/profile.php?id=61582828360450" target="_blank" rel="noopener noreferrer" title="TITAN - Taj Institute of Technology & Applied Networks" className="hover:text-gold transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/titan-taj12?fbclid=IwY2xjawTHWtBleHRuA2FlbQIxMABicmlkETFJOHJSYVJTUVNTSXN5T3huc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHl9L6Gy6YrtWlOKJ4LbXfwFrARKLT03b44HIFbBiAToYw4divsnm3mYRxS5q_aem_UeKFe0qpsXXP7TM-KL-pNA" target="_blank" rel="noopener noreferrer" title="TITAN – Taj Institute of Technology & Applied Networks" className="hover:text-gold transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://www.instagram.com/titan.taj/?fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExYWdwenJyT3NQSGJqQnZoYXNydGMGYXBwX2lkEDIyMjAzOTE3ODgyMDA4OTIAAR6LxcnW1FxNGz2N0g0w1PPF_Wc1ASrkYa1gIu31z8pOsvnUlMDfixPNpvVFZA_aem_4zs2gadv9yw83Kgu-pbtOw" target="_blank" rel="noopener noreferrer" title="@titan.taj" className="hover:text-gold transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-400">
              <li><Link href="/jobs" className="hover:text-gold transition-colors">Search Jobs</Link></li>
              <li><Link href="/jobs?type=internship" className="hover:text-gold transition-colors">Internships</Link></li>
              <li><Link href="/" className="hover:text-gold transition-colors">Courses</Link></li>
              <li><Link href="/candidate/dashboard" className="hover:text-gold transition-colors">AI Assistant</Link></li>
              <li><Link href="/employer/dashboard" className="hover:text-gold transition-colors">For Employers</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Company</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-400">
              <li><Link href="/about" className="hover:text-gold transition-colors">About Us</Link></li>
              <li><a href="#" className="hover:text-gold transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Blog</a></li>
              <li><Link href="/contact" className="hover:text-gold transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Subscribe</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Get the latest job opportunities, tech career tips, and hiring updates.
            </p>
            <div className="relative mt-2 flex items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-700 bg-slate-900/50 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-gold transition-colors pr-10"
              />
              <button className="absolute right-2 p-1.5 rounded-md bg-gold hover:bg-gold-dark text-primary-navy-dark transition-colors">
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
          <span>&copy; {new Date().getFullYear()} TITAN. All rights reserved.</span>
          <span>Designed For Your Success.</span>
        </div>
      </div>
    </footer>
  );
};

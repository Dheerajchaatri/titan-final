"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/global/Navbar";
import { Footer } from "@/components/global/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "@/components/ui/Toast";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast.success("Thank you! Your query has been logged. We will get back to you shortly.");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-grow max-w-5xl w-full mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Contact Coordinates */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-extrabold text-primary-navy tracking-tight">Contact Us</h1>
            <p className="text-xs font-semibold text-text-muted mt-2 leading-relaxed">
              Have questions about TITAN AI features, pricing plans, or need support? Drop us a message!
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex gap-4 items-start">
              <div className="h-10 w-10 rounded-xl bg-white border border-border-color flex items-center justify-center text-primary-navy flex-shrink-0">
                <MapPin className="h-5 w-5 text-gold" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-primary-navy uppercase tracking-wider">Our Headquarters</h4>
                <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                  Opposite Taj Petrol Pump, Military Road,<br />Sukkur, Sindh, Pakistan.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="h-10 w-10 rounded-xl bg-white border border-border-color flex items-center justify-center text-primary-navy flex-shrink-0">
                <Mail className="h-5 w-5 text-gold" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-primary-navy uppercase tracking-wider">Email Address</h4>
                <p className="text-xs text-text-secondary mt-1">info@titan.edu</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="h-10 w-10 rounded-xl bg-white border border-border-color flex items-center justify-center text-primary-navy flex-shrink-0">
                <Phone className="h-5 w-5 text-gold" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-primary-navy uppercase tracking-wider">Phone Support</h4>
                <p className="text-xs text-text-secondary mt-1">+92 301 301 8492<br />+92 315 414 7741</p>
              </div>
            </div>
          </div>
        </div>

        {/* Query Form */}
        <div className="lg:col-span-7 bg-white border border-border-color rounded-2xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="text"
              label="Full Name *"
              placeholder="e.g. Ahmad Raza"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Input
              type="email"
              label="Email Address *"
              placeholder="e.g. ahmad.raza@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              type="text"
              label="Subject"
              placeholder="How can we help you?"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                Message Content *
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                placeholder="Type your message here..."
                required
                className="w-full p-4 rounded-xl border bg-white border-border-color text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-navy-light/20 focus:border-primary-navy transition-all"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="py-3 flex items-center justify-center gap-2 font-bold uppercase tracking-wider text-xs"
              isLoading={loading}
            >
              <span>Send Message</span>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>

      </main>

      <Footer />
    </div>
  );
}

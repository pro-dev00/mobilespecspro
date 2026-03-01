import React from 'react';
import { Smartphone, Instagram, Twitter, Facebook, Youtube, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-100 bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white">
                <Smartphone size={18} />
              </div>
              <span className="text-xl font-bold tracking-tight font-display">MobileSpec</span>
            </div>
            <p className="text-zinc-500">
              Your trusted source for comprehensive mobile phone specifications, AI-powered reviews, and comparisons.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-50 text-zinc-400 transition-colors hover:bg-black hover:text-white">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-6 font-bold">Quick Links</h4>
            <ul className="space-y-4 text-zinc-500">
              <li><a href="#" className="hover:text-black transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Store</a></li>
              <li><a href="#" className="hover:text-black transition-colors">AI Suggestion</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Compare</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Latest News</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-bold">Support</h4>
            <ul className="space-y-4 text-zinc-500">
              <li><a href="#" className="hover:text-black transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-bold">Newsletter</h4>
            <p className="mb-6 text-zinc-500">Get the latest mobile news and deals delivered to your inbox.</p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input
                  type="email"
                  placeholder="Your email"
                  className="h-12 w-full rounded-full bg-zinc-50 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-black/5"
                />
              </div>
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white transition-all hover:bg-emerald-600 active:scale-95">
                <Mail size={18} />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-20 border-t border-zinc-100 pt-8 text-center text-sm text-zinc-400">
          © {new Date().getFullYear()} MobileSpec Pro. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

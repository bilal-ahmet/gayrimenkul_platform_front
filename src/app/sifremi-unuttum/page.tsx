"use client";

import Link from "next/link";
import { useState } from "react";
import { KeyRound } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SifremiUnuttumPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-luxe border border-gray-200 p-8">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-emerald-700 rounded-xl flex items-center justify-center mx-auto mb-4 ring-1 ring-amber-400/30">
                <KeyRound className="w-6 h-6 text-amber-200" />
              </div>
              <h1 className="text-3xl text-gray-900">Şifremi Unuttum</h1>
            </div>

            {sent ? (
              <div className="text-center space-y-4">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-4 text-sm text-emerald-800">
                  Şifre sıfırlama bağlantısı <strong>{email}</strong> adresine gönderildi.
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700">
                  Bu bir demo platformudur. Gerçekte e-posta gönderilmez.
                </div>
                <Link href="/login" className="block text-center text-sm text-emerald-600 font-medium hover:underline mt-4">
                  Giriş sayfasına dön
                </Link>
              </div>
            ) : (
              <>
                <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700 mb-6">
                  Demo modu: Gerçekte e-posta gönderilmez.
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">E-posta adresi</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ornek@email.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-amber-50 font-semibold tracking-wide py-3 rounded-full ring-1 ring-amber-400/25 transition-colors text-sm"
                  >
                    Sıfırlama Bağlantısı Gönder
                  </button>
                </form>
                <p className="text-center text-sm text-gray-500 mt-6">
                  <Link href="/login" className="text-emerald-600 font-medium hover:underline">Giriş sayfasına dön</Link>
                </p>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

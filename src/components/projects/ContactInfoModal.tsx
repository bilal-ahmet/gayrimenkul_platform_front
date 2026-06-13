'use client'

import { useState } from 'react'
import { X, Phone, Mail, Globe, Star, Building2, MapPin } from 'lucide-react'
import type { Contractor } from '@/types'

export default function ContactInfoModal({ contractor }: { contractor: Contractor }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-5 w-full bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold py-3 rounded-xl text-center transition-colors"
      >
        Bilgi Al
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-gray-900 text-lg">Firma Bilgileri</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Kapat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{contractor.name}</p>
                  <div className="flex items-center gap-1 mt-0.5 text-sm text-gray-500">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="font-medium text-gray-700">{contractor.rating}</span>
                    <span className="text-gray-400">· {contractor.projectCount} tamamlanan proje</span>
                  </div>
                </div>
              </div>

              {contractor.phone && (
                <a
                  href={`tel:${contractor.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-sm text-gray-700 hover:text-emerald-700 transition-colors group"
                >
                  <div className="w-8 h-8 bg-gray-100 group-hover:bg-emerald-50 rounded-lg flex items-center justify-center transition-colors">
                    <Phone className="w-4 h-4 text-gray-500 group-hover:text-emerald-600" />
                  </div>
                  {contractor.phone}
                </a>
              )}

              {contractor.email && (
                <a
                  href={`mailto:${contractor.email}`}
                  className="flex items-center gap-3 text-sm text-gray-700 hover:text-emerald-700 transition-colors group"
                >
                  <div className="w-8 h-8 bg-gray-100 group-hover:bg-emerald-50 rounded-lg flex items-center justify-center transition-colors">
                    <Mail className="w-4 h-4 text-gray-500 group-hover:text-emerald-600" />
                  </div>
                  {contractor.email}
                </a>
              )}

              {contractor.website && (
                <a
                  href={contractor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-700 hover:text-emerald-700 transition-colors group"
                >
                  <div className="w-8 h-8 bg-gray-100 group-hover:bg-emerald-50 rounded-lg flex items-center justify-center transition-colors">
                    <Globe className="w-4 h-4 text-gray-500 group-hover:text-emerald-600" />
                  </div>
                  {contractor.website.replace('https://', '')}
                </a>
              )}

              {contractor.address && (
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-gray-400" />
                  </div>
                  {contractor.address}
                </div>
              )}
            </div>

            <p className="text-xs text-gray-400 mt-5 pt-4 border-t border-gray-100">
              Satış sürecini doğrudan müteahhitle yürütün. Anlaşma tamamlandığında platform komisyon uygular.
            </p>
          </div>
        </div>
      )}
    </>
  )
}

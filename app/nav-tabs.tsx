'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiSearch, FiGlobe } from 'react-icons/fi'

export default function NavTabs() {
  const pathname = usePathname()

  const tabs = [
    { href: '/', label: 'Neural Search', icon: FiSearch, description: 'AI-powered search' },
    { href: '/scrape', label: 'Web Extraction', icon: FiGlobe, description: 'Data scraping' }
  ]

  return (
    <div className="flex space-x-2 bg-slate-800/50 rounded-2xl p-2 border border-slate-700/50 backdrop-blur-sm">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = pathname === tab.href
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex items-center space-x-3 px-6 py-4 rounded-xl text-sm font-semibold transition-all duration-300 group relative overflow-hidden ${
              isActive
                ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/10'
                : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/30'
            }`}
          >
            <div className="relative z-10 flex items-center space-x-3">
              <Icon size={18} className={isActive ? 'text-blue-400' : 'text-slate-500'} />
              <span>{tab.label}</span>
            </div>
            {isActive && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
            )}
          </Link>
        )
      })}
    </div>
  )
}
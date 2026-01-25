'use client'
import { motion } from 'framer-motion'

export default function Footer() {
  const merchantLinks = [
    { name: 'Find Warehouses', href: '#' },
    { name: 'Post Requirements', href: '#' },
    { name: 'How It Works', href: '#' }
  ]

  const ownerLinks = [
    { name: 'List Your Warehouse', href: '#' },
    { name: 'View Inquiries', href: '#' },
    { name: 'Pricing', href: '#' }
  ]

  const companyLinks = [
    { name: 'About Us', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Privacy Policy', href: '#' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <motion.div
          className="grid md:grid-cols-4 gap-12 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Logo & Description */}
          <motion.div variants={itemVariants} className="col-span-1">
            <motion.div
              className="flex items-center gap-3 mb-4"
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-primary-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                🏢
              </motion.div>
              <span className="font-display font-bold text-white text-xl">WarehouseHub</span>
            </motion.div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Connecting businesses with the perfect warehouse spaces across India.
            </p>
          </motion.div>

          {/* For Merchants */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-white mb-6 text-lg">For Merchants</h4>
            <ul className="space-y-4">
              {merchantLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-primary-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* For Owners */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-white mb-6 text-lg">For Owners</h4>
            <ul className="space-y-4">
              {ownerLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-orange-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-white mb-6 text-lg">Company</h4>
            <ul className="space-y-4">
              {companyLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="border-t border-slate-800"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />

        {/* Bottom Footer */}
        <motion.div
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} WarehouseHub. All rights reserved.
          </p>

          {/* Social Links / Additional Links */}
          <div className="flex gap-8 text-sm">
            {[
              { name: 'Terms & Conditions', href: '#' },
              { name: 'Privacy Policy', href: '#' },
              { name: 'Cookie Policy', href: '#' }
            ].map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                className="text-slate-500 hover:text-white transition-colors duration-300"
                whileHover={{ y: -2 }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

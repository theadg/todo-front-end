import DeployButton from '@/components/deploy-button'
import { EnvVarWarning } from '@/components/env-var-warning'
import HeaderAuth from '@/components/header-auth'
import { ThemeSwitcher } from '@/components/theme-switcher'
import Providers from '@/contexts/Providers'
import { hasEnvVars } from '@/utils/supabase/check-env-vars'
import { Geist } from 'next/font/google'
import Link from 'next/link'
import { Toaster } from 'sonner'
import './globals.css'

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: 'Next.js and Supabase Starter Kit',
    description: 'The fastest way to build apps with Next.js and Supabase',
}

const geistSans = Geist({
    display: 'swap',
    subsets: ['latin'],
})

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="en"
            className={geistSans.className}
            suppressHydrationWarning>
            <body className="bg-background text-foreground light">
                <Providers>
                    <main className="min-h-screen flex flex-col items-center">
                        <div className="flex-1 w-full flex flex-col gap-20 items-center">
                            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                                    <div className="flex gap-5 items-center font-semibold">
                                        <Toaster
                                            position="top-center"
                                            richColors
                                        />
                                        <Link href={'/'}>
                                            Next.js Supabase Starter
                                        </Link>
                                    </div>
                                    {!hasEnvVars ? (
                                        <EnvVarWarning />
                                    ) : (
                                        <HeaderAuth />
                                    )}
                                </div>
                            </nav>
                            <div className="flex flex-col gap-20 max-w-5xl p-5">
                                {children}
                            </div>

                            <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
                                <p>
                                    Made with Love ❤️
                                    <a
                                        href="https://bernardandrewdg.vercel.app/"
                                        target="_blank"
                                        className="font-bold hover:underline"
                                        rel="noreferrer">
                                        by Andrew De Guzman
                                    </a>
                                </p>
                                <ThemeSwitcher />
                            </footer>
                        </div>
                    </main>
                </Providers>
            </body>
        </html>
    )
}

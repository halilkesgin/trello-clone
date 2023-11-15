"use client"

import React, { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
    
    const { theme, setTheme } = useTheme()
    const [isDarkMode, setIsDarkMode] = useState(theme === "dark")
    const [isMounted, setIsMounted] = useState(false)

    const toggleTheme = () => {
        setIsDarkMode((prevIsDarkMode) => !prevIsDarkMode)
        setTheme(isDarkMode ? "light" : "dark")
    }

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    return (
        <Button variant="outline" size="icon" onClick={toggleTheme}>
            {isDarkMode ? (
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
            ) : (
                <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
            )}
        </Button>
    )
}
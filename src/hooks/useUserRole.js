"use client"

import { useState, useEffect } from "react"

export function useUserRole() {
  // In a real app, this would come from your auth system
  // For demo purposes, we'll use localStorage to persist the role
  const [userRole, setUserRole] = useState(() => {
    const savedRole = localStorage.getItem("userRole")
    return savedRole || "poster" // Default to poster role
  })

  // Save role to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("userRole", userRole)
  }, [userRole])

  return { userRole, setUserRole }
}


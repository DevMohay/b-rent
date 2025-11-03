'use client'

import { useState, useRef, useEffect } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { FaRegUserCircle, FaWhatsapp } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import Image from "next/image";

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [imo, setImo] = useState("")
  const [contactMethod, setContactMethod] = useState("whatsapp")
  const [profilePicture, setProfilePicture] = useState(null)
  const [previewUrl, setPreviewUrl] = useState("")
  const [error, setError] = useState("")
  const [formErrors, setFormErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const fileInputRef = useRef(null)
  const router = useRouter()

  // Create preview when profile picture changes
  useEffect(() => {
    if (profilePicture) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(profilePicture)
    } else {
      setPreviewUrl("")
    }
  }, [profilePicture])

  const validateForm = () => {
    const errors = {}
    
    if (!name.trim()) errors.name = "Name is required"
    if (!email.trim()) errors.email = "Email is required"
    if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid"
    if (!password) errors.password = "Password is required"
    if (password.length < 6) errors.password = "Password must be at least 6 characters"
    if (!phone.trim()) errors.phone = "Phone number is required"
    
    // Validate that either WhatsApp or IMO is provided based on selection
    if (contactMethod === "whatsapp" && !whatsapp.trim()) {
      errors.whatsapp = "WhatsApp number is required"
    }
    if (contactMethod === "imo" && !imo.trim()) {
      errors.imo = "IMO number is required"
    }
    
    if (!profilePicture) errors.profilePicture = "Profile picture is required"
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    
    if (!validateForm()) return
    
    setSubmitting(true)

    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)
    formData.append("password", password)
    formData.append("phone", phone)
    formData.append("whatsapp", whatsapp)
    formData.append("imo", imo)
    
    if (profilePicture) {
      formData.append("profilePicture", profilePicture)
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: formData,
      })

      if (res.ok) {
        setSubmitting(false)
        signIn("credentials", { email, password, callbackUrl: "/dashboard" })
      } else {
        const { message } = await res.json()
        setError(message)
        setSubmitting(false)
      }
    } catch (error) {
      setError("An unexpected error occurred.")
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create a new account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Profile Picture Upload with Preview */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-32 h-32 mb-4 relative rounded-full overflow-hidden border-2 border-indigo-500">
                {previewUrl ? (
                  <img 
                    src={previewUrl} 
                    alt="Profile Preview" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <FaRegUserCircle className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>
              
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {profilePicture ? "Change Picture" : "Upload Picture"}
              </button>
              
              <input
                ref={fileInputRef}
                id="profilePicture"
                name="profilePicture"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setProfilePicture(e.target.files[0])}
              />
              
              {formErrors.profilePicture && (
                <p className="mt-1 text-sm text-red-600">{formErrors.profilePicture}</p>
              )}
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {formErrors.password && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {formErrors.phone && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                )}
              </div>
            </div>

            {/* Contact Method Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Contact Method
              </label>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input
                    id="whatsapp-option"
                    name="contact-method"
                    type="radio"
                    checked={contactMethod === "whatsapp"}
                    onChange={() => setContactMethod("whatsapp")}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label htmlFor="whatsapp-option" className="ml-2 block text-sm text-gray-700 flex items-center">
                    <FaWhatsapp className="mr-1 text-green-500" /> WhatsApp
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="imo-option"
                    name="contact-method"
                    type="radio"
                    checked={contactMethod === "imo"}
                    onChange={() => setContactMethod("imo")}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label htmlFor="imo-option" className="ml-2 block text-sm text-gray-700 flex items-center">
                    <FaMessage className="mr-1 text-blue-500" /> IMO
                  </label>
                </div>
              </div>
            </div>

            {/* Conditional Input based on Contact Method */}
            {contactMethod === "whatsapp" ? (
              <div>
                <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">
                  WhatsApp Number
                </label>
                <div className="mt-1">
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="text"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {formErrors.whatsapp && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.whatsapp}</p>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <label htmlFor="imo" className="block text-sm font-medium text-gray-700">
                  IMO Number
                </label>
                <div className="mt-1">
                  <input
                    id="imo"
                    name="imo"
                    type="text"
                    value={imo}
                    onChange={(e) => setImo(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {formErrors.imo && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.imo}</p>
                  )}
                </div>
              </div>
            )}

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex flex-col space-y-4">
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {submitting ? (
                  <span className="inline-flex items-center">
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    Registering...
                  </span>
                ) : (
                  "Register"
                )}
              </button>
              
              <div className="text-center">
                <a href="/auth/login" className="text-sm text-indigo-600 hover:text-indigo-500">
                  Already have an account? Sign in
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
